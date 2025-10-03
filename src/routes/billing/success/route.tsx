import { createFileRoute } from '@tanstack/react-router';

import { BillingSuccessRedirect } from '~/routes/shared/BillingSuccessRedirect';

export const Route = createFileRoute('/billing/success')({
  component: BillingSuccessRedirect,
});
