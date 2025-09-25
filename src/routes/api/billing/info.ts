import { createFileRoute } from '@tanstack/react-router';
import { desc, eq } from 'drizzle-orm';
import { db } from '~/db/db-config';
import { creditBalances, subscriptions } from '~/db/schema/billing.schema';
import { PLANS, CREDIT_PACK_PRODUCTS, type PlanId } from '~/config/plans';
import { ensureDailyRefill } from '~/server/credits';
import { requireUser } from '~/server/require-user';

export const Route = createFileRoute('/api/billing/info')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await requireUser(request);

        await ensureDailyRefill(user.id);

        const [subscription] = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, user.id))
          .orderBy(desc(subscriptions.updatedAt))
          .limit(1);

        const [balance] = await db
          .select()
          .from(creditBalances)
          .where(eq(creditBalances.userId, user.id));

        const planId = (subscription?.planId ?? 'free') as PlanId;

        return Response.json({
          planId,
          status: subscription?.status ?? 'free',
          cancelAtPeriodEnd: Boolean(subscription?.cancelAtPeriodEnd),
          currentPeriodEnd: subscription?.currentPeriodEnd?.toISOString() ?? null,
          products: {
            pro: PLANS.pro.polarProductId ?? null,
            business: PLANS.business.polarProductId ?? null,
            credits50: CREDIT_PACK_PRODUCTS.credits50 ?? null,
            credits100: CREDIT_PACK_PRODUCTS.credits100 ?? null,
          },
          credits: balance
            ? {
                monthlyAllotment: balance.monthlyAllotment,
                allotmentUsed: balance.allotmentUsed,
                extraCredits: balance.extraCredits,
              }
            : {
                monthlyAllotment: PLANS[planId]?.monthlyCredits ?? 0,
                allotmentUsed: 0,
                extraCredits: 0,
              },
        });
      },
    },
  },
});
