# CI/CD with Dokku

## Simple Git-based Deployment

With Dokku, deployment is as simple as:

```bash
git push dokku main
```

No GitHub Actions needed! Dokku handles:
- Building your Docker image
- Running migrations (via app.json)
- Zero-downtime deployment
- Automatic SSL certificates
- Health checks

## Deployment Flow

1. **Push code**:
   ```bash
   git push dokku main
   ```

2. **Dokku automatically**:
   - Detects Dockerfile
   - Builds the image
   - Runs pre-deploy scripts from `app.json`
   - Performs health checks
   - Swaps containers with zero downtime

## Environment Variables

Set them on the server:

```bash
ssh root@your.server.ip "dokku config:set constructa KEY=value"
```

## Useful Commands

```bash
# View logs
ssh root@your.server.ip "dokku logs constructa"

# Scale workers
ssh root@your.server.ip "dokku ps:scale constructa worker=1"

# Run one-off commands
ssh root@your.server.ip "dokku run constructa pnpm db:migrate"

# Rollback
ssh root@your.server.ip "dokku ps:rebuild constructa"
```

```