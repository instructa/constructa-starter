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

## 1.5) Bootstrap with Ansible (recommended)

Automation lives in `infra/ansible/`. It syncs the compose bundle, renders `/opt/constructa/.env`, boots the services, and configures Dokku to point at them.

```bash
# install Ansible galaxy collections locally
ansible-galaxy collection install -r infra/ansible/requirements.yml

# copy + edit secrets (kept local)
cp infra/ansible/group_vars/constructa/vars.example.yml infra/ansible/group_vars/constructa/vars.yml
$EDITOR infra/ansible/group_vars/constructa/vars.yml

# update inventory with your host/IP
$EDITOR infra/ansible/inventory/hosts.ini

# run after terraform apply completes
ansible-playbook -i infra/ansible/inventory/hosts.ini infra/ansible/site.yml
```

What the playbook does:

* syncs `infra/deploy/` into `/opt/constructa`
* writes `/opt/constructa/.env` from your var file
* starts Postgres/MinIO/Redis/Meilisearch + worker via compose
* runs bucket provisioning + `pnpm run db:migrate`
* ensures the Dokku app exists and points to `host.docker.internal`
* provisions a swap file (`constructa_swap_file` / `constructa_swap_size`) so Docker builds have enough memory
* installs the **dokku-redirect** plugin and adds 301 redirects for any `constructa_redirect_domains`
* installs the **dokku-letsencrypt** plugin, sets `DOKKU_LETSENCRYPT_EMAIL`, enables certificates, and schedules renewals when `constructa_letsencrypt_email` is provided
* if you are using Dokku-first, sets `HOST_BIND_ADDR=0.0.0.0` so Dokku
  containers can reach the compose services via the host gateway

---

## Dokku‑first (recommended, zero registry)

Use this if you don't want a registry at all.

**First run:**

1. Run the playbook once (core DB/object store/search come up; the compose worker stays idle until you point it at a real image).
2. **Deploy once** so Dokku builds the image locally:

   ```bash
   pnpm run ex0 -- deploy --env dev --ref <main-or-sha>
   # or --env prod
   ```

   Dokku produces `dokku/constructa:latest`.
3. Point Compose at that local image and re‑run Ansible:

   ```yml
   # in vars.yml under constructa_compose_env
   APP_IMAGE: "dokku/constructa"
   APP_TAG: "latest"
   ```

   Leave `constructa_run_compose_migrate` at its default `false`; Dokku already executes migrations during deploy. Re-run the playbook and it will (re)start the worker using the **local Dokku image**—no registry push/pull needed. The playbook will also refresh redirects and LetsEncrypt certs after the new domain config is in place.

Need to bypass Dokku’s build step entirely? Build and ship the image from your laptop in one line:

```bash
pnpm run ex0 -- deploy-image --env dev
```

This command runs `docker build`, streams the image over SSH, and executes `dokku git:from-image` under the hood (swap `--env dev` for `--env prod` as needed, and add `--tag my-tag` if you want a different tag).

---

## 2) DNS

Point your app domain (e.g. `app.example.com`) to the server's IP (a Cloudflare proxied A record is fine). If you want `www.` to 301 to the apex, list it in `constructa_redirect_domains` and rerun the playbook.

## 3) Boot core services (Compose on the server)

> These run locally on the VPS and bind to **127.0.0.1** only.

> If you ran the Ansible playbook in step 1.5, the commands below were already executed. Keep them for reference or when recovering manually.

```bash
# Copy the infra bundle; or let the GH Action do it
scp -r infra/deploy/* deploy@your.server:/opt/constructa

ssh deploy@your.server
cd /opt/constructa
cp .env.sample .env  # fill values
# For Dokku-first, set HOST_BIND_ADDR=0.0.0.0 so the Dokku app reaches services

# Start Postgres, MinIO (+provision bucket), Redis, Meilisearch
docker compose -f compose.yml up -d db minio redis meilisearch
docker compose -f compose.yml up provision-minio || true

# Start background worker (migrations run during Dokku deploy)
docker compose -f compose.yml up -d worker
```

**Why this layout?** It avoids plugin variance for Postgres/MinIO on Dokku and gives you a stable path for data persistence across server resets.

> **Important:** This project does **not** use Dokku's Postgres/Redis addons. The database, cache, object store, etc. all run inside the compose stack above. Always keep that stack running before deploying; otherwise Dokku will fall back to plugin-provisioned resources that lack required extensions like `pgvector`.

## 4) Create the Dokku app

> If you ran the Ansible playbook in step 1.5, Dokku has already been configured with the app, domains, redirect plugin, LetsEncrypt, and docker options. Use this section only for manual bootstrap or disaster recovery.

```bash
# one-time app create
ssh root@your.server "dokku apps:create constructa"

# domain, http routing, and host mapping to reach compose services
ssh root@your.server "dokku domains:set constructa app.example.com"
ssh root@your.server "dokku proxy:ports-set constructa http:80:5000"
ssh root@your.server \"dokku docker-options:add constructa deploy,run '--add-host=host.docker.internal:host-gateway'\"
```

Now set required configuration. The key detail: **point to your loopback services** (if you skip this, Dokku will try to use its addon database, which does not ship `pgvector` and your migrations will fail):

```bash
ssh root@your.server "dokku config:set constructa \
  NODE_ENV=production PORT=5000 \
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

(With Ansible, set `constructa_letsencrypt_email` in your vars file and the playbook will handle plugin install, cert issuance, and the renewal cron job.)

## 5) Deploy the app

### Option A – Simple: push from your laptop

```bash
git remote add dokku-prod dokku@your.server:constructa
pnpm run ex0 -- deploy --env prod
```

### Option B – CI/CD (GHCR): see **docs/constructa/cicd.md** for registry login & tags.

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

# Disk cleanup (on demand, safe)
pnpm run ex0 -- gc --age 720h   # prune unused images/cache older than 30 days
```

### Why `host.docker.internal`?

Dokku containers live on the **dokku** network, but your services live in the **compose** network. Mapping `host.docker.internal` to the Linux host gateway allows app containers to talk to services published on loopback (`127.0.0.1:…`). We set that with:

```bash
dokku docker-options:add constructa deploy,run "--add-host=host.docker.internal:host-gateway"
```
