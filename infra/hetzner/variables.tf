variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "server_name" {
  description = "Name for the app server"
  type        = string
  default     = "constructa-app"
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cpx21"
}

variable "location" {
  description = "Hetzner location (nbg1, hel1, fsn1)"
  type        = string
  default     = "nbg1"
}

variable "ssh_public_key_path" {
  description = "Path to your SSH public key"
  type        = string
  default     = "~/.ssh/id_ed25519.pub"
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH (e.g., your IP /32)"
  type        = string
  default     = "0.0.0.0/0"
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