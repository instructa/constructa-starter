import { createMiddleware } from '@tanstack/react-start';
import { logger } from '~/lib/logger'
import { redact } from '~/lib/security/token-redaction'

const preLogMiddleware = createMiddleware()
  .client(async (ctx) => {
    const clientTime = new Date()
    return ctx.next({
      context: { clientTime },
      sendContext: { clientTime },
    })
  })
  .server(async (ctx) => {
    const clientTime = ctx.context.clientTime ?? new Date()
    const serverTime = new Date()
    return ctx.next({
      sendContext: {
        serverTime,
        durationToServer: serverTime.getTime() - clientTime.getTime(),
        clientTime,
      },
    })
  })

export const logMiddleware = createMiddleware()
  .middleware([preLogMiddleware])
  .client(async (ctx) => {
    const res = await ctx.next()
    const now = new Date()
    const responseContext = res.context ?? {}
    const clientTime = responseContext.clientTime ?? now
    const serverTime = responseContext.serverTime ?? now
    const durationToServer = responseContext.durationToServer ?? 0

    // Console for local dev
    // console.log('Client Req/Res:', {
    //   duration: clientTime.getTime() - now.getTime(),
    //   durationToServer,
    //   durationFromServer: now.getTime() - serverTime.getTime(),
    // })

    // Add Sentry breadcrumb (client)
    try {
      const Sentry = await import('@sentry/react')
      Sentry.addBreadcrumb({
        category: 'timing',
        type: 'info',
        level: 'info',
        data: {
          durationToServer,
          durationFromServer: now.getTime() - serverTime.getTime(),
        },
        message: 'serverFn round-trip',
      })
    } catch {
      // ignore if Sentry not configured
    }

    return res
  })
  .server(async (ctx) => {
    const start = Date.now()
    try {
      const res = await ctx.next()
      const end = Date.now()
      // logger.info('serverFn', {
      //   phase: 'complete',
      //   durationMs: end - start,
      // })

      // Breadcrumb (server)
      try {
        const Sentry = await import('@sentry/node')
        Sentry.addBreadcrumb({
          category: 'serverFn',
          type: 'info',
          level: 'info',
          data: { durationMs: end - start },
          message: 'serverFn completed',
        })
      } catch {
        // no-op
      }

      return res
    } catch (err) {
      // Capture error (server)
      try {
        const Sentry = await import('@sentry/node')
        Sentry.captureException(err)
      } catch {
        // no-op
      }
      logger.error('serverFn error', { error: String(err) })
      throw err
    }
  })

export const requestLoggerMiddleware = createMiddleware().server(async ({ next, request }) => {
  const started = Date.now()
  const method = request?.method || 'GET'
  const url = request?.url ? redact(request.url) : 'unknown'

  try {
    const result = await next()

    const durationMs = Date.now() - started
    logger.info('http', { method, url, status: (result as any)?.status ?? 200, durationMs })

    try {
      const Sentry = await import('@sentry/node')
      Sentry.addBreadcrumb({
        category: 'http',
        type: 'http',
        level: 'info',
        data: { method, url, durationMs, status: (result as any)?.status ?? 200 },
        message: `${method} ${url}`,
      })
    } catch {
      // no-op
    }

    return result
  } catch (err) {
    // On error, capture & rethrow
    try {
      const Sentry = await import('@sentry/node')
      Sentry.captureException(err)
    } catch {
      // no-op
    }
    logger.error('http error', { method, url, error: String(err) })
    throw err
  }
})
