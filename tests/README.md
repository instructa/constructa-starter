# Tests

## What's included

- `auth-integration.test.ts` — basic Better‑Auth HTTP integration tests
- `email-security.test.ts` — email provider security/log redaction tests
- `e2e-auth-billing.test.ts` — **new** end‑to‑end auth + billing flow with Polar webhook simulation
- `helpers/e2e-helpers.ts` — **new** shared test helper (HTTP wrapper, DB verification toggle, webhook simulators)

## Running tests

Make sure your dev server is running locally:

```bash
pnpm dev
````

Confirm the environment variables in `.env.test` or `.env` (at minimum `DATABASE_URL` and `TEST_BASE_URL`, defaults to `http://localhost:3000`).

Run the full test suite:

```bash
pnpm test
```

Run only the new E2E spec:

```bash
pnpm run test:e2e
```

### Notes on the E2E flow

* **Email verification**: The E2E test marks the user as verified **directly in the database** for determinism and to avoid email parsing.
* **Polar sandbox**: The test **does not** hit Polar's network. Instead, it **simulates** Polar webhook events by invoking `polarWebhookHandlers` directly, and **mocks** `~/server/polar` to avoid SDK calls (e.g., invoice generation).
* **Checkout URL test (optional)**: If `PLANS.pro.polarProductId` (derived from your Polar product env vars) is set, the test attempts to start checkout and asserts that a URL is returned. If not configured, it is skipped gracefully.

If you prefer real end‑to‑end payment interactions with Polar sandbox:

1. Set your `POLAR_*` env vars (access token, org, product IDs).
2. Disable the `vi.mock('~/server/polar', ...)` in the E2E test and point webhooks to your local app (e.g., via `ngrok` or the included Cloudflare tunnel profile).
3. Ensure webhook signatures are properly configured.