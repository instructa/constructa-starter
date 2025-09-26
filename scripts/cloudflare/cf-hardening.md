**Cloudflare Hardening for app.example.com**

1. **DNS Setup**
   - Point `app.example.com` to your Hetzner server's IP address.
   - Set Proxy to **Proxied** (orange cloud icon).

2. **SSL/TLS Settings**
   - Set SSL/TLS mode to **Full (strict)**.
   - Do **not** use Flexible mode.

3. **Certificates**
   - **Option A (Easy):**  
     Let Coolify/Traefik automatically issue Let's Encrypt certificates (using HTTP-01 or DNS-01 challenge if behind a proxy or using a wildcard).
   - **Option B (Hardened):**  
     Use a Cloudflare Origin Certificate and enable Authenticated Origin Pulls (mTLS).  
     This ensures only Cloudflare can connect to your origin server.  
     Install the origin certificate on Traefik using its dynamic configuration UI.

4. **WAF & Rate Limiting (Baseline Rules)**
   - Protect `/api/*` endpoints or the entire zone with a rate-limit rule in the `http_ratelimit` phase.

   **Example: Create a simple zone-level rate limit rule with curl (adjust thresholds as needed):**

   ```bash
   # Required environment variables: CF_API_TOKEN (with Rulesets edit permission), CF_ZONE_ID
   curl -fsSL -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/rulesets" \
     -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
     -d '{
       "name": "ex0 API basic rate limit",
       "kind": "zone",
       "phase": "http_ratelimit",
       "rules": [
         {
           "expression": "(http.host eq \"app.example.com\")",
           "description": "Global API limit",
           "action": "block",
           "ratelimit": {
             "characteristics": ["cf.colo.id", "ip.src"],
             "requests_per_period": 600,
             "period": 60,
             "mitigation_timeout": 600
           },
           "enabled": true
         }
       ]
     }'
   ```