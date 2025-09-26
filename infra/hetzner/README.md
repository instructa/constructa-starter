# Hetzner Terraform (Docker + Compose)

## Prereqs
- Terraform `>= 1.6`
- Hetzner Cloud API Token

## Quick start

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=your-token
# optional: set your SSH key path
# export TF_VAR_ssh_public_key_path=~/.ssh/id_ed25519.pub
terraform init
terraform apply
````

This provisions a Debian 12 server, installs **Docker Engine + Compose plugin** via cloud-init, creates a non-root `${deploy_username}` user (default: `deploy`), and prepares `/opt/constructa`.

# Afterward, configure your DNS (e.g., `app.example.com` → server IP) and deploy using the GitHub Action (see docs/constructa/cicd.md).

```