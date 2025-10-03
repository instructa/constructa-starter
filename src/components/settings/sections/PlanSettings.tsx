import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

import { CreditMeter } from '~/components/billing/CreditMeter';
import { EnterpriseCTA } from '~/components/billing/EnterpriseCTA';
import { PlanCard } from '~/components/billing/PlanCard';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { useBillingInfo, useOpenPortal, useStartCheckout } from '~/hooks/useBilling';
import { isClient } from '~/lib/environment';

export function PlanSettingsSection() {
  const { data, isPending, error } = useBillingInfo();
  const startCheckout = useStartCheckout();
  const openPortal = useOpenPortal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const location = useRouterState({ select: (state) => state.location });
  const search = (location.search as Record<string, unknown>) ?? {};
  const billingStatus = typeof search.billingStatus === 'string' ? (search.billingStatus as string) : null;
  const showSuccess = billingStatus === 'success';

  const [alertVisible, setAlertVisible] = React.useState(showSuccess);
  const [confettiActive, setConfettiActive] = React.useState(false);

  const clearBillingStatusParam = React.useCallback(() => {
    if (!isClient) return;
    const params = new URLSearchParams(window.location.search);
    params.delete('billingStatus');
    const query = params.toString();
    const href = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash ?? ''}`;
    void router.navigate({ href, replace: true });
  }, [router]);

  const dismissSuccessAlert = React.useCallback(() => {
    setAlertVisible(false);
    clearBillingStatusParam();
  }, [clearBillingStatusParam]);

  React.useEffect(() => {
    if (!showSuccess) return;
    setAlertVisible(true);
    void queryClient.invalidateQueries({ queryKey: ['billingInfo'] });
    if (!isClient) return;
    setConfettiActive(true);
    const timeout = window.setTimeout(() => setConfettiActive(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [showSuccess, queryClient]);

  React.useEffect(() => {
    if (!showSuccess || !alertVisible) return;
    if (!isClient) return;
    const timeout = window.setTimeout(() => {
      dismissSuccessAlert();
    }, 6000);
    return () => window.clearTimeout(timeout);
  }, [showSuccess, alertVisible, dismissSuccessAlert]);

  React.useEffect(() => {
    if (!showSuccess) {
      setAlertVisible(false);
    }
  }, [showSuccess]);

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
    void startCheckout([productId]).catch(() => {
      window.alert('Unable to start checkout. Please try again.');
    });
  };

  const handleBuyCredits = (amount: number) => {
    const productId = amount === 50 ? data.products.credits50 : amount === 100 ? data.products.credits100 : null;
    if (!productId) {
      window.alert('Credit pack not configured. Add the POLAR_PRODUCT_CREDITS_* env vars.');
      return;
    }
    void startCheckout([productId], { kind: 'credit_pack', credits: amount }).catch(() => {
      window.alert('Unable to start checkout. Please try again.');
    });
  };

  return (
    <div className="space-y-6">
      {alertVisible && (
        <SuccessCelebration confettiActive={confettiActive} onDismiss={dismissSuccessAlert} />
      )}

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

const CONFETTI_COLORS = ['#34d399', '#22d3ee', '#6366f1', '#f97316', '#facc15'];

function SuccessCelebration({
  confettiActive,
  onDismiss,
}: {
  readonly confettiActive: boolean;
  readonly onDismiss: () => void;
}) {
  return (
    <div className="relative overflow-hidden">
      <Alert variant="success" className="pr-12">
        <CheckCircle2 className="text-emerald-600 dark:text-emerald-200" />
        <AlertTitle>Subscription updated</AlertTitle>
        <AlertDescription>
          Your plan has been refreshed. Give it a moment if credits take a few seconds to sync.
        </AlertDescription>
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-full p-1 text-emerald-900/60 transition hover:text-emerald-900 dark:text-emerald-50/60 dark:hover:text-emerald-50"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss success message</span>
        </button>
      </Alert>
      <ConfettiBurst active={confettiActive} />
    </div>
  );
}

function ConfettiBurst({ active }: { readonly active: boolean }) {
  const pieces = React.useMemo(
    () =>
      Array.from({ length: 28 }).map((_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 260,
        y: Math.random() * 180 + 40,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.3,
        duration: 1.1 + Math.random() * 0.6,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      })),
    []
  );

  if (!active || !isClient) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute h-2 w-1 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: '50%',
            top: '0%',
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.75 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: piece.x,
            y: piece.y,
            rotate: piece.rotate,
            scale: 1,
          }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
