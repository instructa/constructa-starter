# Hosting on Hetzner (Docker Compose + Caddy)

## 1) Provision the server

Use the Terraform module:

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=YOUR_TOKEN
terraform init && terraform apply
```

* Debian 12
* Docker Engine + Compose plugin installed
* Non-root `deploy` user with your SSH key
* `/opt/constructa` prepared for deployment

## 2) DNS

Point `app.example.com` to the server IP.

## 3) First-time server env

SSH in and prepare `.env`:

```bash
ssh deploy@your.server.ip
cd /opt/constructa
cp .env.sample .env
# edit values (DATABASE_URL, secrets, etc.)
```

> The `.env.sample` you commit is copied by the deploy workflow. Keep real secrets only on the server in `.env`.

## 4) Deploy

From GitHub → Actions → **deploy**:

* Choose **prod** (or **dev** if you have a second environment configured)
* (Optional) enter a specific image tag

The workflow copies `infra/deploy/` to `/opt/constructa`, updates `APP_TAG` in `.env`, logs into GHCR, pulls images, and runs:

```
docker compose up -d
```

## 5) HTTPS

Caddy (in the compose stack) auto-issues Let’s Encrypt certificates using `ACME_EMAIL`. It reverse-proxies `https://app.example.com` → `app:3000`.

### Hardening tips

* Use the Hetzner Firewall (already applied) to limit SSH to your IP.
* If you front with Cloudflare later, restrict ports 80/443 to Cloudflare IPs, and consider Origin Certificates + Authenticated Origin Pull.