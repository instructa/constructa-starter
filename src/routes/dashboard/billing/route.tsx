import { createFileRoute } from '@tanstack/react-router';
import { PlanSettingsSection } from '~/components/settings/sections/PlanSettings';

export const Route = createFileRoute('/dashboard/billing')({
  component: BillingRoute,
});

function BillingRoute() {
  return (
    <div className="container mx-auto max-w-5xl space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Plans & subscription</h1>
        <p className="text-sm text-muted-foreground">
          Compare plans, change your subscription, and manage credits.
        </p>
      </header>
      <PlanSettingsSection />
    </div>
  );
}
