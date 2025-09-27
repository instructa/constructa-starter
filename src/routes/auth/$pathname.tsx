import * as React from 'react';
import { AuthView, authLocalization } from '@daveyplate/better-auth-ui';
import { redirect, createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getSession } from '~/server/function/auth.server.func';
import { authLocalizationOverrides, authViewClassNames } from '~/components/auth/auth-styles';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { resendVerificationEmail } from '~/server/function/resend-verification-email.server';

const searchSchema = z.object({
  redirect: z.string().optional(),
  token: z.string().optional(),
  message: z.string().optional(),
});

export const Route = createFileRoute('/auth/$pathname')({
  validateSearch: searchSchema,
  component: RouteComponent,
  beforeLoad: async ({ params }: { params: { pathname: string } }) => {
    // Only check session for sign‑in and sign‑up routes
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
  const { redirect, message } = Route.useSearch();
  const redirectTo = redirect || '/dashboard';
  const localizedCopy = {
    ...authLocalization,
    ...authLocalizationOverrides,
    ...(pathname === 'sign-in' && message === 'password-reset-sent'
      ? { SIGN_IN_DESCRIPTION: 'Check your email for the password reset link.' }
      : {}),
    ...(pathname === 'sign-in' && message === 'EMAIL_NOT_VERIFIED'
      ? {
          SIGN_IN_DESCRIPTION:
            'Your email is not verified yet. Use the form below to resend the verification email.',
        }
      : {}),
  };
  const showResendNotice = pathname === 'sign-in' && message === 'EMAIL_NOT_VERIFIED';

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 bg-background p-4">
      {showResendNotice ? (
        <ResendVerificationNotice redirectTo={redirectTo} />
      ) : null}
      <AuthView
        classNames={authViewClassNames}
        localization={localizedCopy}
        pathname={pathname}
        redirectTo={redirectTo}
      />
    </main>
  );
}

interface ResendVerificationNoticeProps {
  readonly redirectTo: string;
}

function ResendVerificationNotice({ redirectTo }: ResendVerificationNoticeProps) {
  const resendFn = useServerFn(resendVerificationEmail);
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email) {
        setError('Enter the email address you used to sign up.');
        return;
      }

      setStatus('pending');
      setError(null);

      try {
        await resendFn({ data: { email, callbackURL: redirectTo } });
        setStatus('success');
      } catch (err) {
        console.error('[auth] resend verification failed', err);
        setError(err instanceof Error ? err.message : 'Failed to send verification email');
        setStatus('error');
      }
    },
    [email, redirectTo, resendFn],
  );

  return (
    <div className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
      <p className="font-semibold">Email not verified</p>
      <p className="mt-1 text-sm">
        Resend the verification link to your email address. Once verified, sign in again to continue.
      </p>
      <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="sm:flex-1"
        />
        <Button type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? 'Sending…' : 'Resend email'}
        </Button>
      </form>
      {status === 'success' ? (
        <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
          Verification email sent. Check your inbox for the latest link.
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
      ) : null}
    </div>
  );
}
