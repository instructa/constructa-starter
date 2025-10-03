import { createFileRoute } from '@tanstack/react-router';

import { BillingSuccessRedirect } from '~/features/billing/BillingSuccessRedirect';

export const Route = createFileRoute('/billing/success')({
  component: BillingSuccessRedirect,
});
