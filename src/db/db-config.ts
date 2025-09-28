import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const queryClient = postgres(connectionString, {
  // Disable prepare on first use if DATABASE_URL points to a server that
  // rejects prepared statements (e.g. Cloudflare tunnels). Flip to true if your
  // environment prefers prepared statements.
  prepare: false,
});

export const db = drizzle(queryClient, {
  schema,
  casing: 'snake_case',
});
