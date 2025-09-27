import * as React from 'react';
import { useRouterState, defaultStringifySearch } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';

import { Button } from '~/components/ui/button';
import { resendVerificationEmail } from '~/server/function/resend-verification-email.server';

interface EmailVerificationBannerProps {
  readonly email: string;
}

export function EmailVerificationBanner({ email }: EmailVerificationBannerProps) {
  const location = useRouterState({ select: (state) => state.location });
  const resendFn = useServerFn(resendVerificationEmail);

  const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const searchString = React.useMemo(
    () => defaultStringifySearch(location.search),
    [location.search],
  );

  const callbackURL = React.useMemo(() => {
    const hash = location.hash ?? '';
    return `${location.pathname}${searchString}${hash}`;
  }, [location.hash, location.pathname, searchString]);

  const handleResend = React.useCallback(async () => {
    setStatus('pending');
    setError(null);

    try {
      await resendFn({ data: { callbackURL } });
      setStatus('success');
    } catch (err) {
      console.error('[auth] resend verification failed', err);
      setError(err instanceof Error ? err.message : 'Failed to send verification email');
      setStatus('error');
    }
  }, [callbackURL, resendFn]);

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold">Verify your email address</p>
          <p>
            We sent a verification link to <span className="font-medium">{email}</span>. You need to
            verify your email before you can access all features.
          </p>
          {status === 'success' ? (
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Verification email sent. Check your inbox for the latest link.
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          ) : null}
        </div>
        <div className="flex flex-none items-center gap-2">
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={status === 'pending'}
          >
            {status === 'pending' ? 'Sending…' : 'Resend verification email'}
          </Button>
        </div>
      </div>
    </div>
  );
}
