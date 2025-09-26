# Hetzner + Coolify Terraform

## Prereqs
- Terraform `>= 1.6`
- Hetzner Cloud API Token

## Quick start

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=your-token
terraform init
terraform apply
````

When finished, Coolify is installed automatically via cloud-init (port **8000**). Create your admin user on first visit. See the official install docs for details.
(Ref: Coolify Quick Installation)

### Hardening

* Consider using the included `scripts/cloudflare/hcloud-allow-cloudflare.sh` later to restrict 80/443 to Cloudflare IP ranges only (mTLS origin certs recommended).