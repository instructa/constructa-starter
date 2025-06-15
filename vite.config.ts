import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig, loadEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import type { DeploymentTarget, TanStackStartOptions } from '~/types/deployment';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // Get deployment target from environment variable
  const deploymentTarget = env.VITE_DEPLOYMENT_TARGET as DeploymentTarget | undefined;

  // Prepare tanstackStart options
  const tanstackStartOptions: TanStackStartOptions = {};
  if (deploymentTarget) {
    tanstackStartOptions.target = deploymentTarget;
  }

  return {
    server: {
      port: 3000,
    },
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(tanstackStartOptions),
      tailwindcss(),
    ],
  };
});
