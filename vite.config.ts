import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import browserEcho from '@browser-echo/vite';
import Icons from 'unplugin-icons/vite';
import viteReact from '@vitejs/plugin-react';
// uncomment this to use vercel deployment
//import { nitro } from 'nitro/vite';

export default ({ mode }: ConfigEnv) => {
  // Regression in TanStack Start RC1: loadEnv now keeps the VITE_ prefix, so we
  // manually clear the prefix until upstream restores the previous behaviour.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    server: {
      port: 3000,
    },
    ssr: {
      // Ensure Node-y Mastra stays external to avoid bundling issues
      noExternal: ['@mastra/*'],
    },
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(),
      //nitro(),
      viteReact(),
      Icons({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true,
      }),
      tailwindcss(),
      browserEcho({
        // TanStack Start specific configuration
        injectHtml: false, // TanStack Start doesn't use index.html
        stackMode: 'condensed', // Better stack traces
        colors: true,
        fileLog: {
          enabled: false, // Enable file logging to logs/frontend
        },
        networkLogs: {
          enabled: true,
          bodies: {
            request: true,
            response: true,
          },
        },
      }),
    ],
  });
};
