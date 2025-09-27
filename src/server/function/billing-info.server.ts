import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { desc, eq } from 'drizzle-orm';

import { PLANS, CREDIT_PACK_PRODUCTS, type PlanId } from '~/config/plans';
import { db } from '~/db/db-config';
import { creditBalances, subscriptions } from '~/db/schema/billing.schema';
import { ensureDailyRefill } from '~/server/credits';
import auth from '~/server/auth.server';

type BillingInfoPayload = {
  planId: PlanId;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | null;
  products: {
    pro: string | null;
    business: string | null;
    credits50: string | null;
    credits100: string | null;
  };
  credits: {
    monthlyAllotment: number;
    allotmentUsed: number;
    extraCredits: number;
  };
};

export const getBillingInfo = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getRequest();
  const session = await auth.api.getSession({ headers });

  if (!session?.user) {
    throw new Error('UNAUTHORIZED');
  }

  const userId = session.user.id;

  await ensureDailyRefill(userId);

  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.updatedAt))
    .limit(1);

  const [balance] = await db.select().from(creditBalances).where(eq(creditBalances.userId, userId));

  const planId = (subscription?.planId ?? 'free') as PlanId;

  const payload: BillingInfoPayload = {
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
  };

  return payload;
});
