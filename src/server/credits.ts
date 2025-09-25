import { isSameDay } from 'date-fns';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '~/db/db-config';
import {
  creditBalances,
  creditLedger,
  plans,
  subscriptions,
} from '~/db/schema/billing.schema';

type TransactionClient = Parameters<Parameters<typeof db.transaction>[0]>[0];
type QueryClient = typeof db | TransactionClient;

export function dailyIncrementFor(monthlyAllotment: number) {
  return Math.max(1, Math.floor(monthlyAllotment / 30));
}

export async function ensureDailyRefill(userId: string, client: QueryClient = db) {
  const [balance] = await client
    .select()
    .from(creditBalances)
    .where(eq(creditBalances.userId, userId));
  if (!balance) return;

  const now = new Date();
  if (balance.lastDailyRefillAt && isSameDay(now, balance.lastDailyRefillAt)) return;

  const increment = dailyIncrementFor(balance.monthlyAllotment);
  const remainingAllotment = Math.max(0, balance.monthlyAllotment - balance.allotmentUsed);
  const addAmount = Math.min(increment, remainingAllotment);

  if (addAmount > 0) {
    await client.insert(creditLedger).values({ userId, delta: addAmount, kind: 'allotment' });
    await client
      .update(creditBalances)
      .set({ lastDailyRefillAt: now, updatedAt: now })
      .where(eq(creditBalances.userId, userId));
  } else {
    await client
      .update(creditBalances)
      .set({ lastDailyRefillAt: now, updatedAt: now })
      .where(eq(creditBalances.userId, userId));
  }
}

export async function spendOneCredit(userId: string) {
  return db.transaction(async (tx) => {
    await ensureDailyRefill(userId, tx);

    const [balance] = await tx
      .select()
      .from(creditBalances)
      .where(eq(creditBalances.userId, userId))
      .for('update');

    if (!balance) throw new Error('No credit balance');

    const now = new Date();
    if (balance.allotmentUsed < balance.monthlyAllotment) {
      await tx
        .update(creditBalances)
        .set({ allotmentUsed: sql`${creditBalances.allotmentUsed} + 1`, updatedAt: now })
        .where(eq(creditBalances.userId, userId));
    } else {
      if (balance.extraCredits <= 0) throw new Error('No credits left');
      await tx
        .update(creditBalances)
        .set({ extraCredits: sql`${creditBalances.extraCredits} - 1`, updatedAt: now })
        .where(eq(creditBalances.userId, userId));
    }

    await tx.insert(creditLedger).values({ userId, delta: -1, kind: 'usage' });
  });
}

export async function addPurchasedCredits(userId: string, amount: number, sourceId?: string) {
  await db.transaction(async (tx) => {
    const now = new Date();
    await tx
      .update(creditBalances)
      .set({ extraCredits: sql`${creditBalances.extraCredits} + ${amount}`, updatedAt: now })
      .where(eq(creditBalances.userId, userId));

    await tx.insert(creditLedger).values({
      userId,
      delta: amount,
      kind: 'purchase',
      sourceId,
    });
  });
}

export async function resetMonthlyAllotment(
  userId: string,
  monthlyAllotment: number,
  periodStart: Date,
  periodEnd: Date,
) {
  const now = new Date();

  await db
    .insert(creditBalances)
    .values({
      userId,
      periodStart,
      periodEnd,
      monthlyAllotment,
      allotmentUsed: 0,
    })
    .onConflictDoUpdate({
      target: creditBalances.userId,
      set: {
        periodStart,
        periodEnd,
        monthlyAllotment,
        allotmentUsed: 0,
        updatedAt: now,
      },
    });

  await db.insert(creditLedger).values({ userId, delta: monthlyAllotment, kind: 'allotment' });
}

export async function getActiveSubscription(userId: string) {
  const [sub] = await db
    .select({ planId: subscriptions.planId })
    .from(subscriptions)
    .where(
      and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')),
    );

  return sub ?? null;
}

export async function getPlanMonthlyCredits(planId: string) {
  const [plan] = await db
    .select({ monthlyCredits: plans.monthlyCredits })
    .from(plans)
    .where(eq(plans.id, planId));

  return plan?.monthlyCredits ?? 0;
}
