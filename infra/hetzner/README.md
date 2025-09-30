# Hetzner Terraform (Compose-first)

## Prereqs
- Terraform `>= 1.6`
- Hetzner Cloud API Token

## Quick start

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=your-token
# optional: set your SSH key path
# export TF_VAR_ssh_public_key_path=~/.ssh/id_ed25519.pub
# required: restrict SSH to your IP/CIDR
export TF_VAR_allowed_ssh_cidr="203.0.113.42/32"

terraform init
terraform apply
```

This provisions a Debian 13 server with:

* **Docker Engine** (incl. buildx + compose plugin)
* Non-root `${deploy_username}` user (limited sudo; not in `docker` group)
* UFW hardened (SSH from your CIDR only; **80/443** open)
* Fail2ban enabled with an sshd jail

## After provisioning

1. Put your production secrets in **Vault-encrypted** `infra/ansible/group_vars/constructa/vars.yml` (see `vars.example.yml`).
2. Run Ansible to sync `infra/deploy/*`, render `.env` from Vault, and boot the stack:

```bash
cd infra/ansible
ansible-galaxy install -r requirements.yml
ansible-playbook -i inventory/hosts.ini site.yml
```

Your app will be served by **Caddy** on ports **80/443** and reverse‑proxied to the internal `app:3000`.
All data services (Postgres/Redis/Meilisearch/MinIO) are **not** publicly exposed.
MinIO remains bound to `127.0.0.1:9000/9001` on the host to support SSH tunnels during operations.

For deployment updates, build & push your image, then instruct the server to `docker compose pull && up -d`.
Use the project CLI (`pnpm run ex0`) for `release`, `deploy`, `deploy-branch`, `logs`, `restart`, and SSH tunnels.

```