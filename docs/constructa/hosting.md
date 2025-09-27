# Hosting on Hetzner with Dokku

This guide gets you a **clean, reproducible** deployment:

- **Terraform** provisions a Debian 13 VPS with Docker & Dokku
- **Compose (server-only)** runs **Postgres, MinIO, Redis, Meilisearch, Worker**
- **Dokku** runs the **web app**; it reaches the services via `host.docker.internal`
- **Let's Encrypt** handled by Dokku

---

## 1) Provision the server

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=YOUR_HETZNER_TOKEN
terraform init && terraform apply
````

This installs:

* Docker Engine
* Dokku v0.36.7
* Non-root `deploy` user with your SSH key
* UFW firewall (SSH/HTTP/HTTPS)

## 2) DNS

Point your app domain (e.g. `app.example.com`) to the server's IP (a Cloudflare proxied A record is fine).

## 3) Boot core services (Compose on the server)

> These run locally on the VPS and bind to **127.0.0.1** only.

```bash
# Copy the infra bundle; or let the GH Action do it
scp -r infra/deploy/* deploy@your.server:/opt/constructa

ssh deploy@your.server
cd /opt/constructa
cp .env.sample .env  # fill values

# Start Postgres, MinIO (+provision bucket), Redis, Meilisearch
docker compose -f compose.yml up -d db minio redis meilisearch
docker compose -f compose.yml up provision-minio || true

# Run DB migrations and start background worker
docker compose -f compose.yml run --rm migrate
docker compose -f compose.yml up -d worker
```

**Why this layout?** It avoids plugin variance for Postgres/MinIO on Dokku and gives you a stable path for data persistence across server resets.

## 4) Create the Dokku app

```bash
# one-time app create
ssh root@your.server "dokku apps:create constructa"

# domain, http routing, and host mapping to reach compose services
ssh root@your.server "dokku domains:set constructa app.example.com"
ssh root@your.server "dokku proxy:ports-set constructa http:80:3000"
ssh root@your.server \"dokku docker-options:add constructa deploy,run '--add-host=host.docker.internal:host-gateway'\"
```

Now set required configuration. The key detail: **point to your loopback services**:

```bash
ssh root@your.server "dokku config:set constructa \
  NODE_ENV=production PORT=3000 \
  DATABASE_URL='postgresql://user:password@host.docker.internal:5432/ex0' \
  S3_ENDPOINT='http://host.docker.internal:9000' S3_REGION='us-east-1' \
  S3_ACCESS_KEY_ID='minioadmin' S3_SECRET_ACCESS_KEY='minioadmin' \
  S3_BUCKET='constructa-files' S3_ENABLE_PATH_STYLE=1 S3_PREVIEW_URL_EXPIRE_IN=7200 \
  MEILI_HOST='http://host.docker.internal:7700' MEILI_API_KEY='changeme-master-key' \
  REDIS_URL='redis://host.docker.internal:6379'"
```

Enable HTTPS:

```bash
ssh root@your.server "dokku letsencrypt:enable constructa"
```

## 5) Deploy the app

### Option A – Simple: push from your laptop

```bash
git remote add dokku-prod dokku@your.server:constructa
pnpm run ex0 -- deploy --env prod
```

### Option B – CI/CD (recommended)

Use the provided **`deploy`** GitHub workflow. It:

* Copies `infra/deploy/compose.yml` & `.env` to the server
* Boots core services, runs migrations, starts worker
* Deploys the **web app image** to Dokku (`dokku git:from-image`)
* Enables Let's Encrypt

Trigger it from GitHub → Actions → **deploy**, pick **dev** or **prod**.

> Make sure environment secrets exist (see `docs/constructa/cicd.md`).

---

## Common Ops

```bash
# Logs
ssh root@your.server "dokku logs constructa -t"

# Scale (web only, worker is managed by compose)
ssh root@your.server "dokku ps:scale constructa web=1"

# Rebuild
ssh root@your.server "dokku ps:rebuild constructa"

# Rotate certificates
ssh root@your.server "dokku letsencrypt:force-renew constructa"
```

### Why `host.docker.internal`?

Dokku containers live on the **dokku** network, but your services live in the **compose** network. Mapping `host.docker.internal` to the Linux host gateway allows app containers to talk to services published on loopback (`127.0.0.1:…`). We set that with:

```bash
dokku docker-options:add constructa deploy,run "--add-host=host.docker.internal:host-gateway"
```