import { createFileRoute } from '@tanstack/react-router';
import { PricingPage } from '~/components/pricing/pricing-page';

export const Route = createFileRoute('/(marketing)/pricing')({
  component: PricingPage,
});