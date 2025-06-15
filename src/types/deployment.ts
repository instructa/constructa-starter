/**
 * Valid deployment targets for the application
 */
export type DeploymentTarget = 'netlify' | 'vercel' | 'cloudflare-pages' | 'node-server' | 'bun';

/**
 * Configuration options for TanStack Start plugin
 */
export interface TanStackStartOptions {
  target?: DeploymentTarget;
}

/**
 * Validates if a string is a valid deployment target
 */
export function isValidDeploymentTarget(target: string): target is DeploymentTarget {
  const validTargets: DeploymentTarget[] = [
    'netlify',
    'vercel',
    'cloudflare-pages',
    'node-server',
    'bun',
  ];
  return validTargets.includes(target as DeploymentTarget);
}
