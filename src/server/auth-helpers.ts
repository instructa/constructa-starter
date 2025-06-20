import type { User } from 'better-auth';

// Extend the User type to include our custom fields
export interface UserWithPlan extends User {
  plan?: string;
  subscriptionExp?: Date | string | null;
}

/**
 * Assert that the user has a Pro plan.
 * Throws an error if the user doesn't have pro access.
 */
export function assertPro(user: UserWithPlan) {
  if (user.plan !== 'pro') {
    throw new Response('Upgrade to Pro plan required', { status: 402 });
  }
}

/**
 * Check if the user has a Pro plan.
 * Returns boolean without throwing.
 */
export function isPro(user: UserWithPlan): boolean {
  return user.plan === 'pro';
}

/**
 * Check if the user's subscription is active.
 * Returns boolean based on expiration date.
 */
export function isSubscriptionActive(user: UserWithPlan): boolean {
  if (!user.subscriptionExp) return false;
  
  const expDate = new Date(user.subscriptionExp);
  return expDate > new Date();
}