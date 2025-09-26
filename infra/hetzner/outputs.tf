output "server_ipv4" {
  value       = hcloud_server.app.ipv4_address
  description = "Public IPv4 address of the app server"
}

output "server_name" {
  value       = hcloud_server.app.name
  description = "Server name"
}