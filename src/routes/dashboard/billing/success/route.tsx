import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/billing/success')({
  component: BillingSuccess,
});

function BillingSuccess() {
  return (
    <div className="container mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Payment successful ✅</h1>
      <p className="text-sm text-muted-foreground">
        Thanks for upgrading! We’re updating your account right now. If your credits or plan don’t change
        immediately, refresh in a few seconds.
      </p>
      <Link to="/dashboard/billing" className="text-sm font-medium text-primary underline">
        Back to billing
      </Link>
    </div>
  );
}
