import { eq } from 'drizzle-orm';
import { db } from '~/db/db-config';
import { user as userTable } from '~/db/schema/auth.schema';
import { PLANS } from '~/config/plans';

/** Base URL where the dev server is expected to run */
export const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

export type ApiRequestOptions = {
  method?: string;
  body?: Record<string, unknown> | null;
  headers?: Record<string, string>;
};

/** Minimal HTTP helper used by tests. Returns parsed JSON when possible. */
export async function apiRequest(path: string, options: ApiRequestOptions = {}) {
  const method = options.method || 'GET';
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    // We don't automatically include credentials; pass Cookie header explicitly via options.headers when needed
  };

  if (method !== 'GET' && method !== 'HEAD' && options.body) {
    init.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, init);
  const text = await res.text();

  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  return {
    ok: res.ok,
    status: res.status,
    data,
    text,
    headers: res.headers,
  };
}

/** Generates a unique email for tests */
export function uniqueEmail(prefix = 'e2e'): string {
  const ts = Date.now();
  const rand = Math.floor(Math.random() * 1e6);
  return `${prefix}.${ts}.${rand}@example.com`;
}

export type SignUpResult = {
  response: Awaited<ReturnType<typeof apiRequest>>;
  user: { id: string; email: string; name?: string; emailVerified?: boolean } | null;
  cookies: string | null;
};

/** Sign up a user with email & password via better-auth endpoint */
export async function signUpUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<SignUpResult> {
  const response = await apiRequest('/api/auth/sign-up/email', {
    method: 'POST',
    body: { email, password, name },
  });

  const cookies = response.headers.get('set-cookie');
  const user = response.data?.user ?? null;

  return { response, user, cookies };
}

/** Sets emailVerified=true directly in DB for the given user id */
export async function setEmailVerified(userId: string): Promise<void> {
  await db
    .update(userTable)
    .set({ emailVerified: true, updatedAt: new Date() })
    .where(eq(userTable.id, userId));
}

export type SignInResult = {
  response: Awaited<ReturnType<typeof apiRequest>>;
  cookies: string | null;
};

/** Sign in a user via better-auth endpoint */
export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<SignInResult> {
  const response = await apiRequest('/api/auth/sign-in/email', {
    method: 'POST',
    body: { email, password },
  });

  const cookies = response.headers.get('set-cookie');
  return { response, cookies };
}

/** Fetch the current session using cookies from a prior sign-in */
export async function getSession(cookies: string | null) {
  return apiRequest('/api/auth/session', {
    method: 'GET',
    headers: cookies ? { Cookie: cookies } : {},
  });
}

/** Convenience wrapper for /api/billing/info */
export async function getBillingInfo(cookies: string | null) {
  return apiRequest('/api/billing/info', {
    method: 'GET',
    headers: cookies ? { Cookie: cookies } : {},
  });
}

/** PATCH /api/settings/billing */
export async function saveBillingProfile(
  cookies: string | null,
  profile: {
    billingEmail: string;
    company?: string | null;
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    country?: string | null;
    vat?: string | null;
  },
) {
  return apiRequest('/api/settings/billing', {
    method: 'PATCH',
    headers: cookies ? { Cookie: cookies } : {},
    body: profile,
  });
}

/** Attempt to start checkout for a given productId. Shape tolerant to plugin responses. */
export async function startCheckout(cookies: string | null, productId: string) {
  return apiRequest('/api/auth/checkout', {
    method: 'POST',
    headers: cookies ? { Cookie: cookies } : {},
    body: { products: [productId] },
  });
}

/**
 * Simulate a Polar "subscription active" webhook by invoking the internal handlers directly.
 * Pass `handlers` = `polarWebhookHandlers` imported within the test (after mocking).
 */
export async function simulateProSubscription(
  handlers: any,
  {
    userId,
    email,
    now = new Date(),
  }: { userId: string; email: string; now?: Date },
) {
  const periodStart = now.toISOString();
  const periodEnd = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString();
  const payload = {
    data: {
      id: `sub_${Math.random().toString(36).slice(2, 10)}`,
      customer: { external_id: userId, email },
      // If productId is not configured in tests, name fallback is used to resolve plan
      product: {
        id: PLANS.pro.polarProductId ?? undefined,
        name: 'Pro Monthly',
      },
      product_id: PLANS.pro.polarProductId ?? undefined,
      status: 'active',
      cancel_at_period_end: false,
      current_period_start: periodStart,
      current_period_end: periodEnd,
      metadata: {},
    },
  };

  await handlers.onSubscriptionActive(payload);
}

/**
 * Simulate a Polar "order paid" webhook that credits extra usage to the user.
 * Pass `handlers` = `polarWebhookHandlers` imported within the test (after mocking).
 * The test is expected to mock ensureOrderInvoice from ~/server/polar.
 */
export async function simulateOrderPaidCredits(
  handlers: any,
  {
    userId,
    email,
    credits = 50,
    amountCents = 900,
    currency = 'USD',
  }: { userId: string; email: string; credits?: number; amountCents?: number; currency?: string },
) {
  const payload = {
    data: {
      id: `order_${Math.random().toString(36).slice(2, 10)}`,
      customer: { external_id: userId, email },
      amount: amountCents,
      currency,
      status: 'paid',
      metadata: { credits },
      // product.metadata not required for our handler path; credits come from metadata
    },
  };

  await handlers.onOrderPaid(payload);
}