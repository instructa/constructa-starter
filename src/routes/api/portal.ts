import { CustomerPortal } from '@polar-sh/tanstack-start';
import { createFileRoute } from '@tanstack/react-router';
import { polarEnv } from '~/conf/polar';
import { upsertPolarCustomerByExternalId } from '~/server/polar';
import { requireUser } from '~/server/require-user';

const portalHandler = CustomerPortal({
  accessToken: polarEnv.POLAR_ACCESS_TOKEN,
  server: polarEnv.POLAR_SERVER as 'sandbox' | 'production',
  getCustomerId: async (request) => {
    const user = await requireUser(request);
    const customer = await upsertPolarCustomerByExternalId(user);
    return customer.id;
  },
});

export const Route = createFileRoute('/api/portal')({
  server: {
    handlers: {
      GET: async (ctx) => portalHandler(ctx),
    },
  },
});
