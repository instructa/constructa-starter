import { createStart } from '@tanstack/react-start';
import { logMiddleware, requestLoggerMiddleware } from '~/utils/loggingMiddleware';

if (import.meta.env.SSR) {
  // Server init (await ensures module executes before request handling)
  await import('~/lib/observability/sentry.server')
} else {
  // Client init (captures console + network)
  await import('~/lib/observability/sentry.client')
}

export const startInstance = createStart(() => ({
  // Runs for ALL server requests (SSR, routes, serverFns). Logs method/url/duration and captures errors.
  requestMiddleware: [requestLoggerMiddleware],
  // Runs around ALL server functions. Maintains your client↔server timing logs + adds breadcrumbs.
  functionMiddleware: [logMiddleware],
}))

export const start = startInstance;
