import { Webhooks } from '@polar-sh/tanstack-start';
import { createFileRoute } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';
import { polarEnv } from '~/conf/polar';
import { addPurchasedCredits, resetMonthlyAllotment } from '~/server/credits';
import { ensureOrderInvoice } from '~/server/polar';
import { db } from '~/db/db-config';
import { invoices, subscriptions } from '~/db/schema/billing.schema';
import { PLANS, type PlanId } from '~/config/plans';

type SubscriptionLike = {
  customer?: { external_id?: string | null } | null;
  product?: { id?: string | null; name?: string | null } | null;
  product_id?: string | null;
  metadata?: Record<string, unknown> | null;
};

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

const webhookHandler = Webhooks({
  webhookSecret: polarEnv.POLAR_WEBHOOK_SECRET,
  onOrderPaid: async ({ data }) => {
    const userId = data.customer?.external_id;
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
          hostedUrl: invoice.hosted_invoice_url ?? null,
          pdfUrl: invoice.invoice_pdf ?? null,
          status: (data.status as string | undefined) ?? 'paid',
        })
        .onConflictDoUpdate({
          target: invoices.externalId,
          set: {
            hostedUrl: invoice.hosted_invoice_url ?? null,
            pdfUrl: invoice.invoice_pdf ?? null,
            status: (data.status as string | undefined) ?? 'paid',
          },
        });
    } catch (error) {
      console.error('[polar webhook] failed to ensure invoice', error);
    }
  },
  onSubscriptionActive: async ({ data }) => {
    const userId = data.customer?.external_id;
    if (!userId) return;

    const planId = resolvePlanId(data as SubscriptionLike);
    const monthlyCredits = PLAN_MONTHLY_CREDITS[planId] ?? 0;

    await db
      .insert(subscriptions)
      .values({
        userId,
        planId,
        status: 'active',
        cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
        polarSubscriptionId: data.id,
      })
      .onConflictDoUpdate({
        target: subscriptions.polarSubscriptionId,
        set: {
          planId,
          status: 'active',
          cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
          currentPeriodStart: new Date(data.current_period_start),
          currentPeriodEnd: new Date(data.current_period_end),
          updatedAt: new Date(),
        },
      });

    await resetMonthlyAllotment(
      userId,
      monthlyCredits,
      new Date(data.current_period_start),
      new Date(data.current_period_end),
    );
  },
  onSubscriptionUpdated: async ({ data }) => {
    const userId = data.customer?.external_id;
    if (!userId) return;

    const planId = resolvePlanId(data as SubscriptionLike);

    await db
      .update(subscriptions)
      .set({
        planId,
        cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
        status: (data.status as string) ?? 'active',
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.polarSubscriptionId, data.id));
  },
  onSubscriptionCanceled: async ({ data }) => {
    await db
      .update(subscriptions)
      .set({ status: 'canceled', cancelAtPeriodEnd: true, updatedAt: new Date() })
      .where(eq(subscriptions.polarSubscriptionId, data.id));
  },
  onSubscriptionRevoked: async ({ data }) => {
    await db
      .update(subscriptions)
      .set({ status: 'revoked', updatedAt: new Date() })
      .where(eq(subscriptions.polarSubscriptionId, data.id));
  },
});

export const Route = createFileRoute('/api/webhook/polar')({
  server: {
    handlers: {
      POST: async (ctx) => webhookHandler(ctx),
    },
  },
});
