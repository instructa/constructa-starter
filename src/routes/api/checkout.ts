import { Checkout } from '@polar-sh/tanstack-start';
import { createFileRoute } from '@tanstack/react-router';
import { polarEnv } from '~/conf/polar';
import { requireUser } from '~/server/require-user';

export const Route = createFileRoute('/api/checkout')({
  server: {
    handlers: {
      GET: Checkout({
        accessToken: polarEnv.POLAR_ACCESS_TOKEN,
        server: polarEnv.POLAR_SERVER as 'sandbox' | 'production',
        successUrl: polarEnv.CHECKOUT_SUCCESS_URL,
        cancelUrl: polarEnv.CHECKOUT_CANCEL_URL,
        transformRequest: async (request) => {
          const user = await requireUser(request);
          const url = new URL(request.url);

          const products = url.searchParams.get('products');
          if (!products) {
            throw new Response('Missing products', { status: 400 });
          }

          url.searchParams.set('customerExternalId', user.id);
          url.searchParams.set('customerEmail', user.email);
          if (user.name) {
            url.searchParams.set('customerName', user.name);
          }

          const metadataParam = url.searchParams.get('metadata');
          if (metadataParam) {
            try {
              const parsed = JSON.parse(decodeURIComponent(metadataParam));
              url.searchParams.set('metadata', JSON.stringify(parsed));
            } catch {
              // leave metadata as-is if parsing fails
            }
          }

          return new Request(url.toString(), {
            method: request.method,
            headers: request.headers,
          });
        },
      }),
    },
  },
});
