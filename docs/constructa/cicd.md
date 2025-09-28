# CI/CD with Dokku

There are two supported flows:

## A) Git push (fast + simple)

```bash
# once
git remote add dokku-prod dokku@your.server:constructa
git remote add dokku-dev  dokku@your.dev.server:constructa  # optional

# deploy current branch
pnpm run ex0 -- deploy --env prod
pnpm run ex0 -- deploy --env dev
```

Dokku builds your Docker image from the repo and releases it.

> See **docs/constructa/hosting.md → Dokku‑first** for a zero‑registry path that lets Compose reuse the locally built Dokku image (`dokku/constructa:latest`).

---

## B) GitHub Actions (recommended, promotes repeatability)

Two workflows are provided:

1. **`build-image`** – Builds the image from `Dockerfile` and pushes to GHCR.
2. **`deploy`** – Boots infra services on the server (compose), runs migrations, then releases the **GHCR image** to Dokku via `dokku git:from-image`.

### Required environment secrets (set under GitHub → Settings → Environments)

For each environment (**dev** and **prod**), set:

* `SSH_HOST`, `SSH_USER`, `SSH_KEY`: to run remote commands
* `APP_DIR`: e.g. `/opt/constructa` (compose bundle + .env live here)
* `GHCR_USERNAME`, `GHCR_TOKEN`: to pull private images from GHCR
* `DOKKU_APP`: e.g. `constructa`
* `APP_HOSTNAME`: e.g. `app.example.com`
* `DOKKU_HOST`: e.g. `app.example.com` (used for URL defaults)

### Deploy from the Actions tab

* Run **deploy** → choose **dev** or **prod** → (optional) override image `tag` (defaults to the triggering SHA).
* The job will:

  * Copy `infra/deploy/compose.yml` and `.env.sample`
  * Start/ensure **db, minio (+provision), redis, meilisearch**
  * Run **migrations**, start **worker**
  * **Deploy** image to Dokku
  * Enable or renew **Let's Encrypt**

---

## Troubleshooting: image pull failures

If Ansible fails on `migrate`/`worker` with "image not found":

1. **Dokku‑first (no registry)**
   Deploy once to Dokku so it builds `dokku/constructa:latest`, then set in `/opt/constructa/.env` (or Ansible vars):

   ```
   APP_IMAGE="dokku/constructa"
   APP_TAG="latest"
   ```

   Re-run Ansible.

2. **Registry pull (GHCR)**
   Configure registry login in `infra/ansible/group_vars/constructa/vars.yml`:

   ```yml
   constructa_enable_registry_login: true
   constructa_registry_server: ghcr.io
   constructa_registry_username: "YOUR_GHCR_USERNAME"
   constructa_registry_password: "YOUR_GHCR_TOKEN"
   ```

   Ensure `APP_IMAGE`/`APP_TAG` point to your GHCR path/tag.

---

## Useful Dokku commands

```bash
# View logs
ssh root@your.server "dokku logs constructa -t"

# Run a one-off
ssh root@your.server "dokku run constructa node -v"

# Rollback (to previous release)
ssh root@your.server "dokku ps:rebuild constructa"
```