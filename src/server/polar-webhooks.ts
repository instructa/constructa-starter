import { eq } from 'drizzle-orm';

import { polarEnv } from '~/conf/polar';
import { addPurchasedCredits, resetMonthlyAllotment } from '~/server/credits';
import { ensureOrderInvoice, upsertPolarCustomerByExternalId } from '~/server/polar';
import { seedPlans } from '~/server/seed-plans';

await seedPlans().catch((error) => {
  console.error('[polar webhook] failed to seed plans', error);
  throw error;
});
import { db } from '~/db/db-config';
import { invoices, subscriptions } from '~/db/schema/billing.schema';
import { PLANS, type PlanId } from '~/config/plans';
import { user } from '~/db/schema/auth.schema';

const PLAN_MONTHLY_CREDITS: Record<PlanId, number> = {
  free: PLANS.free.monthlyCredits,
  pro: PLANS.pro.monthlyCredits,
  business: PLANS.business.monthlyCredits,
  enterprise: PLANS.enterprise.monthlyCredits,
};

const PRODUCT_TO_PLAN: Record<string, PlanId> = {};

function registerProduct(productId: string | null | undefined, plan: PlanId) {
  if (productId) {
    PRODUCT_TO_PLAN[productId] = plan;
  }
}

registerProduct(polarEnv.POLAR_PRODUCT_PRO_MONTHLY, 'pro');
registerProduct(polarEnv.POLAR_PRODUCT_BUSINESS_MONTHLY, 'business');
registerProduct(polarEnv.VITE_POLAR_PRODUCT_PRO_MONTHLY, 'pro');
registerProduct(polarEnv.VITE_POLAR_PRODUCT_BUSINESS_MONTHLY, 'business');

type SubscriptionLike = {
  customer?: { external_id?: string | null; email?: string | null } | null;
  product?: { id?: string | null; name?: string | null } | null;
  product_id?: string | null;
  metadata?: Record<string, unknown> | null;
  cancel_at_period_end?: boolean | null;
  current_period_start?: string;
  current_period_end?: string;
  id?: string;
  status?: string | null;
};

function getPayloadData<T extends { data?: any }>(payload: T): NonNullable<T['data']> | T {
  return (payload as any)?.data ?? payload;
}

function resolvePlanId(data: SubscriptionLike): PlanId {
  const productId =
    data.product?.id ||
    (typeof data.product_id === 'string' ? data.product_id : undefined) ||
    (data.metadata?.product_id as string | undefined);

  if (productId && PRODUCT_TO_PLAN[productId]) {
    return PRODUCT_TO_PLAN[productId];
  }

  const name = data.product?.name?.toLowerCase() ?? '';
  if (name.includes('business')) return 'business';
  if (name.includes('pro')) return 'pro';

  const planFromMetadata = data.metadata?.planId ?? data.metadata?.plan_id;
  if (typeof planFromMetadata === 'string') {
    const normalized = planFromMetadata as PlanId;
    if (PLAN_MONTHLY_CREDITS[normalized] !== undefined) {
      return normalized;
    }
  }

  return 'pro';
}

async function resolveUserIdFromCustomer(
  customer?: { external_id?: string | null; email?: string | null; name?: string | null } | null,
): Promise<string | null> {
  const externalId = customer?.external_id;
  if (externalId) {
    return externalId;
  }

  const email = customer?.email;
  if (!email) {
    return null;
  }

  const [localUser] = await db
    .select({ id: user.id, email: user.email, name: user.name })
    .from(user)
    .where(eq(user.email, email));

  if (!localUser) {
    console.warn('[polar webhook] no local user for customer email', email);
    return null;
  }

  await upsertPolarCustomerByExternalId({ id: localUser.id, email: localUser.email, name: localUser.name });

  return localUser.id;
}

export const polarWebhookHandlers = {
  onOrderPaid: async (payload: any) => {
    const data = getPayloadData(payload);
    const userId = await resolveUserIdFromCustomer(data.customer);
    if (!userId) return;

    const creditsFromMeta = Number(
      data.metadata?.credits ?? data.product?.metadata?.credits ?? data.metadata?.credit_amount ?? 0,
    );

    if (Number.isFinite(creditsFromMeta) && creditsFromMeta > 0) {
      await addPurchasedCredits(userId, creditsFromMeta, data.id);
    }

    try {
      const invoice = await ensureOrderInvoice(data.id);
      await db
        .insert(invoices)
        .values({
          userId,
          externalId: data.id,
          amountCents: data.amount ?? 0,
          currency: data.currency ?? 'USD',
          hostedUrl: (invoice as any)?.hosted_invoice_url ?? null,
          pdfUrl: (invoice as any)?.invoice_pdf ?? null,
          status: (data.status as string | undefined) ?? 'paid',
        })
        .onConflictDoUpdate({
          target: invoices.externalId,
          set: {
            hostedUrl: (invoice as any)?.hosted_invoice_url ?? null,
            pdfUrl: (invoice as any)?.invoice_pdf ?? null,
            status: (data.status as string | undefined) ?? 'paid',
          },
        });
    } catch (error) {
      console.error('[polar webhook] failed to ensure invoice', error);
    }
  },
  onSubscriptionActive: async (payload: any) => {
    const data = getPayloadData(payload) as SubscriptionLike;
    const userId = await resolveUserIdFromCustomer(data.customer);
    if (!userId) return;

    const planId = resolvePlanId(data);
    const monthlyCredits = PLAN_MONTHLY_CREDITS[planId] ?? 0;

    await db
      .insert(subscriptions)
      .values({
        userId,
        planId,
        status: 'active',
        cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
        currentPeriodStart: data.current_period_start ? new Date(data.current_period_start) : new Date(),
        currentPeriodEnd: data.current_period_end ? new Date(data.current_period_end) : new Date(),
        polarSubscriptionId: data.id ?? '',
      })
      .onConflictDoUpdate({
        target: subscriptions.polarSubscriptionId,
        set: {
          planId,
          status: 'active',
          cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
          currentPeriodStart: data.current_period_start ? new Date(data.current_period_start) : new Date(),
          currentPeriodEnd: data.current_period_end ? new Date(data.current_period_end) : new Date(),
          updatedAt: new Date(),
        },
      });

    if (data.current_period_start && data.current_period_end) {
      await resetMonthlyAllotment(
        userId,
        monthlyCredits,
        new Date(data.current_period_start),
        new Date(data.current_period_end),
      );
    }
  },
  onSubscriptionUpdated: async (payload: any) => {
    const data = getPayloadData(payload) as SubscriptionLike;
    const userId = await resolveUserIdFromCustomer(data.customer);
    if (!userId) return;

    const planId = resolvePlanId(data);

    await db
      .update(subscriptions)
      .set({
        planId,
        cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
        currentPeriodStart: data.current_period_start ? new Date(data.current_period_start) : new Date(),
        currentPeriodEnd: data.current_period_end ? new Date(data.current_period_end) : new Date(),
        status: (data.status as string) ?? 'active',
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.polarSubscriptionId, data.id ?? ''));
  },
  onSubscriptionCanceled: async (payload: any) => {
    const data = getPayloadData(payload) as SubscriptionLike;
    const userId = await resolveUserIdFromCustomer(data.customer);
    if (!userId) return;

    await db
      .update(subscriptions)
      .set({ status: 'canceled', cancelAtPeriodEnd: true, updatedAt: new Date() })
      .where(eq(subscriptions.polarSubscriptionId, data.id ?? ''));
  },
  onSubscriptionRevoked: async (payload: any) => {
    const data = getPayloadData(payload) as SubscriptionLike;
    const userId = await resolveUserIdFromCustomer(data.customer);
    if (!userId) return;

    await db
      .update(subscriptions)
      .set({ status: 'revoked', updatedAt: new Date() })
      .where(eq(subscriptions.polarSubscriptionId, data.id ?? ''));
  },
};

export type PolarWebhookHandlers = typeof polarWebhookHandlers;
