import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema'

import { DefaultLogger, LogWriter } from 'drizzle-orm/logger'
import * as Sentry from '@sentry/node'
import { redact } from '~/lib/security/token-redaction'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const queryClient = postgres(connectionString, {
  // Disable prepare on first use if DATABASE_URL points to a server that
  // rejects prepared statements (e.g. Cloudflare tunnels). Flip to true if your
  // environment prefers prepared statements.
  prepare: false,
})

class SentryQueryWriter implements LogWriter {
  write(message: string) {
    const msg = redact(message)
    try {
      Sentry.addBreadcrumb({
        category: 'db.sql',
        level: 'info',
        message: msg,
      })
    } catch {
      // no-op if Sentry not initialized
    }
    // Also echo in dev to stdout to aid local debugging
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[SQL]', msg)
    }
  }
}

const drizzleLogger = new DefaultLogger({ writer: new SentryQueryWriter() })

export const db = drizzle(queryClient, {
  schema,
  casing: 'snake_case',
  logger: drizzleLogger,
})
