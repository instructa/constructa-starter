import { createServerFileRoute } from '@tanstack/react-start/server';
import { eq } from 'drizzle-orm';
import { db } from '~/db/db-config';
import { subscriptions } from '~/db/schema/billing.schema';
import { ensureDailyRefill } from '~/server/credits';

export const ServerRoute = createServerFileRoute('/api/jobs/daily-credit-refill').methods({
  POST: async () => {
    const active = await db
      .select({ userId: subscriptions.userId })
      .from(subscriptions)
      .where(eq(subscriptions.status, 'active'));

    for (const row of active) {
      await ensureDailyRefill(row.userId);
    }

    return new Response('ok');
  },
});
