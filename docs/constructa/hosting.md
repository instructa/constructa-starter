# Hosting: Hetzner + Coolify

## Provision the server

Use the Terraform module:

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=your_hcloud_token
terraform init
terraform apply
```

* The server is Debian 12 by default and **auto-installs Coolify** using the official quick installer via cloud-init.
* Access the dashboard at `http://YOUR_SERVER_IP:8000` and create the admin account immediately.

## Add your server to Coolify

From the Coolify UI, add the new server and validate. The built-in Traefik proxy will be set up automatically.

## Create resources

* **PostgreSQL**, **Redis**, **MinIO**, **Meilisearch** can be created as Coolify managed services if you prefer; or use your Hetzner DB services.
* Create an **Application → Docker Image** for:

  * `app` (web) using `ghcr.io/<owner>/<repo>/app`
  * `worker` (background jobs) using the same image but command: `node --import tsx/loader src/worker/index.ts`

Set environment variables in Coolify matching your `.env`. Use **Environment-level** shared variables for dev/prod separation.

## Domains & TLS

* Point your domain (e.g. `app.example.com`) to the server.
* Coolify/Traefik can auto-issue Let’s Encrypt certs.
* For stricter setups, consider Cloudflare Origin Certs + Authenticated Origin Pull (mTLS).

## Firewall (optional hardening)

# You can restrict 80/443 to Cloudflare IPs using `scripts/cloudflare/hcloud-allow-cloudflare.sh` (requires `hcloud` CLI & `jq`), or manage in Hetzner Firewall directly.

```