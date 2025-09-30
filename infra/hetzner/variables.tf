variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "server_name" {
  description = "Name for the app server"
  type        = string
  default     = "ex0-dev-server"
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cx22"
}

variable "location" {
  description = "Hetzner location (nbg1, hel1, fsn1)"
  type        = string
  default     = "fsn1"
}

variable "ssh_public_key_path" {
  description = "Path to your SSH public key"
  type        = string
  default     = "~/.ssh/id_ed25519.pub"
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH (e.g., your IP /32)"
  type        = string

  validation {
    condition = !contains(["0.0.0.0/0", "::/0"], var.allowed_ssh_cidr) && anytrue([
      can(cidrnetmask(var.allowed_ssh_cidr)),
      can(cidrhost(var.allowed_ssh_cidr, 0))
    ])
    error_message = "Provide a specific CIDR (for example 198.51.100.23/32) instead of 0.0.0.0/0 or ::/0."
  }
}

variable "enable_http3" {
  description = "Allow UDP/443 for HTTP/3"
  type        = bool
  default     = true
}

variable "deploy_username" {
  description = "Non-root user for SSH deploy"
  type        = string
  default     = "deploy"
}
