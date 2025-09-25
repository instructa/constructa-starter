import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CREDIT_PACK_PRODUCTS, PLANS } from '~/config/plans';

type BillingInfoResponse = {
  planId: keyof typeof PLANS;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | null;
  products: {
    pro: string | null;
    business: string | null;
    credits50: string | null;
    credits100: string | null;
  };
  credits: {
    monthlyAllotment: number;
    allotmentUsed: number;
    extraCredits: number;
  };
};

async function fetchBillingInfo(): Promise<BillingInfoResponse> {
  const res = await fetch('/api/billing/info', { credentials: 'include' });
  if (!res.ok) {
    throw new Error('Failed to load billing information');
  }

  return res.json();
}

export function useBillingInfo() {
  return useQuery({ queryKey: ['billingInfo'], queryFn: fetchBillingInfo, staleTime: 30_000 });
}

export function useStartCheckout() {
  return React.useCallback((products: string[], metadata?: Record<string, unknown>) => {
    const url = new URL('/api/checkout', window.location.origin);
    url.searchParams.set('products', products.join(','));

    if (metadata) {
      url.searchParams.set('metadata', encodeURIComponent(JSON.stringify(metadata)));
    }

    window.location.assign(url.toString());
  }, []);
}

export function useOpenPortal() {
  return React.useCallback(() => {
    window.location.assign('/api/portal');
  }, []);
}

export function getCreditPackProduct(credits: number) {
  if (credits === 50) return CREDIT_PACK_PRODUCTS.credits50 ?? undefined;
  if (credits === 100) return CREDIT_PACK_PRODUCTS.credits100 ?? undefined;
  return undefined;
}
