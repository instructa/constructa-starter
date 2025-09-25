import { db } from '~/db/db-config';
import { plans } from '~/db/schema/billing.schema';
import { PLANS } from '~/config/plans';

export async function seedPlans() {
  await db
    .insert(plans)
    .values([
      { id: 'free', name: 'Free', monthlyCredits: 0, isCustom: false },
      {
        id: 'pro',
        name: 'Pro',
        monthlyCredits: PLANS.pro.monthlyCredits,
        polarProductId: PLANS.pro.polarProductId ?? null,
        isCustom: false,
        unitAmountCents: 2500,
      },
      {
        id: 'business',
        name: 'Business',
        monthlyCredits: PLANS.business.monthlyCredits,
        polarProductId: PLANS.business.polarProductId ?? null,
        isCustom: false,
        unitAmountCents: 5000,
      },
      { id: 'enterprise', name: 'Enterprise', monthlyCredits: 0, isCustom: true },
    ])
    .onConflictDoNothing();
}
