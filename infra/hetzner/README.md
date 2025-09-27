# Hetzner Terraform (Dokku)

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
```

This provisions a Debian 13 server with:
- **Docker Engine** (required by Dokku)
- **Dokku v0.36.7** (PaaS layer)
- Non-root `${deploy_username}` user (default: `deploy`)
- Configured firewall (SSH, HTTP, HTTPS)

## After provisioning

1. Add your SSH key: `cat ~/.ssh/id_ed25519.pub | ssh root@SERVER_IP "dokku ssh-keys:add admin"`
2. Create app: `ssh root@SERVER_IP "dokku apps:create constructa"`
3. Add git remote: `git remote add dokku dokku@SERVER_IP:constructa`
4. Deploy: `git push dokku main`

See docs/constructa/hosting.md for detailed deployment instructions.

```