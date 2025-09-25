import * as React from 'react';

type CreditMeterProps = {
  allotment: number;
  used: number;
  extra: number;
};

export function CreditMeter({ allotment, used, extra }: CreditMeterProps) {
  const remaining = Math.max(0, allotment - used);
  const progress = allotment > 0 ? Math.min(100, (used / allotment) * 100) : 0;

  return (
    <div className="rounded border bg-card p-4 text-card-foreground">
      <div className="text-sm font-medium">Credits</div>
      <div className="mt-1 text-2xl font-semibold">
        {remaining} / {allotment}{' '}
        <span className="text-sm font-normal text-muted-foreground">(+{extra} extra)</span>
      </div>
      <div className="mt-3 h-2 w-full rounded bg-muted">
        <div
          className="h-2 rounded bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Refills daily while below monthly cap.</p>
    </div>
  );
}
