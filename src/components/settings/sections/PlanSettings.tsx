import * as React from 'react';
import { CreditMeter } from '~/components/billing/CreditMeter';
import { EnterpriseCTA } from '~/components/billing/EnterpriseCTA';
import { PlanCard } from '~/components/billing/PlanCard';
import { Button } from '~/components/ui/button';
import { PLANS } from '~/config/plans';
import { useBillingInfo, useOpenPortal, useStartCheckout } from '~/hooks/useBilling';

export function PlanSettingsSection() {
  const { data, isPending, error } = useBillingInfo();
  const startCheckout = useStartCheckout();
  const openPortal = useOpenPortal();

  if (isPending) {
    return <div className="text-sm text-muted-foreground">Loading plan details…</div>;
  }

  if (!data || error) {
    return (
      <div className="text-sm text-destructive">
        Failed to load plan information. Please refresh and try again.
      </div>
    );
  }

  const currentPlan = data.planId;

  const handleCheckout = (productId: string | null | undefined) => {
    if (!productId) {
      window.alert('Plan not configured. Set POLAR product IDs in your environment.');
      return;
    }
    startCheckout([productId]);
  };

  const handleBuyCredits = (amount: number) => {
    const productId = amount === 50 ? data.products.credits50 : amount === 100 ? data.products.credits100 : null;
    if (!productId) {
      window.alert('Credit pack not configured. Add the POLAR_PRODUCT_CREDITS_* env vars.');
      return;
    }
    startCheckout([productId], { kind: 'credit_pack', credits: amount });
  };

  return (
    <div className="space-y-6">
      <CreditMeter
        allotment={data.credits.monthlyAllotment}
        used={data.credits.allotmentUsed}
        extra={data.credits.extraCredits}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <PlanCard
          name="Pro"
          price="$25 / month"
          features={['100 monthly credits', 'Private projects', 'Roles & permissions']}
          current={currentPlan === 'pro'}
          cta={
            currentPlan === 'pro' ? (
              <Button variant="outline" className="w-full" onClick={openPortal}>
                Manage in Portal
              </Button>
            ) : (
              <Button className="w-full" onClick={() => handleCheckout(data.products.pro)}>
                {currentPlan === 'business' ? 'Downgrade to Pro' : 'Upgrade to Pro'}
              </Button>
            )
          }
        />

        <PlanCard
          name="Business"
          price="$50 / month"
          features={['150 monthly credits', 'SSO & audit logs', 'Priority support']}
          current={currentPlan === 'business'}
          cta={
            currentPlan === 'business' ? (
              <Button variant="outline" className="w-full" onClick={openPortal}>
                Manage in Portal
              </Button>
            ) : (
              <Button className="w-full" onClick={() => handleCheckout(data.products.business)}>
                {currentPlan === 'pro' ? 'Upgrade to Business' : 'Choose Business'}
              </Button>
            )
          }
        />

        <PlanCard
          name="Enterprise"
          price="Custom"
          features={['Dedicated support', 'Onboarding & SLAs', 'Custom integrations']}
          current={currentPlan === 'enterprise'}
          cta={<EnterpriseCTA />}
        />
      </section>

      <section className="rounded border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h2 className="text-base font-semibold">Need more credits?</h2>
            <p className="text-sm text-muted-foreground">
              Purchase one-time credit packs that never expire and apply instantly.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" onClick={() => handleBuyCredits(50)}>
              Buy 50
            </Button>
            <Button variant="outline" onClick={() => handleBuyCredits(100)}>
              Buy 100
            </Button>
            <Button variant="ghost" onClick={openPortal}>
              Open billing portal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
