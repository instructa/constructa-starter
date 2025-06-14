import { AuthCard } from '@daveyplate/better-auth-ui';
import { redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { getSession } from '~/server/function/auth.server.func';

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute({
  validateSearch: searchSchema,
  component: RouteComponent,
  beforeLoad: async ({ params }: { params: { pathname: string } }) => {
    // Only check session for sign-in and sign-up routes
    if (params.pathname === 'sign-in' || params.pathname === 'sign-up') {
      const session = await getSession();
      if (session?.user) {
        // User is already logged in, redirect to dashboard
        throw redirect({
          to: '/dashboard',
        });
      }
    }
  },
});

function RouteComponent() {
  const { pathname } = Route.useParams();
  const { redirect } = Route.useSearch();
  const callbackURL = redirect || '/dashboard';

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 p-4">
      <AuthCard pathname={pathname} callbackURL={callbackURL} />
    </main>
  );
}
