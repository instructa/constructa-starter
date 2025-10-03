import * as Sentry from '@sentry/node'
import { redact } from '~/lib/security/token-redaction'

const dsn = process.env.SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
    integrations: [
      Sentry.httpIntegration(),
      Sentry.captureConsoleIntegration({ levels: ['error', 'warn'] }),
    ],
    beforeBreadcrumb(breadcrumb) {
      try {
        if (breadcrumb?.message) breadcrumb.message = redact(String(breadcrumb.message))
        if (breadcrumb?.data) {
          breadcrumb.data = JSON.parse(
            JSON.stringify(breadcrumb.data, (k, v) =>
              typeof v === 'string' ? redact(v) : v,
            ),
          )
        }
      } catch {
        // no-op
      }
      return breadcrumb
    },
    beforeSend(event) {
      try {
        if (event.request?.url) event.request.url = redact(event.request.url)
        if (event.request?.headers) {
          for (const [k, v] of Object.entries(event.request.headers)) {
            if (typeof v === 'string') (event.request.headers as any)[k] = redact(v)
          }
        }
        if (event.exception?.values) {
          for (const ex of event.exception.values) {
            if (ex.value) ex.value = redact(ex.value)
          }
        }
      } catch {
        // no-op
      }
      return event
    },
  })
}

export { Sentry }