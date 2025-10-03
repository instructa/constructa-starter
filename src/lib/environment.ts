export const isServer = typeof window === 'undefined';
export const isClient = !isServer;

export function clientOnly<T>(fn: () => T): T | undefined {
  if (!isClient) return undefined;
  return fn();
}

export function serverOnly<T>(fn: () => T): T | undefined {
  if (isClient) return undefined;
  return fn();
}

export function createIsomorphicFn<T extends (...args: any[]) => any>(
  serverImpl: T,
  clientImpl: T,
): T {
  return ((...args: Parameters<T>) => (isServer ? serverImpl : clientImpl)(...args)) as T;
}
