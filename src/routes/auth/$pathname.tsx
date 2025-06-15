import { redirect, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { SignInForm } from '~/components/auth/sign-in-form';
import { SignUpForm } from '~/components/auth/sign-up-form';
import { ForgotPasswordForm } from '~/components/auth/forgot-password-form';
import { ResetPasswordForm } from '~/components/auth/reset-password-form';
import { getSession } from '~/server/function/auth.server.func';
import {
  authContainerClassName,
  authHeaderClassName,
  authTitleClassName,
  authDescriptionClassName,
  authCardLocalization,
} from '~/components/auth/auth-styles';
import { authClient } from '~/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const searchSchema = z.object({
  redirect: z.string().optional(),
  token: z.string().optional(),
  message: z.string().optional(),
});

export const Route = createFileRoute('/auth/$pathname')({
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
  const { redirect, token, message } = Route.useSearch();
  const redirectTo = redirect || '/dashboard';
  const router = useRouter();

  // Handle sign-out
  useEffect(() => {
    if (pathname === 'sign-out') {
      const handleSignOut = async () => {
        try {
          await authClient.signOut();
          // Redirect to sign-in page after logout
          router.navigate({
            to: '/auth/sign-in',
          });
        } catch (error) {
          console.error('Failed to sign out:', error);
          // Still redirect even if there's an error
          router.navigate({
            to: '/auth/sign-in',
          });
        }
      };

      handleSignOut();
    }
  }, [pathname, router]);

  const renderAuthForm = () => {
    switch (pathname) {
      case 'sign-in':
        return (
          <div className={authContainerClassName}>
            <div className="px-8 pt-8">
              <div className={authHeaderClassName}>
                <h1 className={authTitleClassName}>{authCardLocalization.SIGN_IN}</h1>
                <p className={authDescriptionClassName}>
                  {message === 'password-reset-sent'
                    ? 'Check your email for the password reset link.'
                    : authCardLocalization.SIGN_IN_DESCRIPTION}
                </p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <SignInForm redirectTo={redirectTo} localization={authCardLocalization} />
            </div>
          </div>
        );

      case 'sign-up':
        return (
          <div className={authContainerClassName}>
            <div className="px-8 pt-8">
              <div className={authHeaderClassName}>
                <h1 className={authTitleClassName}>{authCardLocalization.SIGN_UP}</h1>
                <p className={authDescriptionClassName}>
                  {authCardLocalization.SIGN_UP_DESCRIPTION}
                </p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <SignUpForm redirectTo={redirectTo} localization={authCardLocalization} />
            </div>
          </div>
        );

      case 'forgot-password':
        return (
          <div className={authContainerClassName}>
            <div className="px-8 pt-8">
              <div className={authHeaderClassName}>
                <h1 className={authTitleClassName}>{authCardLocalization.FORGOT_PASSWORD_TITLE}</h1>
                <p className={authDescriptionClassName}>
                  {authCardLocalization.FORGOT_PASSWORD_DESCRIPTION}
                </p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <ForgotPasswordForm localization={authCardLocalization} />
            </div>
          </div>
        );

      case 'reset-password':
        return (
          <div className={authContainerClassName}>
            <div className="px-8 pt-8">
              <div className={authHeaderClassName}>
                <h1 className={authTitleClassName}>{authCardLocalization.RESET_PASSWORD_TITLE}</h1>
                <p className={authDescriptionClassName}>
                  {authCardLocalization.RESET_PASSWORD_DESCRIPTION}
                </p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <ResetPasswordForm localization={authCardLocalization} />
            </div>
          </div>
        );

      case 'sign-out':
        return (
          <div className={authContainerClassName}>
            <div className="p-8">
              <div className={authHeaderClassName}>
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className={authDescriptionClassName}>Signing you out...</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={authContainerClassName}>
            <div className="p-8">
              <div className={authHeaderClassName}>
                <h1 className={authTitleClassName}>Page not found</h1>
                <p className={authDescriptionClassName}>
                  The authentication page you're looking for doesn't exist.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 p-4 bg-background">
      {renderAuthForm()}
    </main>
  );
}
