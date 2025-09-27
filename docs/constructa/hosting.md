# Hosting on Hetzner (Dokku)

## 1) Provision the server

Use the Terraform module:

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=YOUR_TOKEN
terraform init && terraform apply
```

* Debian 13
* Docker Engine installed
* Dokku v0.36.7 installed
* Non-root `deploy` user with your SSH key
* Firewall configured (SSH, HTTP, HTTPS)

## 2) DNS

Point `ex0.dev` to the server IP (via Cloudflare with proxy enabled).

## 3) First deployment

Add your SSH key and create the app:

```bash
# Add your SSH key for deployments
cat ~/.ssh/<your-public-key>.pub | ssh root@your.server.ip "dokku ssh-keys:add admin"

# Create the app
ssh root@your.server.ip "dokku apps:create constructa"

# Add git remote
git remote add dokku dokku@your.server.ip:constructa

# Deploy!
git push dokku main
```

## 4) Environment variables

Set production environment variables:

```bash
ssh root@your.server.ip "dokku config:set constructa DATABASE_URL=postgres://... NODE_ENV=production"
```

## 5) HTTPS

Dokku automatically handles SSL certificates via Let's Encrypt:

```bash
ssh root@your.server.ip "dokku letsencrypt:enable constructa"
```

### Hardening tips

* Use the Hetzner Firewall (already applied) to limit SSH to your IP.
* If you front with Cloudflare later, restrict ports 80/443 to Cloudflare IPs, and consider Origin Certificates + Authenticated Origin Pull.