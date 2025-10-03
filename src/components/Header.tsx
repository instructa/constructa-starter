import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui';
import { Link } from '@tanstack/react-router';
import * as Sentry from '@sentry/react';
import { useCallback } from 'react';
import { ClientOnly } from './client-only';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

function DevSentryButton() {
  const handleClick = useCallback(() => {
    const err = new Error(`Manual Sentry test (client) ${new Date().toISOString()}`);
    console.info('[sentry] dispatching manual client error for verification');
    Sentry.captureException(err);
  }, []);

  // if (!import.meta.env.DEV) return null

  return (
    <ClientOnly fallback={null}>
      <Button variant="outline" size="sm" onClick={handleClick} className="text-xs">
        Test Sentry
      </Button>
    </ClientOnly>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 px-4 py-3 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-foreground">
          ex0
        </Link>

        <nav className="flex items-center gap-6">
          <SignedIn>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          </SignedIn>
          <Link
            to="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <a
            href="https://github.com/instructa/constructa-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            GitHub
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>External link icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {/* TanStack Start - Client-only theme toggle */}
          <ClientOnly fallback={<div className="w-6" />}>
            <ModeToggle />
          </ClientOnly>

          <DevSentryButton />

          <SignedOut>
            <Link to="/auth/$pathname" params={{ pathname: 'sign-in' }}>
              <Button className="rounded-full bg-primary px-6 font-medium text-primary-foreground text-sm hover:bg-primary/90">
                Sign In <span className="ml-1">↗</span>
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button className="rounded-full bg-primary px-6 font-medium text-primary-foreground text-sm hover:bg-primary/90">
                Dashboard <span className="ml-1">↗</span>
              </Button>
            </Link>
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
