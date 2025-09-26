# CI/CD: GitHub → GHCR → SSH → Docker Compose

## Build

On push to `main`, `.github/workflows/build.yml` builds

```
ghcr.io/<owner>/<repo>/app:<sha>
```

and `:latest`.

## Deploy

Run the **deploy** workflow manually and choose the environment:

* The job copies `infra/deploy/*` to `/opt/constructa` on the server.
* It sets `APP_TAG=<sha>` in `/opt/constructa/.env`.
* It logs into GHCR and runs `docker compose pull` + `docker compose up -d`.

### Required environment secrets (in GitHub → Settings → Environments → prod)

* `SSH_HOST` — server IP or hostname
* `SSH_USER` — e.g. `deploy`
* `SSH_KEY` — private key (PEM)
* `APP_DIR` — usually `/opt/constructa`
* `GHCR_USERNAME` — your GitHub username or org
* `GHCR_TOKEN` — a token with `read:packages`

# Create a **dev** environment the same way if you maintain a separate staging server.

```