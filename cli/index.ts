import dotenv from 'dotenv'
import { execSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import * as p from '@clack/prompts'
import { blue, cyan, green, red, yellow } from 'ansis'
import { defineCommand, runMain } from 'citty'

dotenv.config()

type AttemptResult = { ok: boolean; message?: string }

const runCommand = (command: string, description: string) => {
  console.log(blue(`\nRunning: ${description} (${command})`))
  try {
    execSync(command, { stdio: 'inherit' })
    console.log(green(`✅ Success: ${description}`))
  } catch (error: unknown) {
    const msg = formatExecError(error)
    console.error(red(`❌ Error running ${description}: ${msg}`))
    process.exit(1)
  }
}

const formatExecError = (error: unknown) => {
  const parts: string[] = []
  if (error && typeof error === 'object') {
    const errObj = error as Record<string, unknown>
    if (typeof errObj.message === 'string' && errObj.message.trim().length > 0) parts.push(errObj.message.trim())
    if (typeof errObj.stdout === 'string' && errObj.stdout.trim().length > 0) parts.push(errObj.stdout.trim())
    if (Buffer.isBuffer(errObj.stdout) && errObj.stdout.length > 0) parts.push(errObj.stdout.toString().trim())
    if (typeof errObj.stderr === 'string' && errObj.stderr.trim().length > 0) parts.push(errObj.stderr.trim())
    if (Buffer.isBuffer(errObj.stderr) && errObj.stderr.length > 0) parts.push(errObj.stderr.toString().trim())
  }
  if (parts.length === 0 && error) parts.push(String(error))
  return parts.join('\n')
}

const attemptCommand = (command: string, description: string, allowFailure = false): AttemptResult => {
  console.log(blue(`\nRunning: ${description} (${command})`))
  try {
    execSync(command, { stdio: 'inherit' })
    console.log(green(`✅ Success: ${description}`))
    return { ok: true }
  } catch (error: unknown) {
    const message = formatExecError(error)
    if (allowFailure) {
      console.log(yellow(`⚠️  ${description} failed: ${message || 'unknown error'}`))
      return { ok: false, message }
    }
    console.error(red(`❌ Error running ${description}: ${message}`))
    process.exit(1)
    return { ok: false, message }
  }
}

const checkDocker = () => {
  console.log(blue('Checking Docker status...'))
  try {
    execSync('docker --version', { stdio: 'pipe' })
  } catch (error) {
    console.error(red('❌ Error: Docker command not found. Please install Docker.'), error)
    process.exit(1)
  }
  try {
    execSync('docker info', { stdio: 'pipe' })
    console.log(green('✅ Docker is installed and running.'))
  } catch (error) {
    console.error(red('❌ Error: Docker daemon is not running. Please start Docker.'), error)
    process.exit(1)
  }
}

type Remote = { host: string; user: string }
type InventoryEntry = { host?: string; user?: string }

const inventoryFiles = [
  'infra/ansible/inventory/hosts.ini',
  'infra/ansible/inventory/hosts.local.ini'
]

const loadInventoryEntries = (): Record<string, InventoryEntry> => {
  const entries: Record<string, InventoryEntry> = {}
  for (const file of inventoryFiles) {
    if (!existsSync(file)) continue
    const content = readFileSync(file, 'utf8')
    for (const rawLine of content.split('\n')) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#') || line.startsWith('[')) continue
      const [name, ...rest] = line.split(/\s+/)
      if (!name) continue
      const data = entries[name] ?? {}
      for (const kv of rest) {
        const [key, value] = kv.split('=')
        if (!key || typeof value === 'undefined') continue
        if (key === 'ansible_host') data.host = value
        if (key === 'ansible_user') data.user = value
      }
      entries[name] = data
    }
  }
  return entries
}

const resolveRemote = (env: 'dev' | 'prod'): Remote => {
  const name = `ex0-${env}`
  const entries = loadInventoryEntries()
  const entry = entries[name]
  if (!entry?.host || entry.host === '<insert' || entry.host.includes(' ')) {
    throw new Error(
      `Missing ansible_host for ${name}. Fill hosts.local.ini with "${name} ansible_host=<ip> ansible_user=deploy".`
    )
  }
  return { host: entry.host, user: entry.user ?? 'deploy' }
}

const getDataDir = () => {
  const dir = join(process.cwd(), '.ex0')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}
type TunnelEntry = { command: string }
const tunnelStatePath = () => join(getDataDir(), 'tunnels.json')
const readTunnelEntries = (): TunnelEntry[] =>
  existsSync(tunnelStatePath()) ? (JSON.parse(readFileSync(tunnelStatePath(), 'utf8')) as TunnelEntry[]) : []
const writeTunnelEntries = (entries: TunnelEntry[]) =>
  writeFileSync(tunnelStatePath(), JSON.stringify(entries, null, 2), 'utf8')
const clearTunnelEntries = () => {
  if (existsSync(tunnelStatePath())) writeFileSync(tunnelStatePath(), '[]', 'utf8')
}

const TUNNEL_FORWARDS = [
  { name: 'MinIO API', localPort: 9000, remotePort: 9000, url: 'http://localhost:9000' },
  { name: 'MinIO Console', localPort: 9001, remotePort: 9001, url: 'http://localhost:9001' }
]

// ---------- helpers ----------
const readFileIfExists = (path: string) => (existsSync(path) ? readFileSync(path, 'utf8') : '')
const detectAppImage = (): string => {
  if (process.env.APP_IMAGE && process.env.APP_IMAGE.trim().length > 0) return process.env.APP_IMAGE.trim()
  // try infra/deploy/.env then .env.sample
  for (const candidate of ['infra/deploy/.env', 'infra/deploy/.env.sample']) {
    const content = readFileIfExists(candidate)
    const m = content.match(/^APP_IMAGE\s*=\s*"?([^"\n]+)"?/m)
    if (m && m[1]) return m[1].trim()
  }
  throw new Error(
    'APP_IMAGE not found. Set APP_IMAGE in your environment or add it to infra/deploy/.env (or .env.sample).'
  )
}

const escapeSingleQuotes = (value: string) => value.replace(/'/g, "'\\''")

let cachedSudoPassword: string | null =
  process.env.CONSTRUCTA_SUDO_PASSWORD && process.env.CONSTRUCTA_SUDO_PASSWORD.trim().length > 0
    ? process.env.CONSTRUCTA_SUDO_PASSWORD.trim()
    : null

const getSudoPassword = async (): Promise<string> => {
  if (cachedSudoPassword) return cachedSudoPassword
  const answer = await p.password({
    message: 'Enter sudo password for the remote deploy user',
    validate: (value) => (value.trim().length === 0 ? 'Password is required' : undefined)
  })
  if (p.isCancel(answer)) {
    p.cancel('Sudo password is required for remote operations. Aborting.')
    process.exit(1)
  }
  cachedSudoPassword = answer.trim()
  return cachedSudoPassword
}

const runRemote = (
  remote: Remote,
  command: string,
  description: string,
  options: { sudo?: boolean; password?: string } = {}
) => {
  console.log(blue(`\nRunning: ${description}`))
  const remoteTarget = `${remote.user}@${remote.host}`
  const sshArgs = [remoteTarget, 'bash', '-lc', command]
  const spawnOptions: Parameters<typeof spawnSync>[2] = {
    stdio: ['pipe', 'inherit', 'inherit']
  }
  if (options.sudo) {
    if (!options.password) throw new Error('sudo password missing for remote command')
    spawnOptions.input = `${options.password}\n`
  }
  const result = spawnSync('ssh', sshArgs, spawnOptions)
  if (result.status === 0) {
    console.log(green(`✅ Success: ${description}`))
    return
  }
  const err = result.error ? result.error : new Error(`ssh exited with code ${result.status}`)
  const message = formatExecError(err)
  console.error(red(`❌ Error running ${description}: ${message}`))
  process.exit(result.status === null ? 1 : result.status)
}

// ---------- commands ----------
const initCommand = defineCommand({
  meta: { name: 'init', description: 'Initialize the project for local dev' },
  async run() {
    console.log(cyan('🚀 Starting project initialization...'))
    runCommand('pnpm install', 'Install dependencies')
    checkDocker()
    console.log(yellow('ℹ️ Starting Docker containers. This might take a while...'))
    // Removed non-existent mailhog service
    runCommand(
      'docker compose up -d db minio provision-minio redis meilisearch',
      'Start core dev services (db, minio, redis, meilisearch)'
    )
    runCommand('npx drizzle-kit generate', 'Generate Drizzle kit')
    runCommand('npx drizzle-kit migrate', 'Run Drizzle migrations')

    const authSchemaPath = 'src/server/db/auth.schema.ts'
    const dbSchemaPath = 'src/db/schema/auth.schema.ts'
    if (existsSync(authSchemaPath) && existsSync(dbSchemaPath)) {
      console.log(green('✅ Better Auth schema files already exist'))
    } else {
      try {
        runCommand(
          'npx -y @better-auth/cli@latest generate --config src/server/auth.ts --output src/server/db/auth.schema.ts',
          'Generate Better Auth schema'
        )
      } catch (error) {
        if (existsSync(authSchemaPath)) {
          console.log(yellow('⚠️ Better Auth CLI reported an error, but schema file was created successfully'))
        } else {
          throw error
        }
      }
    }
    console.log(cyan('🎉 Project initialization complete!'))
  }
})

const stopCommand = defineCommand({
  meta: { name: 'stop', description: 'Stop running Docker containers (local dev)' },
  async run() {
    console.log(cyan('🛑 Stopping Docker containers...'))
    runCommand('docker compose down', 'Stop Docker containers')
    console.log(cyan('✅ Docker containers stopped successfully'))
  }
})

const reloadCommand = defineCommand({
  meta: { name: 'reload', description: 'Reload Docker containers with updated configuration (local dev)' },
  async run() {
    console.log(cyan('🔄 Reloading Docker containers...'))
    runCommand('docker compose down', 'Stop and remove existing Docker containers')
    console.log(yellow('ℹ️ Starting Docker containers. This might take a while...'))
    // Removed non-existent mailhog service
    runCommand(
      'docker compose up -d db minio provision-minio redis meilisearch',
      'Start core dev services (db, minio, redis, meilisearch)'
    )
    console.log(cyan('✅ Docker containers reloaded successfully'))
  }
})

const recreateCommand = defineCommand({
  meta: {
    name: 'recreate',
    description: 'Recreate Docker containers (optionally wipe data volumes) for local dev'
  },
  args: {
    wipeVolume: {
      type: 'boolean',
      description: 'Also delete data volumes (DANGER: all data will be lost)',
      default: false
    }
  },
  async run({ args }) {
    const projectName = basename(process.cwd())
    const dbVolumeName = `${projectName}_ex0-data`
    const minioVolumeName = `${projectName}_ex0-minio-data`
    const { wipeVolume } = args

    if (wipeVolume) {
      p.log.warn(`🚨 WARNING: This will delete volumes (${dbVolumeName}, ${minioVolumeName}).`)
      const confirmWipe = await p.confirm({ message: 'Are you absolutely sure?', initialValue: false })
      if (p.isCancel(confirmWipe) || !confirmWipe) {
        p.cancel('Operation cancelled.')
        return
      }
    } else {
      p.log.info(`ℹ️ Volumes (${dbVolumeName}, ${minioVolumeName}) will be kept.`)
    }

    const s = p.spinner()
    s.start('Recreating Docker containers ...')

    if (wipeVolume) {
      runCommand('docker compose down --volumes --remove-orphans', 'Stop containers and remove volumes')
      runCommand("sh -c 'docker rm -f ex0-db 2>/dev/null || true'", 'Force-remove lingering ex0-db')
      runCommand("sh -c 'docker rm -f ex0-minio 2>/dev/null || true'", 'Force-remove lingering ex0-minio')
      runCommand(`sh -c 'docker volume rm -f ${dbVolumeName} 2>/dev/null || true'`, `Remove volume ${dbVolumeName}`)
      runCommand(
        `sh -c 'docker volume rm -f ${minioVolumeName} 2>/dev/null || true'`,
        `Remove volume ${minioVolumeName}`
      )
    } else {
      runCommand('docker compose down --remove-orphans', 'Stop containers and remove networks (keep volumes)')
    }

    runCommand('docker compose up -d', 'Start Docker containers')
    s.stop(green('✅ Docker containers recreated successfully'))

    const shouldInit = await p.confirm({ message: "Run 'init' now to install deps & run migrations?", initialValue: false })
    if (!p.isCancel(shouldInit) && shouldInit) runCommand('pnpm run ex0 -- init', 'Run init command')
    p.outro(`Recreation complete for '${projectName}'${wipeVolume ? ' (data volume wiped)' : ''}`)
  }
})

const gcCommand = defineCommand({
  meta: { name: 'gc', description: 'Prune unused Docker images and build cache safely (local)' },
  args: {
    age: {
      type: 'string',
      description: 'Only prune artifacts unused for this long (e.g., 168h, 30m, 7h30m)',
      default: '720h'
    },
    dry: { type: 'boolean', description: 'Show what would be removed without deleting', default: false }
  },
  async run({ args }) {
    checkDocker()
    console.log(cyan(`🧹 Docker GC: pruning unused images/build cache older than ${args.age}...`))
    if (args.dry) {
      runCommand('docker system df', 'Show Docker disk usage (dry run)')
      console.log(yellow('Dry run mode: not deleting anything.'))
      return
    }
    runCommand('docker system df', 'Show Docker disk usage (before)')
    runCommand(
      `sh -c 'docker image prune -a -f --filter "until=${args.age}" || true'`,
      'Prune old/unused images'
    )
    runCommand(
      `sh -c 'docker builder prune -a -f --filter "unused-for=${args.age}" || true'`,
      'Prune old/unused build cache'
    )
    runCommand('docker system df', 'Show Docker disk usage (after)')
  }
})

// ----- Build & Release (Compose-first) -----
const releaseCommand = defineCommand({
  meta: { name: 'release', description: 'Build and push application image (requires Docker buildx)' },
  args: {
    tag: { type: 'string', description: 'Image tag', default: 'latest' },
    image: {
      type: 'string',
      description: 'Fully-qualified image (e.g. ghcr.io/org/repo/app)',
      default: ''
    },
    platform: {
      type: 'string',
      description: 'Build platforms list for buildx',
      default: 'linux/amd64'
    },
    push: { type: 'boolean', description: 'Push image after build', default: true }
  },
  async run({ args }) {
    checkDocker()
    const image = (args.image && args.image.length > 0 ? args.image : detectAppImage()).trim()
    const tag = args.tag.trim()
    console.log(cyan(`📦 Building ${image}:${tag} (${args.platform})`))
    if (args.push) {
      runCommand(
        `docker buildx build --platform ${args.platform} -t ${image}:${tag} --push .`,
        `Build & push ${image}:${tag}`
      )
    } else {
      runCommand(`docker build -t ${image}:${tag} .`, `Build ${image}:${tag}`)
    }
  }
})

// ----- Remote Compose Deploy -----
const deployComposeCommand = defineCommand({
  meta: { name: 'deploy', description: 'Deploy to remote host using docker compose (pull + migrate + up)' },
  args: {
    env: { type: 'string', description: 'Target environment: dev or prod', default: 'dev' },
    tag: { type: 'string', description: 'App image tag to deploy', default: 'latest' },
    dir: { type: 'string', description: 'Remote compose directory', default: '/opt/constructa' },
    migrate: { type: 'boolean', description: 'Run DB migrations before up', default: true }
  },
  async run({ args }) {
    const remote = resolveRemote(args.env as 'dev' | 'prod')
    const password = await getSudoPassword()
    const safeDir = escapeSingleQuotes(args.dir)
    const safeTag = escapeSingleQuotes(args.tag)
    const base = `cd '${safeDir}' && export APP_TAG='${safeTag}'`

    runRemote(
      remote,
      `${base} && sudo -SE docker compose pull app worker`,
      'Pull app/worker images',
      { sudo: true, password }
    )
    if (args.migrate) {
      runRemote(
        remote,
        `${base} && sudo -SE docker compose run --rm migrate`,
        'Run database migrations',
        { sudo: true, password }
      )
    }
    runRemote(
      remote,
      `${base} && sudo -SE docker compose up -d app worker caddy`,
      'Restart app/worker/caddy',
      { sudo: true, password }
    )
  }
})

// ----- Deploy current branch by tag (branch-shortsha) -----
const deployBranchCommand = defineCommand({
  meta: { name: 'deploy-branch', description: 'Build, push and deploy the current branch by tag (branch-shortsha)' },
  args: {
    env: { type: 'string', default: 'dev' },
    dir: { type: 'string', default: '/opt/constructa' },
    branch: { type: 'string', default: '' } // optional override
  },
  async run({ args }) {
    const branchRaw =
      args.branch && args.branch.length > 0
        ? args.branch
        : execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe' }).toString().trim()
    const shortSha = execSync('git rev-parse --short HEAD', { stdio: 'pipe' }).toString().trim()
    const tagSafe = branchRaw
      .toLowerCase()
      .replace(/^origin\//, '')
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const tag = `${tagSafe}-${shortSha}`

    await releaseCommand.run({ args: { tag, image: '', platform: 'linux/amd64', push: true }, options: {}, rawArgs: [] })
    await deployComposeCommand.run({ args: { env: args.env, tag, dir: args.dir }, options: {}, rawArgs: [] })
  }
})

// ----- Logs & Restart on remote (defaults to dev) -----
const composeFilePath = '/opt/constructa/compose.yml'

const logsCommand = defineCommand({
  meta: { name: 'logs', description: 'Stream remote compose logs' },
  args: {
    env: { type: 'string', default: 'dev' },
    service: { type: 'string', default: 'app' },
    tail: { type: 'number', default: 100 }
  },
  async run({ args }) {
    const remote = resolveRemote(args.env as 'dev' | 'prod')
    const password = await getSudoPassword()
    const safeTail = Number.isFinite(args.tail) ? args.tail : 100
    const safeService = escapeSingleQuotes(args.service)
    const command =
      `cd '/opt/constructa' && sudo -SE docker compose -f '${composeFilePath}' logs -f --tail=${safeTail} '${safeService}'`
    runRemote(remote, command, `Logs (${args.service})`, { sudo: true, password })
  }
})

const restartCommand = defineCommand({
  meta: { name: 'restart', description: 'Restart remote compose service(s)' },
  args: { env: { type: 'string', default: 'dev' }, service: { type: 'string', default: 'app' } },
  async run({ args }) {
    const remote = resolveRemote(args.env as 'dev' | 'prod')
    const password = await getSudoPassword()
    const safeService = escapeSingleQuotes(args.service)
    const command =
      `cd '/opt/constructa' && sudo -SE docker compose -f '${composeFilePath}' restart '${safeService}'`
    runRemote(remote, command, `Restart ${args.service}`, { sudo: true, password })
  }
})

// ----- Vault helpers (edit/view) -----
const vaultEditCommand = defineCommand({
  meta: { name: 'edit', description: 'Open Vault-encrypted vars file for editing (creates if missing)' },
  args: {
    file: {
      type: 'string',
      default: 'infra/ansible/group_vars/constructa/vars.yml',
      description: 'Path to Vault-encrypted group vars'
    }
  },
  async run({ args }) {
    const file = args.file
    if (!existsSync(file)) {
      console.log(yellow(`Vars file not found. Creating encrypted file at ${file}...`))
      runCommand(`ansible-vault create ${file}`, 'Create encrypted vars file')
    } else {
      runCommand(`ansible-vault edit ${file}`, 'Edit encrypted vars file')
    }
  }
})

const vaultViewCommand = defineCommand({
  meta: { name: 'view', description: 'View Vault-encrypted vars (stdout)' },
  args: {
    file: {
      type: 'string',
      default: 'infra/ansible/group_vars/constructa/vars.yml',
      description: 'Path to Vault-encrypted group vars'
    }
  },
  async run({ args }) {
    runCommand(`ansible-vault view ${args.file}`, 'View encrypted vars file')
  }
})

const vaultCommand = defineCommand({
  meta: { name: 'vault', description: 'Manage Ansible Vault files' },
  subCommands: { edit: vaultEditCommand, view: vaultViewCommand }
})

// ----- SSH tunnels & services -----
const tunnelUpCommand = defineCommand({
  meta: { name: 'up', description: 'Open SSH tunnels for MinIO (requires 127.0.0.1 bindings on the server)' },
  args: { env: { type: 'string', default: 'dev' }, user: { type: 'string', default: '' } },
  async run({ args }) {
    const { host, user } = resolveRemote(args.env as 'dev' | 'prod')
    const sshUser = args.user || user
    const forwards = TUNNEL_FORWARDS.flatMap((f) => ['-L', `${f.localPort}:127.0.0.1:${f.remotePort}`])
    const sshArgs = ['-N', '-f', '-T', '-o', 'ExitOnForwardFailure=yes', ...forwards, `${sshUser}@${host}`]
    console.log(cyan(`Opening tunnels to ${sshUser}@${host}...`))
    const result = spawnSync('ssh', sshArgs, { stdio: 'inherit' })
    if (result.status !== 0) {
      console.error(red('❌ Failed to establish tunnels. Check SSH connectivity and permissions.'))
      process.exit(result.status ?? 1)
    }
    const commandString = ['ssh', ...sshArgs].join(' ')
    const entries = readTunnelEntries()
    entries.push({ command: commandString })
    writeTunnelEntries(entries)
    console.log(green('✅ Tunnels established. Access services locally:'))
    for (const f of TUNNEL_FORWARDS) console.log(`  • ${f.name}: ${f.url}`)
    console.log(yellow('Use `pnpm run ex0 -- tunnel down` to close tunnels.'))
  }
})

const tunnelDownCommand = defineCommand({
  meta: { name: 'down', description: 'Close SSH tunnels opened with `tunnel up`' },
  async run() {
    const entries = readTunnelEntries()
    if (!entries.length) {
      console.log(yellow('ℹ️ No tunnel state file found. Nothing to close.'))
      return
    }
    let closed = 0
    for (const entry of entries) {
      try {
        spawnSync('pkill', ['-f', entry.command], { stdio: 'ignore' })
        closed += 1
      } catch {
        /* ignore */
      }
    }
    clearTunnelEntries()
    console.log(green(`✅ Closed ${closed} tunnel${closed === 1 ? '' : 's'}.`))
  }
})

const tunnelStatusCommand = defineCommand({
  meta: { name: 'status', description: 'Show status of SSH tunnels' },
  async run() {
    const entries = readTunnelEntries()
    if (!entries.length) {
      console.log(yellow('ℹ️ No recorded tunnels. Run `pnpm run ex0 -- tunnel up` first.'))
      return
    }
    console.log(cyan('Current tunnel processes:'))
    for (const entry of entries) {
      const res = spawnSync('pgrep', ['-f', entry.command], { stdio: 'pipe' })
      const active = res.status === 0 && res.stdout.toString().trim().length > 0
      console.log(`  • ${entry.command} ${active ? green('(active)') : red('(not running)')}`)
    }
    console.log(cyan('Local endpoints:'))
    for (const f of TUNNEL_FORWARDS) console.log(`    ${f.name}: ${f.url}`)
  }
})

const tunnelCommand = defineCommand({
  meta: { name: 'tunnel', description: 'Manage SSH tunnels to internal services' },
  subCommands: { up: tunnelUpCommand, down: tunnelDownCommand, status: tunnelStatusCommand }
})

const SERVICES = [
  {
    key: 'minio',
    name: 'MinIO Object Storage',
    description: 'S3-compatible storage UI & API',
    links: [
      { label: 'Console', url: 'http://localhost:9001', note: 'Requires tunnel' },
      { label: 'S3 API', url: 'http://localhost:9000', note: 'Requires tunnel' }
    ]
  }
]

const servicesListCommand = defineCommand({
  meta: { name: 'list', description: 'List self-hosted services and access URLs' },
  async run() {
    console.log(cyan('Available internal services (accessible once tunnels are up):'))
    for (const svc of SERVICES) {
      console.log(`\n${green(svc.name)} – ${svc.description}`)
      for (const link of svc.links) console.log(`  • ${link.label}: ${link.url} (${link.note})`)
    }
    console.log(`\n${yellow('Tip:')} run ${cyan('pnpm run ex0 -- tunnel up')} to open local forwards.`)
  }
})

const createServiceCommand = (key: string) =>
  defineCommand({
    meta: { name: key, description: `Show ${key} service details` },
    async run() {
      const svc = SERVICES.find((s) => s.key === key)
      if (!svc) {
        console.error(red(`Unknown service: ${key}`))
        process.exit(1)
      }
      console.log(`${green(svc.name)} – ${svc.description}`)
      for (const link of svc.links) console.log(`  • ${link.label}: ${link.url} (${link.note})`)
      console.log(`\n${yellow('Hint:')} start tunnels with ${cyan('pnpm run ex0 -- tunnel up')}.`)
    }
  })

const servicesCommand = defineCommand({
  meta: { name: 'services', description: 'Describe internal services (MinIO)' },
  subCommands: { list: servicesListCommand, minio: createServiceCommand('minio') },
  async run() {
    await servicesListCommand.run({ args: {}, options: {}, rawArgs: [] })
  }
})

// ----- Test data helper -----
const testdataCommand = defineCommand({
  meta: { name: 'testdata', description: 'Seed local dev database with test data' },
  async run() {
    runCommand('npx drizzle-kit migrate', 'Run migrations')
    runCommand('node --import tsx/loader src/db/test-data.ts', 'Load test data')
  }
})

const main = defineCommand({
  meta: { name: 'cli', version: '2.0.0', description: 'Project management CLI (Compose-first, Vault-aware)' },
  subCommands: {
    // local
    init: initCommand,
    stop: stopCommand,
    reload: reloadCommand,
    recreate: recreateCommand,
    gc: gcCommand,
    testdata: testdataCommand,
    // release/deploy
    release: releaseCommand,
    deploy: deployComposeCommand,
    'deploy-branch': deployBranchCommand,
    // remote ops
    logs: logsCommand,
    restart: restartCommand,
    // tunnels/services
    tunnel: tunnelCommand,
    services: servicesCommand,
    // vault helpers
    vault: vaultCommand
  }
})

runMain(main)
