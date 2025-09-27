import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';

import { CREDIT_PACK_PRODUCTS, PLANS } from '~/config/plans';
import { authClient } from '~/lib/auth-client';
import { getBillingInfo as getBillingInfoFn } from '~/server/function/billing-info.server';

type PolarClientResponse<T> = {
  data?: T | null;
  error?: { code?: string; message?: string } | null;
};

function unwrapPolarResponse<T>(result: unknown): PolarClientResponse<T> {
  if (!result || typeof result !== 'object') {
    return {};
  }

  const data = 'data' in result ? (result as { data?: T | null }).data : undefined;
  const error = 'error' in result ? (result as { error?: { code?: string; message?: string } | null }).error : undefined;

  return { data, error };
}

export function useBillingInfo() {
  const loadBillingInfo = useServerFn(getBillingInfoFn);

  return useQuery({
    queryKey: ['billingInfo'],
    queryFn: () => loadBillingInfo(),
    staleTime: 30_000,
  });
}

export function useStartCheckout() {
  const router = useRouter();

  return React.useCallback(async (products: string[], metadata?: Record<string, unknown>) => {
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('At least one product is required to start checkout');
    }

    try {
      const normalizedMetadata = metadata
        ? Object.fromEntries(
            Object.entries(metadata).filter(([, value]) =>
              ['string', 'number', 'boolean'].includes(typeof value)
            )
          )
        : undefined;

      const metadataPayload = normalizedMetadata && Object.keys(normalizedMetadata).length > 0
        ? (normalizedMetadata as Record<string, string | number | boolean>)
        : undefined;

      const result = await authClient.checkout({
        products,
        metadata: metadataPayload,
      });

      const { data, error } = unwrapPolarResponse<{ url: string; redirect: boolean }>(result);

      if (error || !data?.url) {
        throw new Error(error?.message ?? 'Checkout failed');
      }

      await router.navigate({
        href: data.url,
        replace: true,
      });
    } catch (error) {
      console.error('[billing] failed to start checkout', error);
      throw error;
    }
  }, [router]);
}

export function useOpenPortal() {
  const router = useRouter();

  return React.useCallback(async () => {
    try {
      const result = await authClient.customer.portal();
      const { data, error } = unwrapPolarResponse<{ url: string; redirect: boolean }>(result);

      if (error || !data?.url) {
        throw new Error(error?.message ?? 'Portal open failed');
      }

      await router.navigate({
        href: data.url,
        replace: true,
      });
    } catch (error) {
      console.error('[billing] failed to open portal', error);
      throw error;
    }
  }, [router]);
}

export function getCreditPackProduct(credits: number) {
  if (credits === 50) return CREDIT_PACK_PRODUCTS.credits50 ?? undefined;
  if (credits === 100) return CREDIT_PACK_PRODUCTS.credits100 ?? undefined;
  return undefined;
}
