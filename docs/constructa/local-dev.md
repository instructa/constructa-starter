# Local Development

## One-time

```bash
cp .env.example .env
pnpm install
pnpm run ex0 -- init   # installs deps, starts core services, runs migrations
```

This starts **PostgreSQL**, **MinIO**, **Redis**, **Meilisearch**, and **Mailhog** under the `dev` profile.

## Run the app locally

```bash
pnpm dev
```

Your app is at [http://localhost:3000](http://localhost:3000) . The background **worker** runs as a separate process if you want (optional):

```bash
pnpm worker
```

> The Docker `app` container is reserved for self-host/previews. In dev, run the Vite server locally for faster iteration.

## Real webhooks in dev

* **Ngrok**: `ngrok http 3000` — paste the forwarding URL (e.g. `https://xyz.ngrok-free.app/api/webhook/polar`) into the Polar dashboard.
* **Cloudflare Tunnel (optional)**: Put your tunnel token in `.env` as `CLOUDFLARED_TUNNEL_TOKEN`, then:

```bash
docker compose --profile tunnel up -d cloudflared
```

> Polar’s docs recommend ngrok; Cloudflare Tunnel is a robust alternative with Zero Trust. Configure whichever you prefer.

## Emails

Mailhog UI: [http://localhost:8025](http://localhost:8025) (SMTP at `mailhog:1025`).

## Search

* Meilisearch API: `MEILI_HOST=http://localhost:7700`
* Seed or rebuild the index:

```bash
pnpm run search:sync
```

## Background jobs

* Queue: Redis (`REDIS_URL=redis://localhost:6379`)
* Daily credit refill is scheduled at 03:00 UTC via BullMQ. It calls your existing `routes/api/jobs/daily-credit-refill` endpoint.
* You can run the worker locally:

```bash
pnpm worker
```

### Worker ↔ App endpoint in dev

# By default `JOB_DAILY_CREDIT_REFILL_URL=http://localhost:3000/api/jobs/daily-credit-refill`. When running the worker inside Docker, it can also reach the host via `http://host.docker.internal:3000`.

```