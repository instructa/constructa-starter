import { createFileRoute } from '@tanstack/react-router';
import { auth } from '~/server/auth.server';

export const Route = createFileRoute('/api/auth/polar/webhooks')({
  server: {
    handlers: {
      POST: async ({ request }) => auth.handler(request),
    },
  },
});
