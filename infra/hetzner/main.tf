locals {
  ssh_pub_key = trimspace(file(var.ssh_public_key_path))
}

resource "hcloud_ssh_key" "me" {
  name       = "constructa-key"
  public_key = local.ssh_pub_key
}

resource "hcloud_firewall" "app" {
  name = "constructa-fw"

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = [var.allowed_ssh_cidr]
  }

  # HTTP/HTTPS
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # HTTP/3 (udp/443) optional
  dynamic "rule" {
    for_each = var.enable_http3 ? [1] : []
    content {
      direction  = "in"
      protocol   = "udp"
      port       = "443"
      source_ips = ["0.0.0.0/0", "::/0"]
    }
  }
}

resource "hcloud_server" "app" {
  name         = var.server_name
  server_type  = var.server_type
  image        = "debian-13"
  location     = var.location
  ssh_keys     = [hcloud_ssh_key.me.id]
  firewall_ids = [hcloud_firewall.app.id]
  user_data    = templatefile("${path.module}/cloud-init.yaml", {
    deploy_username  = var.deploy_username
    deploy_ssh_pubkey = local.ssh_pub_key
  })
}
