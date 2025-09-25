import { createFileRoute } from '@tanstack/react-router';
import { BillingSettingsSection } from '~/components/settings/sections/BillingSettings';

export const Route = createFileRoute('/dashboard/settings/billing')({
  component: SettingsBillingRoute,
});

function SettingsBillingRoute() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Billing settings</h1>
        <p className="text-sm text-muted-foreground">
          Update invoice details, download receipts, and manage your subscription.
        </p>
      </header>

      <BillingSettingsSection variant="page" />
    </div>
  );
}
