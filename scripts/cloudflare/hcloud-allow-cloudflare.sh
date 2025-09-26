#!/usr/bin/env bash
set -euo pipefail

FIREWALL_NAME="${FIREWALL_NAME:-cf-only}"
YOUR_SSH_IP_CIDR="${YOUR_SSH_IP_CIDR:-1.2.3.4/32}" # change me
ALLOW_HTTP3="${ALLOW_HTTP3:-1}"                    # allow UDP/443 for HTTP/3

# Fetch Cloudflare IP ranges
CF_V4=$(curl -fsSL https://www.cloudflare.com/ips-v4)
CF_V6=$(curl -fsSL https://www.cloudflare.com/ips-v6)

# Create firewall if missing
if ! hcloud firewall describe "$FIREWALL_NAME" >/dev/null 2>&1; then
  hcloud firewall create --name "$FIREWALL_NAME" >/dev/null
fi

FW_ID=$(hcloud firewall describe "$FIREWALL_NAME" -o format='{{.ID}}')

# Build JSON rules
read -r -d '' RULES <<JSON
[
  {
    "direction": "in",
    "protocol": "tcp",
    "port": "22",
    "source_ips": ["$YOUR_SSH_IP_CIDR"]
  },
  {
    "direction": "in",
    "protocol": "tcp",
    "port": "80",
    "source_ips": [$(printf '"%s",' $CF_V4 | sed 's/,$//')] 
  },
  {
    "direction": "in",
    "protocol": "tcp",
    "port": "443",
    "source_ips": [$(printf '"%s",' $CF_V4 | sed 's/,$//')]
  },
  {
    "direction": "in",
    "protocol": "tcp",
    "port": "80",
    "source_ips": [$(printf '"%s",' $CF_V6 | sed 's/,$//')]
  },
  {
    "direction": "in",
    "protocol": "tcp",
    "port": "443",
    "source_ips": [$(printf '"%s",' $CF_V6 | sed 's/,$//')]
  }
  $( [ "$ALLOW_HTTP3" = "1" ] && cat <<'EOF'
  ,{
    "direction": "in",
    "protocol": "udp",
    "port": "443",
    "source_ips": []
  }
EOF
)
]
JSON

# Fill UDP/443 source IPs with CF ranges if enabled
if [ "$ALLOW_HTTP3" = "1" ]; then
  RULES=$(echo "$RULES" | jq --argjson v4 "[$(printf '"%s",' $CF_V4 | sed 's/,$//')]" \
                              --argjson v6 "[$(printf '"%s",' $CF_V6 | sed 's/,$//')]" \
    '(.[] | select(.protocol=="udp" and .port=="443")).source_ips = ($v4 + $v6)')
fi

# Overwrite rules (Hetzner API set_rules replaces all rules)
curl -fsSL -H "Authorization: Bearer $HCLOUD_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST "https://api.hetzner.cloud/v1/firewalls/${FW_ID}/actions/set_rules" \
  -d "{\"rules\": $RULES }" >/dev/null

echo "Applied Cloudflare-only firewall rules to firewall id=$FW_ID ($FIREWALL_NAME)"
