output "server_ipv4" {
  value       = hcloud_server.coolify.ipv4_address
  description = "Public IPv4 address of the Coolify server"
}

output "server_name" {
  value       = hcloud_server.coolify.name
  description = "Server name"
}