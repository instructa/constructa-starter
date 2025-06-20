import { createFileRoute } from '@tanstack/react-router';
import { AuthLoading, RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { SubscriptionStatus } from '~/components/account/subscription-status';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { authClient } from '~/lib/auth-client';

const { useSession } = authClient;

export const Route = createFileRoute('/dashboard/account')({
  component: AccountPage,
});

function AccountPage() {
  const { data: session } = useSession();

  return (
    <>
      {/* Show loading skeleton while checking authentication */}
      <AuthLoading>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </AuthLoading>

      {/* Redirect to sign-in if not authenticated */}
      <RedirectToSignIn />

      {/* Only show account content to authenticated users */}
      <SignedIn>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg">{session?.user?.name || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{session?.user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-lg">
                    {session?.user?.createdAt 
                      ? new Date(session.user.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <SubscriptionStatus />
          </div>
        </div>
      </SignedIn>
    </>
  );
}