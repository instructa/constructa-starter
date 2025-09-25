import { createFileRoute } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';
import { db } from '~/db/db-config';
import { subscriptions } from '~/db/schema/billing.schema';
import { ensureDailyRefill } from '~/server/credits';

export const Route = createFileRoute('/api/jobs/daily-credit-refill')({
  server: {
    handlers: {
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
    },
  },
});
