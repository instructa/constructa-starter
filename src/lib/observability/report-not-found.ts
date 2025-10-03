interface NotFoundMetadata {
  readonly pathname: string;
  readonly search?: string | null;
  readonly href?: string;
}

export async function reportRouteNotFound(meta: NotFoundMetadata) {
  try {
    const payload = {
      pathname: meta.pathname,
      search: meta.search ?? null,
      href: meta.href ?? null,
    };

    if (typeof window === 'undefined') {
      const { Sentry } = await import('./sentry.server');
      if (Sentry?.captureMessage) {
        Sentry.captureMessage('Router 404', (scope) => {
          scope.setLevel('warning');
          scope.setTag('http.status', '404');
          scope.setContext('route', payload as Record<string, unknown>);
          return scope;
        });
      }
      return;
    }

    const { Sentry } = await import('./sentry.client');
    if (Sentry?.captureMessage) {
      Sentry.captureMessage('Router 404', (scope) => {
        scope.setLevel('warning');
        scope.setTag('http.status', '404');
        scope.setContext('route', payload as Record<string, unknown>);
        return scope;
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[sentry] failed to report 404', error);
    }
  }
}
