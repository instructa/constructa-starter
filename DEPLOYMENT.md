# Deployment Guide

This project supports multiple deployment targets through environment variables. You can configure your deployment target by setting the `VITE_DEPLOYMENT_TARGET` environment variable.

## Configuration

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Set the `VITE_DEPLOYMENT_TARGET` variable to one of the following values:
   - `netlify` - Deploy to Netlify
   - `vercel` - Deploy to Vercel
   - `cloudflare-pages` - Deploy to Cloudflare Pages
   - `node-server` - Deploy to a Node.js server
   - `bun` - Deploy to a Bun server
   - Leave empty for default (no specific target)

## Deployment Instructions

### Netlify

1. Set in your `.env` file:

   ```
   VITE_DEPLOYMENT_TARGET=netlify
   ```

2. Deploy using Netlify's one-click deployment or CLI:
   ```bash
   pnpm build
   # Deploy with Netlify CLI
   netlify deploy --prod
   ```

### Vercel

1. Set in your `.env` file:

   ```
   VITE_DEPLOYMENT_TARGET=vercel
   ```

2. Deploy using Vercel's CLI:
   ```bash
   pnpm build
   vercel --prod
   ```

### Cloudflare Pages

1. Install the required dependency:

   ```bash
   pnpm add unenv@latest
   ```

2. Set in your `.env` file:

   ```
   VITE_DEPLOYMENT_TARGET=cloudflare-pages
   ```

3. Create an `app.config.ts` file in your project root:

   ```typescript
   import { defineConfig } from '@tanstack/react-start/config';
   import { cloudflare } from 'unenv';

   export default defineConfig({
     server: {
       preset: 'cloudflare-pages',
       unenv: cloudflare,
     },
   });
   ```

4. Create a `wrangler.toml` file:

   ```toml
   name = "your-cloudflare-project-name"
   pages_build_output_dir = "./dist"
   compatibility_flags = ["nodejs_compat"]
   compatibility_date = "2024-11-13"
   ```

5. Build and deploy:
   ```bash
   pnpm build
   wrangler pages deploy dist
   ```

### Node.js Server

1. Set in your `.env` file:

   ```
   VITE_DEPLOYMENT_TARGET=node-server
   ```

2. Create an `app.config.ts` file in your project root:

   ```typescript
   import { defineConfig } from '@tanstack/react-start/config';

   export default defineConfig({
     server: {
       preset: 'node-server',
     },
   });
   ```

3. Build and run:
   ```bash
   pnpm build
   node .output/server/index.mjs
   ```

### Bun Server

**Note:** Bun deployment requires React 19 or higher.

1. Ensure you're using React 19:

   ```bash
   pnpm add react@rc react-dom@rc
   ```

2. Set in your `.env` file:

   ```
   VITE_DEPLOYMENT_TARGET=bun
   ```

3. Create an `app.config.ts` file in your project root:

   ```typescript
   import { defineConfig } from '@tanstack/react-start/config';

   export default defineConfig({
     server: {
       preset: 'bun',
     },
   });
   ```

4. Build and run:
   ```bash
   bun run build
   bun run .output/server/index.mjs
   ```

## Environment Variables in Production

Make sure to set all necessary environment variables in your deployment platform:

- Database URL
- Authentication secrets
- API keys
- And any other variables from `.env.example`

Each deployment platform has its own way of setting environment variables:

- **Netlify**: Use the Netlify UI or `netlify.toml`
- **Vercel**: Use the Vercel dashboard or `vercel.json`
- **Cloudflare Pages**: Use the Cloudflare dashboard
- **Node.js/Bun**: Use a `.env` file or system environment variables
