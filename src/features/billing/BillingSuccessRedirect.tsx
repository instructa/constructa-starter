import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

import { isClient } from '~/lib/environment';

function readReturnHref(): string | null {
  if (!isClient) return null;
  try {
    const ts = window.sessionStorage.getItem('billing:returnTo:ts');
    const href = window.sessionStorage.getItem('billing:returnTo');
    if (!href) return null;
    if (!ts) return href;
    const ageMs = Date.now() - Number(ts);
    if (Number.isFinite(ageMs) && ageMs <= 1000 * 60 * 60) {
      return href;
    }
    return null;
  } catch {
    return null;
  }
}

function readFromQuery(): string | null {
  if (!isClient) return null;
  try {
    return new URLSearchParams(window.location.search).get('from');
  } catch {
    return null;
  }
}

function normalizeTarget(href: string | null): URL {
  if (!isClient) {
    return new URL('/dashboard', 'http://localhost');
  }
  const origin = window.location.origin;
  const candidate = href ?? '/dashboard';
  try {
    if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
      const url = new URL(candidate);
      if (url.origin === origin) {
        return url;
      }
      return new URL(url.pathname + url.search + url.hash, origin);
    }
    return new URL(candidate, origin);
  } catch {
    return new URL('/dashboard', origin);
  }
}

export function BillingSuccessRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!isClient) return;

    const storedHref = readReturnHref();
    const fromQuery = readFromQuery();
    const targetUrl = normalizeTarget(storedHref ?? fromQuery);

    const params = targetUrl.searchParams;
    params.set('settings', 'plans');
    params.set('billingStatus', 'success');

    const nextSearch = params.toString();
    const nextHash = targetUrl.hash ?? '';
    const href = `${targetUrl.pathname}${nextSearch ? `?${nextSearch}` : ''}${nextHash}`;

    try {
      window.sessionStorage.removeItem('billing:returnTo');
      window.sessionStorage.removeItem('billing:returnTo:ts');
    } catch {
      // ignore storage failures
    }

    router
      .navigate({ href, replace: true })
      .catch(() => router.navigate({ to: '/dashboard', search: { settings: 'plans', billingStatus: 'success' }, replace: true })
        .catch(() => undefined));
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">Finishing your upgrade…</p>
        <p className="text-xs text-muted-foreground">You’ll be redirected to your dashboard momentarily.</p>
      </div>
    </div>
  );
}
