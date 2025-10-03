import * as Sentry from '@sentry/react'
import { redact } from '~/lib/security/token-redaction'

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    debug: import.meta.env.DEV,
    // v8-style integrations
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.captureConsoleIntegration({ levels: ['error', 'warn'] }),
      // Added but sampling below keeps Replay off unless errors occur
      Sentry.replayIntegration(),
    ],
    // Keep light by default; override via VITE_* env if needed
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
    replaysSessionSampleRate: Number(
      import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? '0.0',
    ),
    replaysOnErrorSampleRate: Number(
      import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? '1.0',
    ),
    tracePropagationTargets: ((): (string | RegExp)[] => {
      const targets: (string | RegExp)[] = [
        /^https?:\/\/localhost(?::\d+)?/,
        /^https?:\/\/(.*\.)?ex0\.dev/i,
      ]

      const baseUrl = import.meta.env.VITE_BASE_URL
      if (baseUrl) targets.push(baseUrl)
      if (typeof window !== 'undefined') targets.push(window.location.origin)

      return targets
    })(),
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
        // never send cookies from the browser
        if (event.request) (event.request as any).cookies = undefined

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
} else if (import.meta.env.DEV) {
  console.warn('[sentry] VITE_SENTRY_DSN missing; client telemetry disabled')
}
