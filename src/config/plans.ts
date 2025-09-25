import { polarEnv } from '~/conf/polar';

const isServer = typeof window === 'undefined';

const proProductId =
  polarEnv.VITE_POLAR_PRODUCT_PRO_MONTHLY ??
  (isServer ? polarEnv.POLAR_PRODUCT_PRO_MONTHLY : null) ??
  null;

const businessProductId =
  polarEnv.VITE_POLAR_PRODUCT_BUSINESS_MONTHLY ??
  (isServer ? polarEnv.POLAR_PRODUCT_BUSINESS_MONTHLY : null) ??
  null;

const credit50ProductId =
  polarEnv.VITE_POLAR_PRODUCT_CREDITS_50 ??
  (isServer ? polarEnv.POLAR_PRODUCT_CREDITS_50 : null) ??
  null;

const credit100ProductId =
  polarEnv.VITE_POLAR_PRODUCT_CREDITS_100 ??
  (isServer ? polarEnv.POLAR_PRODUCT_CREDITS_100 : null) ??
  null;

export const PLANS = {
  free: { id: 'free', name: 'Free', monthlyCredits: 0, polarProductId: null as string | null },
  pro: {
    id: 'pro',
    name: 'Pro',
    monthlyCredits: 100,
    polarProductId: proProductId,
  },
  business: {
    id: 'business',
    name: 'Business',
    monthlyCredits: 150,
    polarProductId: businessProductId,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyCredits: 0,
    polarProductId: null as string | null,
    isCustom: true,
  },
} as const;

export const CREDIT_PACK_PRODUCTS = {
  credits50: credit50ProductId,
  credits100: credit100ProductId,
};

export type PlanId = keyof typeof PLANS;
