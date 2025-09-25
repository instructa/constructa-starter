import * as React from 'react';
import { polarEnv } from '~/conf/polar';

export function EnterpriseCTA() {
  const url = polarEnv.VITE_ENTERPRISE_DEMO_URL ?? (typeof window === 'undefined' ? polarEnv.PUBLIC_URL : '#');

  return (
    <a
      className="inline-flex items-center justify-center rounded border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm transition hover:bg-muted"
      href={url ?? '#'}
      target="_blank"
      rel="noreferrer"
    >
      Book a demo
    </a>
  );
}
