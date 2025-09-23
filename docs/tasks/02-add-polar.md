Below is a drop‑in refactor that wires TanStack Start v1.131.49 to Polar with: plans (Free/Pro/Business/Enterprise), checkout (subs + one‑time credit packs), customer portal, invoices (list + download/generate), billing profile (email, address, VAT), daily credit refills, cancellation/plan switching, and enterprise demo.

It’s organized to fit a standard Constructa Starter / TanStack Start project. Where you already have equivalents (auth, query client, layout), keep yours and just copy the new pieces in.

0) Install
# server + Polar SDK + adapters + db
pnpm add @polar-sh/sdk @polar-sh/tanstack-start zod drizzle-orm pg
# (or any other pg driver you use, e.g. postgres)
pnpm add -D drizzle-kit


Polar’s official TanStack Start adapter exposes Checkout, CustomerPortal, and Webhooks handlers we use below. 
docs.polar.sh

Customer state & external‑ID mapping (we use your user.id) are first‑class in Polar. 
Polar

1) Environment

.env (example)

# Polar
POLAR_SERVER=sandbox               # "sandbox" or "production"
POLAR_ACCESS_TOKEN=...
POLAR_WEBHOOK_SECRET=...
POLAR_ORGANIZATION_ID=...

# Products (Polar product IDs – create these in Polar dashboard)
POLAR_PRODUCT_PRO_MONTHLY=prod_...
POLAR_PRODUCT_BUSINESS_MONTHLY=prod_...

# Optional one-time “credit pack” products
POLAR_PRODUCT_CREDITS_50=prod_...
POLAR_PRODUCT_CREDITS_100=prod_...

# App URLs used as return links
PUBLIC_URL=https://localhost:5173
CHECKOUT_SUCCESS_URL=${PUBLIC_URL}/billing/success
CHECKOUT_CANCEL_URL=${PUBLIC_URL}/billing

# Database
DATABASE_URL=postgres://...

# Calendly (or external demo booking page)
ENTERPRISE_DEMO_URL=https://calendly.com/your-team/demo


src/env.ts

import { z } from 'zod'

export const env = z.object({
  POLAR_SERVER: z.enum(['sandbox', 'production']).default('sandbox'),
  POLAR_ACCESS_TOKEN: z.string(),
  POLAR_WEBHOOK_SECRET: z.string(),
  POLAR_ORGANIZATION_ID: z.string(),

  POLAR_PRODUCT_PRO_MONTHLY: z.string(),
  POLAR_PRODUCT_BUSINESS_MONTHLY: z.string(),

  POLAR_PRODUCT_CREDITS_50: z.string().optional(),
  POLAR_PRODUCT_CREDITS_100: z.string().optional(),

  PUBLIC_URL: z.string().url(),
  CHECKOUT_SUCCESS_URL: z.string().url(),
  CHECKOUT_CANCEL_URL: z.string().url(),

  DATABASE_URL: z.string().url(),

  ENTERPRISE_DEMO_URL: z.string().url().optional(),
}).parse(import.meta.env)

2) Drizzle schema (billing, subscriptions & credits)

src/db/schema/billing.ts

import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).default(''),
})

export const plans = pgTable('plans', {
  id: varchar('id', { length: 64 }).primaryKey(),    // 'free'|'pro'|'business'|'enterprise'
  name: varchar('name', { length: 64 }).notNull(),
  monthlyCredits: integer('monthly_credits').notNull().default(0),
  polarProductId: varchar('polar_product_id', { length: 64 }), // null for free/enterprise
  unitAmountCents: integer('unit_amount_cents').default(0),
  isCustom: boolean('is_custom').notNull().default(false),     // enterprise
})

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: varchar('plan_id', { length: 64 }).notNull().references(() => plans.id),
  status: varchar('status', { length: 32 }).notNull(), // 'active'|'trialing'|'past_due'|'canceled'|'revoked'
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }).notNull(),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }).notNull(),
  polarSubscriptionId: uuid('polar_subscription_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const billingInfo = pgTable('billing_info', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  billingEmail: varchar('billing_email', { length: 255 }),
  company: varchar('company', { length: 255 }),
  line1: varchar('line1', { length: 255 }),
  line2: varchar('line2', { length: 255 }),
  city: varchar('city', { length: 128 }),
  state: varchar('state', { length: 128 }),
  postalCode: varchar('postal_code', { length: 32 }),
  country: varchar('country', { length: 2 }),
  vat: varchar('vat', { length: 64 }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
})

export const creditBalances = pgTable('credit_balances', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
  periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
  monthlyAllotment: integer('monthly_allotment').notNull().default(0),
  allotmentUsed: integer('allotment_used').notNull().default(0),
  extraCredits: integer('extra_credits').notNull().default(0), // purchased carry-over
  lastDailyRefillAt: timestamp('last_daily_refill_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
})

export const creditLedger = pgTable('credit_ledger', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  delta: integer('delta').notNull(), // + increment, - usage
  kind: varchar('kind', { length: 16 }).notNull(), // 'allotment'|'purchase'|'usage'|'refund'|'adjustment'
  sourceId: varchar('source_id', { length: 128 }), // invoice/order/subscription id
  meta: jsonb('meta').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  source: varchar('source', { length: 16 }).notNull().default('polar'),
  externalId: varchar('external_id', { length: 128 }).notNull(), // Polar order id
  number: varchar('number', { length: 64 }),
  hostedUrl: text('hosted_url'),
  pdfUrl: text('pdf_url'),
  amountCents: integer('amount_cents').notNull().default(0),
  currency: varchar('currency', { length: 8 }).notNull().default('USD'),
  status: varchar('status', { length: 24 }).notNull().default('paid'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})


If you prefer not to store invoices locally, you can skip invoices and read from Polar “orders” on demand. We include both patterns.

3) Polar client & helpers

src/server/polar.ts

import { Polar } from '@polar-sh/sdk'
import { env } from '~/env'

export const polar = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: env.POLAR_SERVER === 'sandbox' ? 'https://sandbox-api.polar.sh' : 'https://api.polar.sh',
})

// Ensure a Polar customer exists tied to your user.id (external id)
export async function upsertPolarCustomerByExternalId(user: { id: string; email: string; name?: string | null }) {
  // Update-by-external-ID acts as an upsert for external mapping in practice
  const res = await polar.customers.updateExternal({
    externalId: user.id,
    customerUpdateExternalID: {
      email: user.email,
      name: user.name ?? user.email.split('@')[0],
    },
  })
  return res
}

// Customer portal session URL (server-side only)
export async function createCustomerPortalUrlForUser(user: { id: string }) {
  const session = await polar.customerSessions.create({ externalCustomerId: user.id })
  return session.customerPortalUrl // direct URL to redirect
}

// List orders (for invoices) for a given user
export async function listOrdersByExternalCustomerId(userId: string, limit = 50) {
  const list = await polar.orders.list({
    limit,
    externalCustomerId: userId,
    organizationId: env.POLAR_ORGANIZATION_ID,
  })
  return list.items
}

// Generate + fetch invoice (if needed) for an order
export async function ensureOrderInvoice(orderId: string) {
  try {
    const inv = await polar.orders.getInvoice({ id: orderId })
    return inv
  } catch {
    await polar.orders.generateInvoice({ id: orderId })
    // Small delay is usually enough; in production, prefer listening to order.updated webhook.
    for (let i = 0; i < 5; i++) {
      await new Promise(r => setTimeout(r, 600))
      try {
        const again = await polar.orders.getInvoice({ id: orderId })
        return again
      } catch {}
    }
    throw new Error('Invoice not ready yet')
  }
}

// Get consolidated "customer state" (active subscriptions, grants, meters)
export async function getCustomerStateByExternalId(userId: string) {
  return polar.customers.stateExternalGet({ externalId: userId })
}


Polar provides customer sessions that return a customer_portal_url for self‑serve portal access, and updateExternal to manage customer info by your user.id. 
docs.polar.sh
+1

For invoices, Polar exposes “generate invoice” and “get invoice” APIs on Orders; we use those here. 
docs.polar.sh
+1

4) Credits logic (daily refill + usage)

src/server/credits.ts

import { and, eq, sql } from 'drizzle-orm'
import { db } from '~/db' // your existing drizzle instance
import { creditBalances, creditLedger, subscriptions, plans } from '~/db/schema/billing'
import { addDays, isSameDay } from 'date-fns'

// Compute daily increment (simple monthly/30 pro‑rate)
export function dailyIncrementFor(monthlyAllotment: number) {
  return Math.max(1, Math.floor(monthlyAllotment / 30))
}

export async function ensureDailyRefill(userId: string) {
  const [balance] = await db.select().from(creditBalances).where(eq(creditBalances.userId, userId))
  if (!balance) return

  const now = new Date()
  if (balance.lastDailyRefillAt && isSameDay(now, balance.lastDailyRefillAt)) return

  const increment = dailyIncrementFor(balance.monthlyAllotment)
  const usedAllotment = balance.allotmentUsed
  const remainingAllotment = Math.max(0, balance.monthlyAllotment - usedAllotment)
  const add = Math.min(increment, remainingAllotment)

  if (add > 0) {
    await db.transaction(async (tx) => {
      await tx.insert(creditLedger).values({ userId, delta: add, kind: 'allotment' })
      await tx.update(creditBalances)
        .set({ lastDailyRefillAt: now, updatedAt: now })
        .where(eq(creditBalances.userId, userId))
    })
  } else {
    await db.update(creditBalances)
      .set({ lastDailyRefillAt: now, updatedAt: now })
      .where(eq(creditBalances.userId, userId))
  }
}

// Consume 1 credit. Prefer monthly allotment first, then extra_credits.
export async function spendOneCredit(userId: string) {
  return db.transaction(async (tx) => {
    const [b] = await tx.select().from(creditBalances).where(eq(creditBalances.userId, userId)).for('update')
    if (!b) throw new Error('No credit balance')

    // On-demand refill before spending
    await ensureDailyRefill(userId)

    let fromAllotment = 0
    if (b.allotmentUsed < b.monthlyAllotment) {
      fromAllotment = 1
      await tx.update(creditBalances)
        .set({ allotmentUsed: sql`${creditBalances.allotmentUsed} + 1`, updatedAt: new Date() })
        .where(eq(creditBalances.userId, userId))
    } else {
      if (b.extraCredits <= 0) throw new Error('No credits left')
      await tx.update(creditBalances)
        .set({ extraCredits: sql`${creditBalances.extraCredits} - 1`, updatedAt: new Date() })
        .where(eq(creditBalances.userId, userId))
    }

    await tx.insert(creditLedger).values({
      userId,
      delta: -1,
      kind: 'usage',
    })
  })
}

// Add purchased credits
export async function addPurchasedCredits(userId: string, amount: number, sourceId?: string) {
  await db.transaction(async (tx) => {
    await tx.update(creditBalances)
      .set({ extraCredits: sql`${creditBalances.extraCredits} + ${amount}`, updatedAt: new Date() })
      .where(eq(creditBalances.userId, userId))

    await tx.insert(creditLedger).values({
      userId,
      delta: amount,
      kind: 'purchase',
      sourceId,
    })
  })
}

// Initialize/refresh balance on subscription (re)start
export async function resetMonthlyAllotment(userId: string, monthlyAllotment: number, periodStart: Date, periodEnd: Date) {
  await db.insert(creditBalances).values({
    userId,
    periodStart,
    periodEnd,
    monthlyAllotment,
    allotmentUsed: 0,
    // keep extraCredits (carry-over purchased credits) if exists:
  }).onConflictDoUpdate({
    target: creditBalances.userId,
    set: {
      periodStart,
      periodEnd,
      monthlyAllotment,
      allotmentUsed: 0,
      updatedAt: new Date(),
    }
  })
  // Log allotment (for visibility)
  await db.insert(creditLedger).values({ userId, delta: monthlyAllotment, kind: 'allotment' })
}

5) Polar adapter routes (checkout, portal, webhooks)

The TanStack Start adapter gives us dead‑simple handlers:
Checkout() → redirects to hosted checkout;
CustomerPortal() → opens Polar’s portal;
Webhooks() → verified webhook payloads with optional granular handlers. 
docs.polar.sh

src/routes/api/checkout.ts

import { Checkout } from '@polar-sh/tanstack-start'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { env } from '~/env'

// GET /api/checkout?products=prod_xxx[,prod_yyy]
// We compute customer info server-side; external id = your user id.
export const ServerRoute = createServerFileRoute('/api/checkout').methods({
  GET: Checkout({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: env.POLAR_SERVER as 'sandbox' | 'production',
    successUrl: env.CHECKOUT_SUCCESS_URL,
    // Optional: theme: 'dark',
    // Note: Adapter supports passing 'customerExternalId' etc. via query string — but
    // we’ll append them server-side to avoid tampering.
    transformRequest: async (req) => {
      // TODO: replace with your real auth
      const userHeader = req.headers.get('x-mock-user')
      if (!userHeader) throw new Response('Unauthorized', { status: 401 })
      const user = JSON.parse(userHeader) as { id: string; email: string; name?: string }

      const url = new URL(req.url)
      url.searchParams.set('customerExternalId', user.id)
      url.searchParams.set('customerEmail', user.email)
      if (user.name) url.searchParams.set('customerName', user.name)
      return new Request(url, req)
    },
  }),
})


src/routes/api/portal.ts

import { CustomerPortal } from '@polar-sh/tanstack-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { env } from '~/env'
import { upsertPolarCustomerByExternalId } from '~/server/polar'

export const APIRoute = createAPIFileRoute('/api/portal')({
  GET: CustomerPortal({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: env.POLAR_SERVER as 'sandbox' | 'production',
    // We resolve the Polar customer ID by external id (your user.id).
    getCustomerId: async (request: Request) => {
      // TODO: replace with your real auth
      const userHeader = request.headers.get('x-mock-user')
      if (!userHeader) throw new Response('Unauthorized', { status: 401 })
      const user = JSON.parse(userHeader) as { id: string; email: string; name?: string }
      const customer = await upsertPolarCustomerByExternalId(user)
      return customer.id
    },
  })
})


src/routes/api/webhook/polar.ts

import { Webhooks, type PolarWebhookPayload } from '@polar-sh/tanstack-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { env } from '~/env'
import { addPurchasedCredits, resetMonthlyAllotment } from '~/server/credits'
import { db } from '~/db'
import { invoices, subscriptions, plans, users } from '~/db/schema/billing'
import { eq } from 'drizzle-orm'

// Map your plan ids to monthly credits:
const PLAN_CREDITS: Record<string, number> = {
  pro: 100,
  business: 150,
}

export const APIRoute = createAPIFileRoute('/api/webhook/polar')({
  POST: Webhooks({
    webhookSecret: env.POLAR_WEBHOOK_SECRET,
    // Catch-all (optional)
    onPayload: async (_payload) => { /* optional logging */ },

    // Orders (one-time purchases, incl. credit packs)
    onOrderPaid: async (p) => {
      const order = p.data
      // We receive external_customer_id in order.customer.external_id
      const userId = order.customer?.external_id
      if (!userId) return

      // If this order is a credit pack, increment credits:
      // We rely on product metadata (set in Polar dashboard) or Checkout metadata sent by us.
      const creditsFromMeta = Number(order?.metadata?.credits ?? 0)
      if (creditsFromMeta > 0) {
        await addPurchasedCredits(userId, creditsFromMeta, order.id)
      }

      // Store invoice link if present
      try {
        const inv = await import('~/server/polar').then(m => m.ensureOrderInvoice(order.id))
        await db.insert(invoices).values({
          userId,
          externalId: order.id,
          amountCents: order.amount ?? 0,
          currency: order.currency ?? 'USD',
          hostedUrl: inv.hosted_invoice_url ?? null,
          pdfUrl: inv.invoice_pdf ?? null,
          status: 'paid',
        }).onConflictDoNothing()
      } catch {}
    },

    // Subscriptions
    onSubscriptionActive: async (p) => {
      const sub = p.data
      const userId = sub.customer?.external_id
      if (!userId) return

      // Map Polar product -> our plan id
      const planId = sub.product?.name?.toLowerCase().includes('business') ? 'business' : 'pro'
      const monthlyCredits = PLAN_CREDITS[planId] ?? 0

      // Persist subscription record
      await db.insert(subscriptions).values({
        userId,
        planId,
        status: 'active',
        cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
        currentPeriodStart: new Date(sub.current_period_start),
        currentPeriodEnd: new Date(sub.current_period_end),
        polarSubscriptionId: sub.id,
      }).onConflictDoUpdate({
        target: subscriptions.polarSubscriptionId,
        set: {
          status: 'active',
          cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
          currentPeriodStart: new Date(sub.current_period_start),
          currentPeriodEnd: new Date(sub.current_period_end),
        }
      })

      // Reset monthly allotment for this period
      await resetMonthlyAllotment(
        userId,
        monthlyCredits,
        new Date(sub.current_period_start),
        new Date(sub.current_period_end),
      )
    },

    onSubscriptionUpdated: async (p) => {
      const sub = p.data
      const userId = sub.customer?.external_id
      if (!userId) return
      await db.update(subscriptions)
        .set({
          cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
          currentPeriodStart: new Date(sub.current_period_start),
          currentPeriodEnd: new Date(sub.current_period_end),
          status: sub.status as any,
        })
        .where(eq(subscriptions.polarSubscriptionId, sub.id))
    },

    onSubscriptionCanceled: async (p) => {
      const sub = p.data
      await db.update(subscriptions)
        .set({ status: 'canceled', cancelAtPeriodEnd: true })
        .where(eq(subscriptions.polarSubscriptionId, sub.id))
    },

    onSubscriptionRevoked: async (p) => {
      const sub = p.data
      await db.update(subscriptions)
        .set({ status: 'revoked' })
        .where(eq(subscriptions.polarSubscriptionId, sub.id))
    },
  }),
})


The adapter verifies webhook signatures and exposes granular handlers like onOrderPaid, onSubscriptionActive, etc., so we can keep the DB in sync and credit users when orders succeed. 
docs.polar.sh

6) Plan config (Pro/Business/Enterprise)

src/config/plans.ts

import { env } from '~/env'

export const PLANS = {
  free: { id: 'free', name: 'Free', monthlyCredits: 0, polarProductId: null as string | null },
  pro:  { id: 'pro',  name: 'Pro', monthlyCredits: 100, polarProductId: env.POLAR_PRODUCT_PRO_MONTHLY },
  business: { id: 'business', name: 'Business', monthlyCredits: 150, polarProductId: env.POLAR_PRODUCT_BUSINESS_MONTHLY },
  enterprise: { id: 'enterprise', name: 'Enterprise', monthlyCredits: 0, polarProductId: null, isCustom: true },
} as const

export type PlanId = keyof typeof PLANS

7) Billing hooks (TanStack Query)

src/hooks/useBilling.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PLANS } from '~/config/plans'

async function fetchBillingInfo() {
  const res = await fetch('/api/billing/info')
  if (!res.ok) throw new Error('Failed to load')
  return res.json() as Promise<{
    planId: keyof typeof PLANS
    status: string
    cancelAtPeriodEnd: boolean
    currentPeriodEnd: string
    credits: { monthlyAllotment: number; allotmentUsed: number; extraCredits: number }
  }>
}

export function useBillingInfo() {
  return useQuery({ queryKey: ['billingInfo'], queryFn: fetchBillingInfo })
}

export function useStartCheckout() {
  return (products: string[], metadata?: Record<string, unknown>) => {
    const url = new URL('/api/checkout', window.location.origin)
    url.searchParams.set('products', products.join(','))
    if (metadata) url.searchParams.set('metadata', encodeURIComponent(JSON.stringify(metadata)))
    window.location.href = url.toString()
  }
}

export function useOpenPortal() {
  return () => { window.location.href = '/api/portal' }
}


src/routes/api/billing/info.ts (server data for the hook)

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { db } from '~/db'
import { subscriptions, creditBalances } from '~/db/schema/billing'
import { and, desc, eq } from 'drizzle-orm'
import { PLANS } from '~/config/plans'
import { ensureDailyRefill } from '~/server/credits'

export const APIRoute = createAPIFileRoute('/api/billing/info')({
  GET: async ({ request }) => {
    // TODO: replace with your real auth
    const userHeader = request.headers.get('x-mock-user')
    if (!userHeader) return new Response('Unauthorized', { status: 401 })
    const user = JSON.parse(userHeader) as { id: string }

    await ensureDailyRefill(user.id)

    const [sub] = await db.select().from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .orderBy(desc(subscriptions.updatedAt))
      .limit(1)

    const [credits] = await db.select().from(creditBalances).where(eq(creditBalances.userId, user.id))

    const planId = (sub?.planId ?? 'free') as keyof typeof PLANS
    return Response.json({
      planId,
      status: sub?.status ?? 'free',
      cancelAtPeriodEnd: Boolean(sub?.cancelAtPeriodEnd),
      currentPeriodEnd: sub?.currentPeriodEnd?.toISOString() ?? null,
      credits: credits ? {
        monthlyAllotment: credits.monthlyAllotment,
        allotmentUsed: credits.allotmentUsed,
        extraCredits: credits.extraCredits,
      } : { monthlyAllotment: 0, allotmentUsed: 0, extraCredits: 0 }
    })
  }
})

8) Billing page (subscribe/switch/cancel, buy credits, invoices)

src/components/billing/CreditMeter.tsx

import * as React from 'react'

export function CreditMeter({ allotment, used, extra }: { allotment: number; used: number; extra: number }) {
  const baseLeft = Math.max(0, allotment - used)
  const total = baseLeft + extra
  return (
    <div className="rounded border p-3">
      <div className="text-sm font-medium">Credits</div>
      <div className="mt-1 text-2xl">{baseLeft} / {allotment} <span className="text-sm text-muted-foreground">(+{extra} extra)</span></div>
      <div className="mt-2 h-2 w-full bg-gray-200 rounded">
        <div className="h-2 bg-black rounded" style={{ width: `${Math.min(100, (used / Math.max(1, allotment)) * 100)}%` }} />
      </div>
      <div className="mt-1 text-xs text-muted-foreground">Refills daily while below monthly cap.</div>
    </div>
  )
}


src/components/billing/PlanCard.tsx

import * as React from 'react'

export function PlanCard(props: {
  name: string
  price: string
  features: string[]
  current?: boolean
  cta: React.ReactNode
}) {
  return (
    <div className={`rounded border p-4 ${props.current ? 'ring-2 ring-black' : ''}`}>
      <div className="text-lg font-semibold">{props.name}</div>
      <div className="mt-1 text-2xl">{props.price}</div>
      <ul className="mt-2 text-sm space-y-1">
        {props.features.map((f) => <li key={f}>• {f}</li>)}
      </ul>
      <div className="mt-4">{props.cta}</div>
    </div>
  )
}


src/components/billing/InvoiceList.tsx

import * as React from 'react'

type Invoice = { id: string; date: string; amount: string; hostedUrl?: string; pdfUrl?: string; orderId?: string; isInvoiceGenerated?: boolean }

export function InvoiceList({ items, onGenerate }: { items: Invoice[], onGenerate?: (orderId: string) => void }) {
  return (
    <div className="rounded border p-4">
      <div className="text-lg font-semibold">Invoices</div>
      <div className="mt-2 space-y-2">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between border rounded px-3 py-2">
            <div>
              <div className="font-medium">{i.amount}</div>
              <div className="text-xs text-muted-foreground">{i.date}</div>
            </div>
            <div className="flex items-center gap-2">
              {i.pdfUrl ? (
                <a className="underline" href={i.pdfUrl} target="_blank" rel="noreferrer">Download PDF</a>
              ) : i.hostedUrl ? (
                <a className="underline" href={i.hostedUrl} target="_blank" rel="noreferrer">Open</a>
              ) : i.orderId && onGenerate ? (
                <button className="underline" onClick={() => onGenerate(i.orderId)}>Generate</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


src/routes/(app)/billing.tsx

import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PLANS } from '~/config/plans'
import { useBillingInfo, useStartCheckout, useOpenPortal } from '~/hooks/useBilling'
import { CreditMeter } from '~/components/billing/CreditMeter'
import { PlanCard } from '~/components/billing/PlanCard'

export const Route = createFileRoute('/(app)/billing')({
  component: BillingPage,
})

function BillingPage() {
  const { data, isLoading } = useBillingInfo()
  const startCheckout = useStartCheckout()
  const openPortal = useOpenPortal()

  if (isLoading || !data) return <div className="p-6">Loading…</div>
  const currentPlan = data.planId

  const buyCredits = (credits: number, productId?: string) => {
    if (!productId) return alert('Admin: assign POLAR_PRODUCT_CREDITS_* in env')
    startCheckout([productId], { kind: 'credit_pack', credits })
  }

  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <CreditMeter
        allotment={data.credits.monthlyAllotment}
        used={data.credits.allotmentUsed}
        extra={data.credits.extraCredits}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlanCard
          name="Pro"
          price="$25 / month"
          features={['100 monthly credits', 'Private projects', 'Roles & permissions']}
          current={currentPlan === 'pro'}
          cta={
            currentPlan === 'pro' ? (
              <button className="w-full border rounded py-2" onClick={openPortal}>Manage in Portal</button>
            ) : (
              <button
                className="w-full border rounded py-2"
                onClick={() => startCheckout([PLANS.pro.polarProductId!])}
              >
                {currentPlan === 'business' ? 'Downgrade to Pro' : 'Upgrade to Pro'}
              </button>
            )
          }
        />

        <PlanCard
          name="Business"
          price="$50 / month"
          features={['150 monthly credits', 'SSO', 'Personal Projects']}
          current={currentPlan === 'business'}
          cta={
            currentPlan === 'business' ? (
              <button className="w-full border rounded py-2" onClick={openPortal}>Manage in Portal</button>
            ) : (
              <button
                className="w-full border rounded py-2"
                onClick={() => startCheckout([PLANS.business.polarProductId!])}
              >
                {currentPlan === 'pro' ? 'Upgrade to Business' : 'Choose Business'}
              </button>
            )
          }
        />

        <PlanCard
          name="Enterprise"
          price="Custom"
          features={['Dedicated support', 'Onboarding', 'Custom connections']}
          current={currentPlan === 'enterprise'}
          cta={
            PLANS.enterprise.isCustom ? (
              <a className="w-full inline-flex items-center justify-center border rounded py-2" href={import.meta.env.ENTERPRISE_DEMO_URL ?? '#'} target="_blank">Book a demo</a>
            ) : (
              <button className="w-full border rounded py-2" onClick={openPortal}>Manage</button>
            )
          }
        />
      </div>

      <div className="rounded border p-4">
        <div className="font-semibold mb-2">Need more credits?</div>
        <div className="flex items-center gap-3">
          <button className="border rounded px-3 py-2" onClick={() => buyCredits(50, import.meta.env.POLAR_PRODUCT_CREDITS_50)}>Buy 50</button>
          <button className="border rounded px-3 py-2" onClick={() => buyCredits(100, import.meta.env.POLAR_PRODUCT_CREDITS_100)}>Buy 100</button>
          <button className="ml-auto underline" onClick={openPortal}>Open billing portal</button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Invoices</h2>
        <Link to="/settings/billing" className="underline">Go to Billing Settings to manage invoices & billing details →</Link>
      </div>
    </div>
  )
}


src/routes/(app)/billing/success.tsx

import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/billing/success')({
  component: () => (
    <div className="p-6">
      <div className="text-2xl font-semibold">Payment successful ✅</div>
      <div className="mt-2">We’re updating your account. If you don’t see the changes immediately, refresh the page in a few seconds.</div>
      <Link to="/billing" className="underline mt-4 inline-block">Back to Billing</Link>
    </div>
  ),
})

9) Settings → Billing details (email, address, VAT) + invoices

src/routes/(app)/settings/billing.tsx

import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/(app)/settings/billing')({
  component: SettingsBilling,
  loader: async () => {
    const res = await fetch('/api/settings/billing', { credentials: 'include' })
    if (!res.ok) throw new Error('Failed to load')
    return res.json() as Promise<{ profile: BillingProfile; invoices: UIInvoice[] }>
  },
})

const BillingSchema = z.object({
  billingEmail: z.string().email(),
  company: z.string().optional(),
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().length(2).optional(),
  vat: z.string().optional(),
})

type BillingProfile = z.infer<typeof BillingSchema>
type UIInvoice = { id: string; date: string; amount: string; hostedUrl?: string; pdfUrl?: string; orderId?: string; isInvoiceGenerated?: boolean }

function SettingsBilling() {
  const data = Route.useLoaderData()
  const [form, setForm] = React.useState<BillingProfile>(data.profile)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [invoices, setInvoices] = React.useState<UIInvoice[]>(data.invoices)

  async function save() {
    setSaving(true); setError(null)
    const res = await fetch('/api/settings/billing', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) setError((await res.text()) || 'Failed')
    setSaving(false)
  }

  async function generate(orderId: string) {
    const res = await fetch(`/api/invoices/${orderId}/generate`, { method: 'POST' })
    if (res.ok) {
      const { pdfUrl, hostedUrl } = await res.json()
      setInvoices(cur => cur.map(i => i.orderId === orderId ? ({ ...i, pdfUrl, hostedUrl }) : i))
    }
  }

  return (
    <div className="container mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Billing settings</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={(e) => { e.preventDefault(); void save() }}>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Billing email</span>
          <input className="border rounded px-2 py-1" value={form.billingEmail ?? ''} onChange={e => setForm({ ...form, billingEmail: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Company</span>
          <input className="border rounded px-2 py-1" value={form.company ?? ''} onChange={e => setForm({ ...form, company: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm">Address line 1</span>
          <input className="border rounded px-2 py-1" value={form.line1 ?? ''} onChange={e => setForm({ ...form, line1: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm">Address line 2</span>
          <input className="border rounded px-2 py-1" value={form.line2 ?? ''} onChange={e => setForm({ ...form, line2: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">City</span>
          <input className="border rounded px-2 py-1" value={form.city ?? ''} onChange={e => setForm({ ...form, city: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">State/Region</span>
          <input className="border rounded px-2 py-1" value={form.state ?? ''} onChange={e => setForm({ ...form, state: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Postal Code</span>
          <input className="border rounded px-2 py-1" value={form.postalCode ?? ''} onChange={e => setForm({ ...form, postalCode: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Country (ISO 2 letters)</span>
          <input className="border rounded px-2 py-1" value={form.country ?? ''} onChange={e => setForm({ ...form, country: e.target.value })}/>
        </label>
        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm">VAT / Tax ID</span>
          <input className="border rounded px-2 py-1" value={form.vat ?? ''} onChange={e => setForm({ ...form, vat: e.target.value })}/>
        </label>
        {error && <div className="text-red-600">{error}</div>}
        <div className="md:col-span-2">
          <button className="border rounded px-4 py-2" disabled={saving}>{saving ? 'Saving…' : 'Save billing details'}</button>
          <a className="ml-3 underline" href="/api/portal">Open customer portal</a>
        </div>
      </form>

      <section>
        <h2 className="text-lg font-semibold mb-2">Invoices</h2>
        <InvoicesBlock onGenerate={generate}/>
      </section>
    </div>
  )
}

function InvoicesBlock({ onGenerate }: { onGenerate: (orderId: string) => void }) {
  const [items, setItems] = React.useState<UIInvoice[] | null>(null)
  React.useEffect(() => {
    fetch('/api/invoices').then(r => r.json()).then(setItems)
  }, [])
  if (!items) return <div>Loading…</div>
  return (
    <div className="space-y-2">
      {items.map(i => (
        <div key={i.id} className="flex justify-between items-center border rounded px-3 py-2">
          <div>
            <div className="font-medium">{i.amount}</div>
            <div className="text-xs text-muted-foreground">{i.date}</div>
          </div>
          <div>
            {i.pdfUrl
              ? <a href={i.pdfUrl} className="underline" target="_blank" rel="noreferrer">Download</a>
              : i.hostedUrl
                ? <a href={i.hostedUrl} className="underline" target="_blank" rel="noreferrer">Open</a>
                : i.orderId
                  ? <button onClick={() => onGenerate(i.orderId)} className="underline">Generate</button>
                  : null}
          </div>
        </div>
      ))}
    </div>
  )
}


Server endpoints used above:

src/routes/api/settings/billing.ts

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { z } from 'zod'
import { db } from '~/db'
import { billingInfo } from '~/db/schema/billing'
import { eq } from 'drizzle-orm'
import { upsertPolarCustomerByExternalId } from '~/server/polar'

const Form = z.object({
  billingEmail: z.string().email(),
  company: z.string().optional().nullable(),
  line1: z.string().optional().nullable(),
  line2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().length(2).optional().nullable(),
  vat: z.string().optional().nullable(),
})

export const APIRoute = createAPIFileRoute('/api/settings/billing')({
  GET: async ({ request }) => {
    const userHeader = request.headers.get('x-mock-user')
    if (!userHeader) return new Response('Unauthorized', { status: 401 })
    const user = JSON.parse(userHeader) as { id: string; email: string; name?: string }

    const [bi] = await db.select().from(billingInfo).where(eq(billingInfo.userId, user.id))
    return Response.json({
      profile: {
        billingEmail: bi?.billingEmail ?? user.email,
        company: bi?.company ?? '',
        line1: bi?.line1 ?? '',
        line2: bi?.line2 ?? '',
        city: bi?.city ?? '',
        state: bi?.state ?? '',
        postalCode: bi?.postalCode ?? '',
        country: bi?.country ?? '',
        vat: bi?.vat ?? '',
      },
      invoices: [] as any[], // not used here; we fetch via /api/invoices
    })
  },
  PATCH: async ({ request }) => {
    const userHeader = request.headers.get('x-mock-user')
    if (!userHeader) return new Response('Unauthorized', { status: 401 })
    const user = JSON.parse(userHeader) as { id: string; email: string; name?: string }
    const body = await request.json()
    const parsed = Form.safeParse(body)
    if (!parsed.success) return new Response('Invalid', { status: 422 })

    const data = parsed.data

    await db.insert(billingInfo).values({ userId: user.id, ...data })
      .onConflictDoUpdate({
        target: billingInfo.userId,
        set: { ...data, updatedAt: new Date() }
      })

    // Sync to Polar customer (so invoices use it)
    await upsertPolarCustomerByExternalId({
      id: user.id,
      email: data.billingEmail,
      name: user.name,
    })

    // And patch address + tax in Polar:
    await (await import('~/server/polar')).polar.customers.updateExternal({
      externalId: user.id,
      customerUpdateExternalID: {
        email: data.billingEmail,
        name: user.name ?? null,
        billingAddress: data.line1 ? {
          line1: data.line1 ?? '',
          line2: data.line2 ?? '',
          postalCode: data.postalCode ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          country: data.country ?? 'US',
        } : null,
        taxId: data.vat ? [data.vat, guessVatType(data.vat)] : null,
      }
    })

    return new Response(null, { status: 204 })
  }
})

function guessVatType(v: string): any {
  // minimal heuristic: EU VAT if starts with 2 letters, otherwise US EIN
  return /^[A-Z]{2}/i.test(v) ? 'eu_vat' : 'us_ein'
}


We update Polar’s customer by external ID so invoice headers match the user’s billing info (name/address/VAT). 
docs.polar.sh

src/routes/api/invoices/index.ts (list from Polar orders)

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { listOrdersByExternalCustomerId } from '~/server/polar'

export const APIRoute = createAPIFileRoute('/api/invoices')({
  GET: async ({ request }) => {
    const userHeader = request.headers.get('x-mock-user')
    if (!userHeader) return new Response('Unauthorized', { status: 401 })
    const user = JSON.parse(userHeader) as { id: string }

    const orders = await listOrdersByExternalCustomerId(user.id, 50)

    const items = orders.map(o => ({
      id: o.id,
      orderId: o.id,
      date: new Date(o.created_at).toLocaleString(),
      amount: `${((o.amount ?? 0) / 100).toFixed(2)} ${o.currency ?? 'USD'}`,
      hostedUrl: (o.invoice as any)?.hosted_invoice_url,
      pdfUrl: (o.invoice as any)?.invoice_pdf,
      isInvoiceGenerated: Boolean((o.invoice as any)?.invoice_pdf),
    }))

    return Response.json(items)
  }
})


src/routes/api/invoices/$orderId/generate.ts

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { ensureOrderInvoice } from '~/server/polar'

export const APIRoute = createAPIFileRoute('/api/invoices/$orderId/generate')({
  POST: async ({ params }) => {
    const inv = await ensureOrderInvoice(params.orderId)
    return Response.json({ pdfUrl: inv.invoice_pdf, hostedUrl: inv.hosted_invoice_url })
  }
})


Polar exposes generate and get invoice endpoints for Orders; we wrap them above to “generate if missing → return URL”. 
docs.polar.sh

10) Cancel / switch plan

You can let users manage via the portal (simplest) or expose direct API:

src/routes/api/subscription/cancel.ts

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { polar } from '~/server/polar'
import { db } from '~/db'
import { subscriptions } from '~/db/schema/billing'
import { and, desc, eq } from 'drizzle-orm'

export const APIRoute = createAPIFileRoute('/api/subscription/cancel')({
  POST: async ({ request }) => {
    const userHeader = request.headers.get('x-mock-user')
    if (!userHeader) return new Response('Unauthorized', { status: 401 })
    const user = JSON.parse(userHeader) as { id: string }

    const [sub] = await db.select().from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .orderBy(desc(subscriptions.updatedAt)).limit(1)

    if (!sub?.polarSubscriptionId) return new Response('No active subscription', { status: 400 })

    await polar.subscriptions.update({
      id: sub.polarSubscriptionId,
      subscriptionUpdate: { cancel: { revokeImmediately: false } } as any, // schedule at period end
    })
    return new Response(null, { status: 204 })
  }
})


Polar’s Subscription update supports cancellation (end‑of‑period) and swaps (change product). 
docs.polar.sh
+1

For switch plan, send the target product to /api/checkout to let Polar/Stripe prorate, or call subscriptions.update with product_id. The portal already supports both. (We default to portal for simplicity & consistency.)

11) Enterprise CTA

src/components/billing/EnterpriseCTA.tsx

export function EnterpriseCTA() {
  const url = import.meta.env.ENTERPRISE_DEMO_URL
  return (
    <a href={url} target="_blank" className="inline-flex items-center justify-center border rounded px-4 py-2">
      Book a demo
    </a>
  )
}

12) Minimal auth shim (replace with your auth)

src/lib/auth.ts

// Replace this with your Constructa Starter auth (e.g., Lucia/Clerk/etc.)
export type SessionUser = { id: string; email: string; name?: string | null }
export async function requireUser(request: Request): Promise<SessionUser> {
  const mock = request.headers.get('x-mock-user')
  if (mock) return JSON.parse(mock)
  throw new Response('Unauthorized', { status: 401 })
}


In production, remove the x-mock-user path and wire to your real session. The Billing/Settings routes are already server‑only for sensitive actions.

13) Daily refill job (optional cron)

Create a tiny route you can hit via cron (or a scheduled job):

src/routes/api/jobs/daily-credit-refill.ts

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { db } from '~/db'
import { subscriptions } from '~/db/schema/billing'
import { ensureDailyRefill } from '~/server/credits'
import { and, eq } from 'drizzle-orm'

export const APIRoute = createAPIFileRoute('/api/jobs/daily-credit-refill')({
  POST: async () => {
    const active = await db.select({ userId: subscriptions.userId }).from(subscriptions)
      .where(eq(subscriptions.status, 'active'))
    for (const row of active) {
      await ensureDailyRefill(row.userId)
    }
    return new Response('ok')
  }
})


Schedule this once per day in your hosting platform; the runtime logic also refills on-demand before spending to prevent drift.

14) Wire plans in DB (migration seed)

src/server/seedPlans.ts

import { db } from '~/db'
import { plans } from '~/db/schema/billing'
import { PLANS } from '~/config/plans'

export async function seedPlans() {
  await db.insert(plans).values([
    { id: 'free', name: 'Free', monthlyCredits: 0, isCustom: false },
    { id: 'pro', name: 'Pro', monthlyCredits: PLANS.pro.monthlyCredits, polarProductId: PLANS.pro.polarProductId!, isCustom: false, unitAmountCents: 2500 },
    { id: 'business', name: 'Business', monthlyCredits: PLANS.business.monthlyCredits, polarProductId: PLANS.business.polarProductId!, isCustom: false, unitAmountCents: 5000 },
    { id: 'enterprise', name: 'Enterprise', monthlyCredits: 0, isCustom: true },
  ]).onConflictDoNothing()
}


Call this once during deploy or via a migration.

15) How it fits together

Subscribe/upgrade/downgrade

Billing page calls /api/checkout?products=… → Polar Checkout adapter redirects → on success returns to /billing/success, webhook marks subscription active, and we reset monthly credits. 
docs.polar.sh

Cancel / manage

“Manage in portal” opens /api/portal (Polar Customer Portal session) so users can cancel/switch and view invoices securely. 
docs.polar.sh

Invoices

Settings lists orders; if invoice not generated yet, “Generate” triggers Polar generate‑invoice, then “Get invoice” returns hosted/pdf URLs. 
Polar
+1

Billing profile

Settings form persists locally and patches Polar customer (by external id) so invoices/taxes use correct company/VAT/address. 
docs.polar.sh

Credits

Monthly allotment is (re)set when subscription activates/renews (webhook).

Daily refill adds a small number per day up to the monthly cap.

Extra (purchased) credits accumulate and never reset.

One‑time “Credit packs” are regular Polar orders; on order.paid we add credits. 
docs.polar.sh

16) What you still need to plug

Auth glue: Replace the x-mock-user reads with your real session/user in api/* routes.

DB bootstrap: run Drizzle migrations and call seedPlans().

Polar dashboard: create the products for Pro/Business + optional credit packs and set their product IDs into .env. (You can also encode metadata for credit packs ⇒ { "credits": 50 } so the webhook can read it.)

Enterprise: keep Enterprise as “Contact Sales” (no product id); admins can set planId='enterprise' for selected customers.

References (key bits we implemented)

TanStack Start × Polar adapter: Checkout, Portal, Webhooks APIs and usage. 
docs.polar.sh

Customer State + External ID (map your user.id to Polar customer): single object for subscriptions & benefits. 
Polar

Customer Session / Portal URL: create session by external customer id; returns customer_portal_url. 
docs.polar.sh

Update Customer by External ID: set email, billing address, tax id for invoices. 
docs.polar.sh

Orders → Generate/Get Invoice: server APIs we call for PDF/hosted invoice URLs. 
docs.polar.sh
+1

Subscriptions update/cancel: switch plans or cancel at period end. 
docs.polar.sh
+1

If you want me to tailor any of the above to the exact structure of instructa/constructa-starter (filenames, auth provider, existing DB client), say the word and I’ll inline it to match your repo precisely.