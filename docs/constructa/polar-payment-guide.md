# Polar.sh Payment Integration Guide

This comprehensive guide covers the complete Polar.sh payment and billing system integration in Constructa Starter, including subscription management, credit systems, and webhooks.

## Overview

The Polar.sh integration provides a complete billing solution with:

- **Subscription Management**: Monthly plans with automatic billing
- **Credit System**: Monthly allotments + one-time credit purchases
- **Billing Portal**: Customer self-service for payment methods and invoices
- **Webhook Handling**: Automated subscription and payment event processing
- **Multi-tenant Support**: Organization-based billing with proper user isolation

## Architecture

### Core Components

1. **Configuration Layer** (`src/conf/polar.ts`)
   - Environment variable validation using T3 Env
   - Sandbox/production environment support
   - Product ID management for subscriptions and credits

2. **Database Schema** (`src/db/schema/billing.schema.ts`)
   - `plans`: Subscription plan definitions
   - `subscriptions`: User subscription records
   - `billing_info`: Customer billing information
   - `credit_balances`: Monthly credit tracking
   - `credit_ledger`: Detailed credit transaction history
   - `invoices`: Payment invoice records

3. **Business Logic** (`src/server/`)
   - `credits.ts`: Credit allocation and usage tracking
   - `polar.ts`: Polar API client utilities
   - `require-user.ts`: User authentication middleware

4. **API Routes**
   - `/api/webhook/polar`: Webhook event processing
   - `/api/checkout`: Payment initiation
   - `/api/portal`: Billing portal access
   - `/api/billing/info`: Billing information retrieval
   - `/api/invoices/*`: Invoice management

5. **UI Components** (`src/components/billing/`)
   - `PlanCard`: Subscription plan display
   - `CreditMeter`: Credit usage visualization
   - `InvoiceList`: Payment history
   - `EnterpriseCTA`: Enterprise contact component

6. **Settings Integration** (`src/components/settings/sections/`)
   - `PlanSettings`: Plan management and upgrades
   - `BillingSettings`: Billing information management

## Prerequisites

### Polar.sh Account Setup

1. **Create Polar Account**: Sign up at [polar.sh](https://polar.sh)
2. **Create Organization**: Set up your organization in the Polar dashboard
3. **Generate API Tokens**:
   - Access Token: For API authentication
   - Webhook Secret: For webhook verification

### Products Configuration

Create the following products in your Polar dashboard:

#### Subscription Products
- **Pro Monthly**: $25/month, 100 credits
- **Business Monthly**: $50/month, 150 credits

#### One-time Credit Products
- **50 Credits**: One-time purchase
- **100 Credits**: One-time purchase

## Setup Instructions

### 1. Environment Configuration

Add the following to your `.env` file:

```bash
# Polar Environment Settings
POLAR_SERVER="sandbox"  # Use "production" for live payments
POLAR_ACCESS_TOKEN="polar_at_..."  # From Polar dashboard
POLAR_WEBHOOK_SECRET="whsec_..."   # From Polar dashboard
POLAR_ORGANIZATION_ID="org_..."    # Your organization ID

# Product IDs (create these in Polar dashboard)
POLAR_PRODUCT_PRO_MONTHLY="prod_..."
POLAR_PRODUCT_BUSINESS_MONTHLY="prod_..."
POLAR_PRODUCT_CREDITS_50="prod_..."
POLAR_PRODUCT_CREDITS_100="prod_..."

# URLs for checkout redirects
PUBLIC_URL="http://localhost:3000"
CHECKOUT_SUCCESS_URL="http://localhost:3000/dashboard/billing/success"
CHECKOUT_CANCEL_URL="http://localhost:3000/dashboard/billing"

# Client-side product IDs
VITE_POLAR_PRODUCT_PRO_MONTHLY="prod_..."
VITE_POLAR_PRODUCT_BUSINESS_MONTHLY="prod_..."
VITE_POLAR_PRODUCT_CREDITS_50="prod_..."
VITE_POLAR_PRODUCT_CREDITS_100="prod_..."

# Optional: Enterprise demo booking
VITE_ENTERPRISE_DEMO_URL="https://calendly.com/your-team/demo"
```

### 2. Database Migration

Run the database migration to create billing tables:

```bash
pnpm db:migrate
```

### 3. Seed Plans Data

Populate the plans table with your subscription tiers:

```bash
# Run the seed script (create if it doesn't exist)
pnpm ex0 seed-plans
```

### 4. Webhook Configuration

Set up webhooks in your Polar dashboard:

1. **Webhook URL**: `https://yourdomain.com/api/webhook/polar`
2. **Events to monitor**:
   - `order.paid`
   - `subscription.active`
   - `subscription.updated`
   - `subscription.canceled`
   - `subscription.revoked`

### 5. Test the Integration

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `/dashboard/billing`
3. Test subscription upgrades and credit purchases
4. Verify webhook events are processed correctly

## Subscription Plans

### Plan Structure

```typescript
const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    monthlyCredits: 0,
    polarProductId: null
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    monthlyCredits: 100,
    polarProductId: 'prod_...' // From Polar
  },
  business: {
    id: 'business',
    name: 'Business',
    monthlyCredits: 150,
    polarProductId: 'prod_...' // From Polar
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyCredits: 0,
    polarProductId: null,
    isCustom: true
  }
}
```

### Plan Features

- **Free**: 0 credits, basic features
- **Pro**: 100 monthly credits, private projects, roles & permissions
- **Business**: 150 monthly credits, SSO, audit logs, priority support
- **Enterprise**: Custom credits, dedicated support, SLAs, custom integrations

## Credit System

### Credit Allocation

Credits are managed through a dual system:

1. **Monthly Allotments**: Reset monthly based on subscription plan
2. **Extra Credits**: Purchased one-time packs that don't expire

### Credit Tracking

```typescript
interface CreditBalance {
  userId: string;
  periodStart: Date;
  periodEnd: Date;
  monthlyAllotment: number;  // Plan-based credits
  allotmentUsed: number;     // Credits used this period
  extraCredits: number;      // Purchased credits
}
```

### Daily Credit Refill

A background job runs daily to refill monthly allotments:

```typescript
// Runs via cron job or scheduled task
/api/jobs/daily-credit-refill
```

## Billing Portal

### Customer Portal Access

Users can access their billing portal through:

1. **Dashboard**: `/dashboard/billing` → "Open billing portal"
2. **Settings**: `/dashboard/settings/billing` → Portal access
3. **API**: `/api/portal` redirects to Polar's hosted portal

### Portal Features

- Payment method management
- Billing address updates
- Invoice downloads
- Subscription management
- Payment history

## Webhook Processing

### Supported Events

The webhook handler processes these Polar events:

#### Order Events
- `order.paid`: Processes successful payments for credits

#### Subscription Events
- `subscription.active`: Activates new subscriptions
- `subscription.updated`: Handles plan changes
- `subscription.canceled`: Marks subscriptions as canceled
- `subscription.revoked`: Revokes subscription access

### Event Processing

```typescript
// Webhook handler processes events securely
onOrderPaid: async ({ data }) => {
  // Add purchased credits to user balance
  await addPurchasedCredits(userId, credits, orderId);
  // Create invoice record
  await ensureOrderInvoice(orderId);
},

onSubscriptionActive: async ({ data }) => {
  // Create/update subscription record
  // Reset monthly credit allotment
  await resetMonthlyAllotment(userId, monthlyCredits, periodStart, periodEnd);
}
```

## API Reference

### Billing Information

```typescript
GET /api/billing/info
// Returns user's current plan, credits, and available products
```

### Checkout Initiation

```typescript
POST /api/checkout
// Body: { productIds: string[], metadata?: object }
// Redirects to Polar checkout page
```

### Portal Access

```typescript
GET /api/portal
// Redirects to Polar customer portal
```

### Invoice Management

```typescript
GET /api/invoices
// Returns user's invoice history

GET /api/invoices/:orderId/generate
// Generates PDF for specific invoice
```

### Subscription Management

```typescript
POST /api/subscription/cancel
// Cancels user's active subscription
```

## Testing

### Sandbox Environment

Use Polar's sandbox environment for testing:

```bash
POLAR_SERVER="sandbox"
```

### Test Cards

Polar provides test card numbers for sandbox testing:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Require Authentication**: `4000 0025 0000 3155`

### Webhook Testing

Use tools like ngrok or localtunnel for webhook testing:

```bash
# Expose local webhook endpoint
ngrok http 3000
# Update webhook URL in Polar dashboard
```

## Production Deployment

### Environment Setup

Switch to production environment:

```bash
POLAR_SERVER="production"
# Use production API tokens and product IDs
```

### Webhook Security

1. **Verify webhook signatures** using the webhook secret
2. **Use HTTPS** for webhook endpoints
3. **Validate event data** before processing

### Monitoring

Monitor key metrics:

- Successful payment conversion rates
- Failed webhook deliveries
- Credit usage patterns
- Subscription churn rates

## Troubleshooting

### Common Issues

#### "Product not configured"
- Check that `POLAR_PRODUCT_*` environment variables are set
- Verify product IDs exist in Polar dashboard

#### Webhook events not processing
- Verify webhook secret is correct
- Check webhook URL is accessible
- Review server logs for webhook processing errors

#### Credit balances not updating
- Check database connectivity
- Verify user authentication
- Review credit ledger for transaction records

#### Checkout redirects failing
- Verify `CHECKOUT_SUCCESS_URL` and `CHECKOUT_CANCEL_URL`
- Check for URL encoding issues
- Ensure HTTPS in production

### Debug Mode

Enable detailed logging:

```bash
DEBUG=polar:*  # Enable Polar SDK logging
```

## Security Considerations

### API Key Management
- Never commit API keys to version control
- Rotate keys regularly
- Use environment-specific keys

### Webhook Verification
- Always verify webhook signatures
- Implement idempotency for webhook events
- Handle duplicate events gracefully

### Data Privacy
- Store minimal billing information
- Encrypt sensitive payment data
- Comply with PCI DSS requirements

## Advanced Features

### Custom Plan Logic

Extend the plan system:

```typescript
// Add custom plan validation
function validatePlanUpgrade(currentPlan: PlanId, targetPlan: PlanId) {
  // Implement business logic for plan changes
}
```

### Credit Usage Tracking

Implement detailed credit tracking:

```typescript
// Track credit usage by feature
async function deductCredits(userId: string, amount: number, feature: string) {
  // Update credit balances
  // Log usage in credit ledger
}
```

### Enterprise Integration

Add enterprise features:

```typescript
// Custom enterprise billing logic
function handleEnterpriseBilling(userId: string) {
  // Implement custom pricing
  // Handle volume discounts
}
```

## Resources

- [Polar.sh Documentation](https://docs.polar.sh)
- [Polar.sh API Reference](https://api.polar.sh/docs)
- [Webhook Event Types](https://docs.polar.sh/webhooks)
- [Test Cards](https://docs.polar.sh/testing)

## Contributing

When extending the billing system:

1. Follow existing patterns in `src/server/` and `src/components/billing/`
2. Add proper TypeScript types
3. Include comprehensive error handling
4. Update database schema migrations
5. Test with both sandbox and production environments
6. Document new features in this guide
