import { createServerFileRoute } from '@tanstack/react-start/server';
import { desc, eq } from 'drizzle-orm';
import { polar } from '~/server/polar';
import { db } from '~/db/db-config';
import { subscriptions } from '~/db/schema/billing.schema';
import { requireUser } from '~/server/require-user';

export const ServerRoute = createServerFileRoute('/api/subscription/cancel').methods({
  POST: async ({ request }) => {
    const user = await requireUser(request);

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .orderBy(desc(subscriptions.updatedAt))
      .limit(1);

    if (!subscription?.polarSubscriptionId) {
      return new Response('No active subscription', { status: 400 });
    }

    await polar.subscriptions.update({
      id: subscription.polarSubscriptionId,
      subscriptionUpdate: {
        cancel: { revokeImmediately: false },
      } as any,
    });

    return new Response(null, { status: 204 });
  },
});
