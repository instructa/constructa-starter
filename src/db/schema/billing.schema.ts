import { boolean, integer, jsonb, pgTable, text } from 'drizzle-orm/pg-core';
import { generateId } from '~/utils/id-generator';
import { user } from './auth.schema';
import { createdAt, timestamptz, updatedAt } from './_shared';

export const plans = pgTable('plans', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  monthlyCredits: integer('monthly_credits').notNull().default(0),
  polarProductId: text('polar_product_id'),
  unitAmountCents: integer('unit_amount_cents').default(0),
  isCustom: boolean('is_custom').notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const subscriptions = pgTable('subscriptions', {
  id: text('id')
    .$defaultFn(() => generateId('sub'))
    .primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  planId: text('plan_id')
    .notNull()
    .references(() => plans.id),
  status: text('status').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  currentPeriodStart: timestamptz('current_period_start').notNull(),
  currentPeriodEnd: timestamptz('current_period_end').notNull(),
  polarSubscriptionId: text('polar_subscription_id').unique(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const billingInfo = pgTable('billing_info', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  billingEmail: text('billing_email'),
  company: text('company'),
  line1: text('line1'),
  line2: text('line2'),
  city: text('city'),
  state: text('state'),
  postalCode: text('postal_code'),
  country: text('country'),
  vat: text('vat'),
  updatedAt: timestamptz('updated_at').notNull().defaultNow(),
});

export const creditBalances = pgTable('credit_balances', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  periodStart: timestamptz('period_start').notNull(),
  periodEnd: timestamptz('period_end').notNull(),
  monthlyAllotment: integer('monthly_allotment').notNull().default(0),
  allotmentUsed: integer('allotment_used').notNull().default(0),
  extraCredits: integer('extra_credits').notNull().default(0),
  lastDailyRefillAt: timestamptz('last_daily_refill_at'),
  updatedAt: timestamptz('updated_at').notNull().defaultNow(),
});

export const creditLedger = pgTable('credit_ledger', {
  id: text('id')
    .$defaultFn(() => generateId('credit'))
    .primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  delta: integer('delta').notNull(),
  kind: text('kind').notNull(),
  sourceId: text('source_id'),
  meta: jsonb('meta').$type<Record<string, unknown>>().default({}),
  createdAt: timestamptz('created_at').notNull().defaultNow(),
});

export const invoices = pgTable('invoices', {
  id: text('id')
    .$defaultFn(() => generateId('invoice'))
    .primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  source: text('source').notNull().default('polar'),
  externalId: text('external_id').notNull(),
  number: text('number'),
  hostedUrl: text('hosted_url'),
  pdfUrl: text('pdf_url'),
  amountCents: integer('amount_cents').notNull().default(0),
  currency: text('currency').notNull().default('USD'),
  status: text('status').notNull().default('paid'),
  createdAt: timestamptz('created_at').notNull().defaultNow(),
});
