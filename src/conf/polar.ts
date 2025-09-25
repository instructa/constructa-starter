import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

type RuntimeEnv = Record<string, string | undefined>;

const processEnv: RuntimeEnv =
  typeof process !== 'undefined' && process.env ? (process.env as RuntimeEnv) : {};

const metaEnv: RuntimeEnv =
  typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: RuntimeEnv }).env
    ? ((import.meta as unknown as { env: RuntimeEnv }).env ?? {})
    : {};

export const polarEnv = createEnv({
  server: {
    POLAR_SERVER: z.enum(['sandbox', 'production']).default('sandbox'),
    POLAR_ACCESS_TOKEN: z.string().min(1),
    POLAR_WEBHOOK_SECRET: z.string().min(1),
    POLAR_ORGANIZATION_ID: z.string().min(1),
    POLAR_PRODUCT_PRO_MONTHLY: z.string().min(1),
    POLAR_PRODUCT_BUSINESS_MONTHLY: z.string().min(1),
    POLAR_PRODUCT_CREDITS_50: z.string().optional(),
    POLAR_PRODUCT_CREDITS_100: z.string().optional(),
    PUBLIC_URL: z.string().url(),
    CHECKOUT_SUCCESS_URL: z.string().url(),
    CHECKOUT_CANCEL_URL: z.string().url(),
  },
  clientPrefix: 'VITE_',
  client: {
    ENTERPRISE_DEMO_URL: z.string().url().optional(),
    POLAR_PRODUCT_CREDITS_50: z.string().optional(),
    POLAR_PRODUCT_CREDITS_100: z.string().optional(),
    POLAR_PRODUCT_PRO_MONTHLY: z.string().optional(),
    POLAR_PRODUCT_BUSINESS_MONTHLY: z.string().optional(),
  },
  runtimeEnv: {
    POLAR_SERVER: metaEnv.POLAR_SERVER ?? processEnv.POLAR_SERVER,
    POLAR_ACCESS_TOKEN: processEnv.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: processEnv.POLAR_WEBHOOK_SECRET,
    POLAR_ORGANIZATION_ID: processEnv.POLAR_ORGANIZATION_ID,
    POLAR_PRODUCT_PRO_MONTHLY:
      processEnv.POLAR_PRODUCT_PRO_MONTHLY ?? metaEnv.POLAR_PRODUCT_PRO_MONTHLY,
    POLAR_PRODUCT_BUSINESS_MONTHLY:
      processEnv.POLAR_PRODUCT_BUSINESS_MONTHLY ?? metaEnv.POLAR_PRODUCT_BUSINESS_MONTHLY,
    POLAR_PRODUCT_CREDITS_50:
      processEnv.POLAR_PRODUCT_CREDITS_50 ?? metaEnv.POLAR_PRODUCT_CREDITS_50,
    POLAR_PRODUCT_CREDITS_100:
      processEnv.POLAR_PRODUCT_CREDITS_100 ?? metaEnv.POLAR_PRODUCT_CREDITS_100,
    PUBLIC_URL: processEnv.PUBLIC_URL ?? metaEnv.PUBLIC_URL,
    CHECKOUT_SUCCESS_URL:
      processEnv.CHECKOUT_SUCCESS_URL ?? metaEnv.CHECKOUT_SUCCESS_URL,
    CHECKOUT_CANCEL_URL:
      processEnv.CHECKOUT_CANCEL_URL ?? metaEnv.CHECKOUT_CANCEL_URL,
    VITE_ENTERPRISE_DEMO_URL:
      metaEnv.VITE_ENTERPRISE_DEMO_URL ?? processEnv.VITE_ENTERPRISE_DEMO_URL,
    VITE_POLAR_PRODUCT_CREDITS_50:
      metaEnv.VITE_POLAR_PRODUCT_CREDITS_50 ?? processEnv.VITE_POLAR_PRODUCT_CREDITS_50,
    VITE_POLAR_PRODUCT_CREDITS_100:
      metaEnv.VITE_POLAR_PRODUCT_CREDITS_100 ?? processEnv.VITE_POLAR_PRODUCT_CREDITS_100,
    VITE_POLAR_PRODUCT_PRO_MONTHLY:
      metaEnv.VITE_POLAR_PRODUCT_PRO_MONTHLY ?? processEnv.VITE_POLAR_PRODUCT_PRO_MONTHLY,
    VITE_POLAR_PRODUCT_BUSINESS_MONTHLY:
      metaEnv.VITE_POLAR_PRODUCT_BUSINESS_MONTHLY ?? processEnv.VITE_POLAR_PRODUCT_BUSINESS_MONTHLY,
  },
  emptyStringAsUndefined: true,
});
