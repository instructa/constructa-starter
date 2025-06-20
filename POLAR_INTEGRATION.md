# Polar Integration with Better Auth

This project uses Polar for payment processing and subscription management, integrated seamlessly with Better Auth.

## Features

- ✅ Automatic customer creation on signup
- ✅ Checkout integration for subscriptions
- ✅ Customer portal for self-service management
- ✅ Webhook handling for subscription updates
- ✅ Usage-based billing support
- ✅ Plan-based feature gating

## Setup

### 1. Environment Variables

Add these to your `.env` file:

```env
# Polar Configuration
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_SERVER=sandbox  # Use "production" for live
POLAR_WEBHOOK_SECRET=your_webhook_secret
```

### 2. Create Products in Polar

1. Go to your Polar dashboard
2. Create two products:
   - **Pro Monthly** - €19/month
   - **Pro Yearly** - €190/year
3. Copy the product IDs

### 3. Update Product IDs

In `src/server/auth.server.ts`, replace the placeholder product IDs:

```typescript
checkout({
  products: [
    { productId: 'YOUR_MONTHLY_PRODUCT_ID', slug: 'pro-monthly' },
    { productId: 'YOUR_YEARLY_PRODUCT_ID', slug: 'pro-yearly' },
  ],
  // ...
})
```

### 4. Configure Webhooks

1. In Polar dashboard, go to Settings > Webhooks
2. Add webhook endpoint: `https://yourdomain.com/polar/webhooks`
3. Copy the webhook secret to your `.env` file

## Database Schema

The integration adds these fields to the user table:

- `plan` - Current plan ("free" or "pro")
- `subscriptionExp` - Subscription expiration date

Run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

## Usage

### Client-Side

#### Checkout

```typescript
import { authClient } from '~/lib/auth-client';

// Redirect to checkout
await authClient.checkout({ slug: 'pro-monthly' });
```

#### Customer Portal

```typescript
// Redirect to customer portal
await authClient.customer.portal();
```

#### Check Subscription Status

```typescript
const { data: customer } = await authClient.customer.state();
const isSubscribed = customer?.activeSubscriptions?.length > 0;
```

### Server-Side

#### Feature Gating

```typescript
import { assertPro, isPro } from '~/server/auth-helpers';

// Throw error if not pro
assertPro(user);

// Check without throwing
if (isPro(user)) {
  // Pro features
}
```

## Routes

- `/pricing` - Pricing page with checkout buttons
- `/success?checkout_id={ID}` - Post-checkout success page
- `/dashboard/account` - Account page with subscription management
- `/polar/webhooks` - Webhook endpoint (automatic)

## Testing

### Sandbox Mode

1. Use `POLAR_SERVER=sandbox` in development
2. Use Polar test card: `4242 4242 4242 4242`
3. Test webhook with: `pnpm exec @polar-sh/cli webhook send-test customer_state_changed`

### Production Checklist

- [ ] Set `POLAR_SERVER=production`
- [ ] Update product IDs to production products
- [ ] Configure production webhook URL
- [ ] Test with small real payment (€0.50)
- [ ] Monitor webhook logs

## Troubleshooting

### Customer not created on signup

- Check `POLAR_ACCESS_TOKEN` is valid
- Verify `createCustomerOnSignUp: true` in auth config

### Webhooks not updating plan

- Verify webhook secret matches
- Check webhook URL is accessible
- Look for errors in server logs

### Checkout not working

- Ensure product IDs are correct
- Check user is authenticated
- Verify Polar API access

## Support

- [Polar Documentation](https://docs.polar.sh)
- [Better Auth Polar Plugin](https://better-auth.com/docs/plugins/polar)
- [GitHub Issues](https://github.com/polarsource/polar)