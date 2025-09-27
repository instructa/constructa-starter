import { Outlet, redirect, createFileRoute, defaultStringifySearch } from '@tanstack/react-router';
import { AppSidebar } from '~/components/app-sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { getSession } from '~/server/function/auth.server.func';
import { EmailVerificationBanner } from '~/components/email-verification-banner';

export const Route = createFileRoute('/dashboard')({
  // All children (/dashboard, /dashboard/settings, etc.) inherit this guard
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      // Preserve deep link for redirect after sign-in
      const searchString = defaultStringifySearch(location.search);
      const redirectPath = `${location.pathname}${searchString}`;

      throw redirect({
        to: '/auth/$pathname',
        params: { pathname: 'sign-in' },
        search: { redirect: redirectPath },
      });
    }

    return {
      user: session.user,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {!user.emailVerified ? (
            <div className="px-4 pt-4 md:px-6">
              <EmailVerificationBanner email={user.email} />
            </div>
          ) : null}
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
