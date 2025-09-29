/**
 * E2E: Auth + Billing flow
 *
 * REQUIREMENTS:
 * - Dev server running at TEST_BASE_URL (default http://localhost:3000)
 * - DATABASE_URL configured and reachable
 * - These tests do NOT hit real Polar endpoints; we simulate webhooks and mock invoice generation
 */

import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  BASE_URL,
  apiRequest,
  getBillingInfo,
  getSession,
  saveBillingProfile,
  setEmailVerified,
  signInUser,
  signUpUser,
  simulateOrderPaidCredits,
  simulateProSubscription,
  startCheckout,
  uniqueEmail,
} from './helpers/e2e-helpers';
import { PLANS } from '~/config/plans';

// --- Mock Polar server functions BEFORE importing webhook handlers ---
vi.mock('~/server/polar', () => {
  return {
    // Avoid any network to Polar during tests
    ensureOrderInvoice: vi.fn(async (orderId: string) => ({
      invoice_pdf: `https://example.com/invoices/${orderId}.pdf`,
      hosted_invoice_url: `https://example.com/invoices/${orderId}`,
    })),
    upsertPolarCustomerByExternalId: vi.fn(async () => {
      return { id: 'cust_mock' };
    }),
    // The rest of the exports aren't required by our invocation path here.
  };
});

// Import after mock so our handlers use the mocked functions
import { polarWebhookHandlers } from '~/server/polar-webhooks';

describe('E2E • Auth + Billing', () => {
  beforeAll(() => {
    // Sanity notice for the developer running tests
    // eslint-disable-next-line no-console
    console.log(`Running E2E tests against ${BASE_URL}`);
  });

  it('1) signs up a user (free, unverified)', async () => {
    const email = uniqueEmail('free');
    const password = 'StrongPassw0rd!';
    const name = 'Free User';

    const { response, user } = await signUpUser({ email, password, name });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
    expect(user?.name).toBe(name);
    // In most configs, user starts unverified
    expect(user?.emailVerified ?? false).toBe(false);
  });

  it('2) signs up a user and verifies email (free account), then can log in and fetch session', async () => {
    const email = uniqueEmail('verified');
    const password = 'StrongPassw0rd!';
    const name = 'Verified User';

    const { response, user } = await signUpUser({ email, password, name });
    expect(response.ok).toBe(true);
    expect(user?.id).toBeDefined();

    // Mark verified directly in DB for E2E determinism
    await setEmailVerified(user!.id);

    const { response: signInRes, cookies } = await signInUser({ email, password });
    expect(signInRes.ok).toBe(true);

    const sessionRes = await getSession(cookies);
    expect(sessionRes.ok).toBe(true);
    expect(sessionRes.data?.user?.email).toBe(email);
    expect(sessionRes.data?.user?.emailVerified).toBe(true);
  });

  it('3) logs in a user (basic sign-in flow)', async () => {
    const email = uniqueEmail('signin');
    const password = 'SignInPass123!';
    const name = 'Sign In User';

    const { response, user } = await signUpUser({ email, password, name });
    expect(response.ok).toBe(true);

    await setEmailVerified(user!.id);

    const { response: signInRes } = await signInUser({ email, password });
    expect(signInRes.ok).toBe(true);
  });

  it('4) signs up a user and (via Polar webhook simulation) upgrades to Pro; billing reflects Pro + monthly credits', async () => {
    const email = uniqueEmail('pro');
    const password = 'ProUserPass123!';
    const name = 'Pro User';

    const { response, user } = await signUpUser({ email, password, name });
    expect(response.ok).toBe(true);
    await setEmailVerified(user!.id);

    const { response: signInRes, cookies } = await signInUser({ email, password });
    expect(signInRes.ok).toBe(true);

    // Baseline: should be free
    const beforeBilling = await getBillingInfo(cookies);
    expect(beforeBilling.ok).toBe(true);
    expect(beforeBilling.data?.planId).toBe('free');

    // Simulate Polar subscription active webhook => Pro
    await simulateProSubscription(polarWebhookHandlers, { userId: user!.id, email });

    const afterBilling = await getBillingInfo(cookies);
    expect(afterBilling.ok).toBe(true);
    expect(afterBilling.data?.planId).toBe('pro');
    expect(afterBilling.data?.status).toBeTypeOf('string');
    // Monthly credits should reflect Pro plan config
    expect(afterBilling.data?.credits?.monthlyAllotment).toBe(PLANS.pro.monthlyCredits);

    // Simulate an order paid that grants extra credits (e.g., 50)
    await simulateOrderPaidCredits(polarWebhookHandlers, { userId: user!.id, email, credits: 50 });

    const afterCredits = await getBillingInfo(cookies);
    expect(afterCredits.ok).toBe(true);
    expect(afterCredits.data?.credits?.extraCredits).toBeGreaterThanOrEqual(50);
  });

  it('5) other smoke tests: billing settings (GET, PATCH) & daily refill job', async () => {
    const email = uniqueEmail('billing');
    const password = 'BillingPass123!';
    const name = 'Billing User';

    const { response, user } = await signUpUser({ email, password, name });
    expect(response.ok).toBe(true);
    await setEmailVerified(user!.id);

    const { response: signInRes, cookies } = await signInUser({ email, password });
    expect(signInRes.ok).toBe(true);

    // Load default billing profile
    const getProfile = await apiRequest('/api/settings/billing', {
      method: 'GET',
      headers: cookies ? { Cookie: cookies } : {},
    });
    expect(getProfile.ok).toBe(true);
    expect(getProfile.data?.profile?.billingEmail).toBe(email);

    // Update billing profile
    const patchProfile = await saveBillingProfile(cookies, {
      billingEmail: email,
      company: 'ACME Inc.',
      line1: '123 Main St',
      city: 'Metropolis',
      state: 'CA',
      postalCode: '94000',
      country: 'US',
      vat: 'US123456789',
    });
    expect(patchProfile.ok).toBe(true);

    // Verify update succeeds on subsequent GET
    const verifyProfile = await apiRequest('/api/settings/billing', {
      method: 'GET',
      headers: cookies ? { Cookie: cookies } : {},
    });
    expect(verifyProfile.ok).toBe(true);
    expect(verifyProfile.data?.profile?.company).toBe('ACME Inc.');

    // Daily credit refill job endpoint (noop for free users, refills for active subs)
    const jobRes = await apiRequest('/api/jobs/daily-credit-refill', { method: 'POST' });
    expect(jobRes.ok).toBe(true);
    expect(jobRes.text).toContain('ok');
  });

  it('Optional) Checkout start returns a URL when Polar product IDs are configured', async () => {
    // If product is not configured in env, skip gracefully
    if (!PLANS.pro.polarProductId) {
      // eslint-disable-next-line no-console
      console.log('Skipping checkout URL test: PLANS.pro.polarProductId is not set');
      return;
    }

    const email = uniqueEmail('checkout');
    const password = 'CheckoutPass123!';
    const name = 'Checkout User';

    const { response, user } = await signUpUser({ email, password, name });
    expect(response.ok).toBe(true);
    await setEmailVerified(user!.id);

    const { response: signInRes, cookies } = await signInUser({ email, password });
    expect(signInRes.ok).toBe(true);

    const checkoutRes = await startCheckout(cookies, PLANS.pro.polarProductId!);
    expect(checkoutRes.ok).toBe(true);

    // Be tolerant to response shape: { url } OR { data: { url } } OR { data: { data: { url } } }
    const directUrl = checkoutRes.data?.url;
    const nestedUrl = checkoutRes.data?.data?.url;
    const deepUrl = checkoutRes.data?.data?.data?.url;
    const anyUrl = directUrl || nestedUrl || deepUrl;

    expect(typeof anyUrl).toBe('string');
    expect(String(anyUrl)).toMatch(/^https?:\/\//);
  });
});