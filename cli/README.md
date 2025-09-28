# Constructa CLI

`pnpm run ex0 -- <command>` wraps a project-specific toolkit that keeps a
Constructa workspace humming. The CLI assumes `pnpm install` has been run and
executes everything from the repository root.

## Quick Start

```bash
pnpm install
pnpm run ex0 -- init
```

The `init` command installs dependencies, checks Docker, and boots the core dev
stack (Postgres, Redis, MinIO, Meilisearch, Mailhog) so the app is ready to go.

## Everyday Commands

- `pnpm run ex0 -- init` – bootstrap a fresh checkout.
- `pnpm run ex0 -- stop` – stop compose services.
- `pnpm run ex0 -- reload` – rebuild and restart compose services without
  re-initialising volumes.
- `pnpm run ex0 -- recreate` – tear down and fully rebuild all dev containers.
- `pnpm run ex0 -- gc` – prune Docker images/volumes managed by the project.
- `pnpm run ex0 -- testdata <subcommand>` – generate or clear demo data (see
  interactive prompts for choices).

### Deployments

- `pnpm run ex0 -- deploy --env dev --ref <git-ref>` – push a git ref to the
  configured Dokku remote (`dokku-dev` or fallback `dokku`).
- `pnpm run ex0 -- deploy-image --env prod --tag <tag>` – build a local Docker
  image, ship it over SSH, and trigger `dokku git:from-image`.

### Operations

- `pnpm run ex0 -- restart --env dev [--compose-dir /opt/constructa]` – restart
  the Dokku web app with automatic fallbacks (`ps:restart`, `apps:restart`,
  stop/start) and bring the remote compose worker back up.
- `pnpm run ex0 -- logs --env dev [--worker] [--tail N]` – tail Dokku logs for
  the web or worker process.
- `pnpm run ex0 -- tunnel up|down` – manage SSH tunnels to remote services
  (MinIO, Mailhog, etc.).
- `pnpm run ex0 -- services [list|minio|mailhog]` – display handy URLs and
  notes for shared infrastructure.

## Configuration

The CLI reads remotes from git:

- `dokku-dev` for `--env dev`
- `dokku-prod` or `dokku` for production

If you deploy from a different compose directory than `/opt/constructa`, set
`EX0_REMOTE_COMPOSE_DIR` in your shell or pass `--compose-dir` to the restart
command.

## Tips

- Use `pnpm run ex0 -- help` (or `--help` on any subcommand) for flags and
  documentation.
- Commands execute with `dotenv` loaded, so `.env` values are available during
  remote operations.
- The CLI exits fast on errors; fix the issue, then rerun the last command.

Enjoy the smoother workflows!
