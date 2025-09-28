import dotenv from 'dotenv';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as p from '@clack/prompts';
import { blue, cyan, green, red, yellow } from 'ansis';
import { defineCommand, runMain } from 'citty';
dotenv.config();
// Helper function to run commands and log output
const runCommand = (command: string, description: string) => {
  console.log(
    blue(`
Running: ${description} (${command})`)
  );
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(green(`✅ Success: ${description}`));
  } catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      console.error(red(`❌ Error running ${description}: ${error.message}`));
    } else {
      console.error(red(`❌ Error running ${description}: An unknown error occurred`));
    }
    process.exit(1); // Exit if any command fails
  }
};

// Helper function to check if Docker is installed and running
const checkDocker = () => {
  console.log(blue('Checking Docker status...'));
  try {
    execSync('docker --version', { stdio: 'pipe' }); // Check if docker command exists
  } catch (error) {
    console.error(red('❌ Error: Docker command not found. Please install Docker.'), error);
    process.exit(1);
  }
  try {
    execSync('docker info', { stdio: 'pipe' }); // Check if docker daemon is running
    console.log(green('✅ Docker is installed and running.'));
  } catch (error) {
    console.error(red('❌ Error: Docker daemon is not running. Please start Docker.'), error);
    process.exit(1);
  }
};

type DokkuRemoteDetails = {
  remoteName: string;
  host: string;
  app: string;
};

const resolveDokkuRemote = (env: string): DokkuRemoteDetails => {
  const desired = env === 'dev' ? 'dokku-dev' : 'dokku-prod';
  const fallback = 'dokku';

  let remoteName: string | null = null;
  try {
    const remotes = execSync('git remote', { stdio: 'pipe' })
      .toString()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    remoteName = remotes.includes(desired)
      ? desired
      : remotes.includes(fallback)
        ? fallback
        : null;
  } catch {
    // ignore and handle below
  }

  if (!remoteName) {
    console.error(
      red(
        `❌ No Dokku remote found. Add one with:\n\n` +
          `dokku@your.server:constructa -> git remote add dokku-prod dokku@your.server:constructa\n` +
          `optional dev -> git remote add dokku-dev dokku@your.dev.server:constructa`
      )
    );
    process.exit(1);
  }

  const remoteUrl = execSync(`git remote get-url ${remoteName}`, { stdio: 'pipe' })
    .toString()
    .trim();

  if (!remoteUrl) {
    console.error(red(`❌ Could not read remote URL for ${remoteName}`));
    process.exit(1);
  }

  let host = '';
  let app = '';

  if (remoteUrl.startsWith('ssh://')) {
    const parsed = new URL(remoteUrl);
    const username = parsed.username ? `${parsed.username}@` : '';
    const port = parsed.port ? `:${parsed.port}` : '';
    host = `${username}${parsed.hostname}${port}`;
    app = parsed.pathname.replace(/^\/+/, '');
  } else {
    const lastColon = remoteUrl.lastIndexOf(':');
    if (lastColon === -1) {
      console.error(red(`❌ Unexpected Dokku remote URL format: ${remoteUrl}`));
      process.exit(1);
    }
    host = remoteUrl.slice(0, lastColon);
    app = remoteUrl.slice(lastColon + 1).replace(/^\/+/, '');
  }

  if (!host || !app) {
    console.error(red(`❌ Unable to parse Dokku host/app from remote URL: ${remoteUrl}`));
    process.exit(1);
  }

  return { remoteName, host, app };
};

const parseHostParts = (host: string) => {
  let username = '';
  let hostname = host;
  let port: string | undefined;

  if (host.includes('@')) {
    const [user, rest] = host.split('@');
    username = user;
    hostname = rest;
  }

  if (hostname.includes(':')) {
    const [name, portStr] = hostname.split(':');
    hostname = name;
    port = portStr;
  }

  return { username, hostname, port };
};

type TunnelEntry = {
  command: string;
};

const getDataDir = () => {
  const dir = join(process.cwd(), '.ex0');
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const tunnelStatePath = () => join(getDataDir(), 'tunnels.json');

const readTunnelEntries = (): TunnelEntry[] => {
  const path = tunnelStatePath();
  if (!existsSync(path)) {
    return [];
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as TunnelEntry[];
  } catch {
    return [];
  }
};

const writeTunnelEntries = (entries: TunnelEntry[]) => {
  writeFileSync(tunnelStatePath(), JSON.stringify(entries, null, 2), 'utf8');
};

const clearTunnelEntries = () => {
  if (existsSync(tunnelStatePath())) {
    writeFileSync(tunnelStatePath(), '[]', 'utf8');
  }
};

const TUNNEL_FORWARDS = [
  { name: 'MinIO API', localPort: 9000, remotePort: 9000, url: 'http://localhost:9000' },
  { name: 'MinIO Console', localPort: 9001, remotePort: 9001, url: 'http://localhost:9001' },
  { name: 'Mailhog UI', localPort: 8025, remotePort: 8025, url: 'http://localhost:8025' },
];

const initCommand = defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize the project by installing dependencies and setting up services',
  },
  async run() {
    console.log(cyan('🚀 Starting project initialization...'));

    runCommand('pnpm install', 'Install dependencies');
    checkDocker();
    console.log(yellow('ℹ️ Starting Docker containers. This might take a while...'));
    runCommand('COMPOSE_PROFILES=dev docker compose up -d db minio provision-minio redis meilisearch mailhog', 'Start core dev services (db, minio, redis, meilisearch, mailhog)');
    runCommand('npx drizzle-kit generate', 'Generate Drizzle kit');
    runCommand('npx drizzle-kit migrate', 'Run Drizzle migrations');

    // Check if auth schema already exists
    const authSchemaPath = 'src/server/db/auth.schema.ts';
    const dbSchemaPath = 'src/db/schema/auth.schema.ts';

    if (existsSync(authSchemaPath) && existsSync(dbSchemaPath)) {
      console.log(green('✅ Better Auth schema files already exist'));
    } else {
      try {
        runCommand(
          'npx -y @better-auth/cli@latest generate --config src/server/auth.ts --output src/server/db/auth.schema.ts',
          'Generate Better Auth schema'
        );
      } catch (error) {
        // Check if the files were created despite the error
        if (existsSync(authSchemaPath)) {
          console.log(
            yellow('⚠️ Better Auth CLI reported an error, but schema file was created successfully')
          );
        } else {
          throw error; // Re-throw if file wasn't created
        }
      }
    }

    console.log(cyan('🎉 Project initialization complete!'));
  },
});

const stopCommand = defineCommand({
  meta: {
    name: 'stop',
    description: 'Stop running Docker containers',
  },
  async run() {
    console.log(cyan('🛑 Stopping Docker containers...'));
    runCommand('docker compose down', 'Stop Docker containers');
    console.log(cyan('✅ Docker containers stopped successfully'));
  },
});

const reloadCommand = defineCommand({
  meta: {
    name: 'reload',
    description: 'Reload Docker containers with updated configuration',
  },
  async run() {
    console.log(cyan('🔄 Reloading Docker containers...'));
    runCommand('docker compose down', 'Stop and remove existing Docker containers');
    console.log(yellow('ℹ️ Starting Docker containers. This might take a while...'));
    runCommand('COMPOSE_PROFILES=dev docker compose up -d db minio provision-minio redis meilisearch mailhog', 'Start core dev services (db, minio, redis, meilisearch, mailhog)');
    console.log(cyan('✅ Docker containers reloaded successfully'));
  },
});

const recreateCommand = defineCommand({
  meta: {
    name: 'recreate',
    description: 'Recreate Docker containers (optionally wipe data volume)',
  },
  args: {
    wipeVolume: {
      type: 'boolean',
      description: 'Also delete the data volume (DANGER: all data will be lost)',
      default: false,
    },
  },
  async run({ args }) {
    // Dynamically determine the project name and volume names
    const projectName = basename(process.cwd());
    const dbVolumeName = `${projectName}_ex0-data`;
    const minioVolumeName = `${projectName}_ex0-minio-data`;

    const { wipeVolume } = args;

    if (wipeVolume) {
      // Use clack prompts for warning and confirmation only when wiping data
      p.log.warn(
        `🚨 WARNING: This command will stop containers, delete both volumes (${dbVolumeName}, ${minioVolumeName}), and start fresh containers.`
      );
      p.log.error('🚨 ALL DATA IN BOTH VOLUMES WILL BE PERMANENTLY LOST.\n');

      const confirmWipe = await p.confirm({
        message: 'Are you absolutely sure you want to delete both volumes and all their data?',
        initialValue: false,
      });

      if (p.isCancel(confirmWipe) || !confirmWipe) {
        p.cancel('Operation cancelled.');
        return;
      }
    } else {
      p.log.info(
        `ℹ️ This will recreate containers while keeping both volumes (${dbVolumeName}, ${minioVolumeName}) intact.`
      );
    }

    const s = p.spinner();
    s.start('Recreating Docker containers ...');

    if (wipeVolume) {
      // Stop and remove containers and volumes.
      runCommand(
        'docker compose down --volumes --remove-orphans',
        'Stop and remove existing Docker containers, networks, and volumes'
      );

      // Rare edge-case cleanups
      runCommand(
        "sh -c 'docker rm -f ex0-db 2>/dev/null || true'",
        'Force-remove lingering ex0-db container if it exists'
      );

      runCommand(
        "sh -c 'docker rm -f ex0-minio 2>/dev/null || true'",
        'Force-remove lingering ex0-minio container if it exists'
      );

      runCommand(
        `sh -c 'docker volume rm -f ${dbVolumeName} 2>/dev/null || true'`,
        `Force-remove Docker volume ${dbVolumeName} if it exists`
      );

      runCommand(
        `sh -c 'docker volume rm -f ${minioVolumeName} 2>/dev/null || true'`,
        `Force-remove Docker volume ${minioVolumeName} if it exists`
      );
    } else {
      // Standard recreate (keep volumes)
      runCommand(
        'docker compose down --remove-orphans',
        'Stop and remove existing Docker containers and networks (keeping volumes)'
      );
    }

    runCommand('docker compose up -d', 'Start Docker containers');

    s.stop(green('✅ Docker containers recreated successfully'));

    // Offer to run the init command afterwards
    const shouldInit = await p.confirm({
      message:
        "Would you like to run the 'init' command now to install dependencies and run migrations?",
      initialValue: false,
    });

    if (!p.isCancel(shouldInit) && shouldInit) {
      runCommand('pnpm run ex0 -- init', 'Run init command');
    }

    p.outro(
      `Recreation complete for project '${projectName}'${wipeVolume ? ' (data volume wiped)' : ''}`
    );
  },
});

const gcCommand = defineCommand({
  meta: {
    name: 'gc',
    description: 'Prune unused Docker images and build cache safely',
  },
  args: {
    age: {
      type: 'string',
      description: 'Only prune artifacts unused for this long (e.g., 168h, 30m, 7h30m)',
      default: '720h', // 30 days
    },
    dry: {
      type: 'boolean',
      description: 'Show what would be removed without deleting',
      default: false,
    },
  },
  async run({ args }) {
    checkDocker();
    console.log(cyan(`🧹 Docker GC: pruning unused images/build cache older than ${args.age}...`));
    if (args.dry) {
      runCommand('docker system df', 'Show Docker disk usage (dry run)');
      console.log(yellow('Dry run mode: not deleting anything. To prune, run without --dry.'));
      return;
    }
    runCommand('docker system df', 'Show Docker disk usage (before)');
    runCommand(`sh -c 'docker image prune -a -f --filter "until=${args.age}" || true'`, 'Prune unused images');
    runCommand(`sh -c 'docker builder prune -a -f --filter "unused-for=${args.age}" || true'`, 'Prune build cache');
    runCommand('docker system df', 'Show Docker disk usage (after)');
  },
});

const testdataCommand = defineCommand({
  meta: {
    name: 'testdata',
    description: 'Create or delete seed test data in the database',
  },
  args: {
    create: {
      type: 'boolean',
      description: 'Insert the demo data',
      default: false,
    },
    delete: {
      type: 'boolean',
      description: 'Remove the demo data',
      default: false,
    },
  },
  async run({ args }) {
    if (args.create === args.delete) {
      console.error(red('Please specify exactly one of --create or --delete'));
      process.exit(1);
    }

    if (!process.env.DATABASE_URL) {
      console.error(red('DATABASE_URL environment variable is required'));
      process.exit(1);
    }

    const s = p.spinner();
    try {
      if (args.create) {
        s.start('Inserting test data...');
        const { createAllTestData } = await import('../src/db/test-data');
        await createAllTestData();
        s.stop(green('✅ Inserted test data'));
      } else {
        s.start('Deleting test data...');
        const { deleteAllTestData } = await import('../src/db/test-data');
        await deleteAllTestData();
        s.stop(green('✅ Deleted test data'));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(red(`❌ ${error.message}`));
      } else {
        console.error(red('❌ Unknown error while managing test data'));
      }
      process.exit(1);
    }
  },
});

const deployCommand = defineCommand({
  meta: {
    name: 'deploy',
    description: 'Deploy to Dokku (dev or prod) via git push',
  },
  args: {
    env: {
      type: 'string',
      description: 'Target environment: dev or prod',
      default: 'prod',
    },
    ref: {
      type: 'string',
      description: 'Git ref to push (e.g., main, HEAD)',
      default: 'HEAD',
    },
  },
  async run({ args }) {
    const { remoteName } = resolveDokkuRemote(args.env);
    const pushRef = `${args.ref}:main`;
    runCommand(`git push ${remoteName} ${pushRef}`, `Deploy ${args.ref} to ${args.env} (${remoteName})`);
  },
});

const deployImageCommand = defineCommand({
  meta: {
    name: 'deploy-image',
    description: 'Build a local Docker image and deploy it to Dokku without pushing git refs',
  },
  args: {
    env: {
      type: 'string',
      description: 'Target environment: dev or prod',
      default: 'prod',
    },
    tag: {
      type: 'string',
      description: 'Image tag to use when saving to Dokku',
      default: 'latest',
    },
  },
  async run({ args }) {
    checkDocker();
    const { host, app } = resolveDokkuRemote(args.env);

    const localTag = `dokku/${app}:${args.tag}`;

    runCommand(`docker build -t ${localTag} .`, 'Build local Docker image');

    const transferCmd = `sh -c "docker save ${localTag} | gzip | ssh ${host} 'gunzip | docker load'"`;
    runCommand(transferCmd, `Transfer ${localTag} to ${host}`);

    const deployCmd = `ssh ${host} 'dokku git:from-image ${app} ${localTag}'`;
    runCommand(deployCmd, `Deploy ${localTag} to ${args.env} (${host})`);
  },
});

const tunnelUpCommand = defineCommand({
  meta: {
    name: 'up',
    description: 'Open SSH tunnels for self-hosted services (MinIO, Mailhog)',
  },
  args: {
    env: {
      type: 'string',
      description: 'Target environment: dev or prod',
      default: 'dev',
    },
    user: {
      type: 'string',
      description: 'SSH user to use for the tunnel (defaults to deploy@host)',
      default: '',
    },
  },
  async run({ args }) {
    const { host } = resolveDokkuRemote(args.env);
    const { username, hostname, port } = parseHostParts(host);
    const sshUser = args.user || (username && username !== 'dokku' ? username : 'deploy');
    const target = `${sshUser}@${hostname}${port ? `:${port}` : ''}`;

    const forwards = TUNNEL_FORWARDS.flatMap((forward) => [
      '-L',
      `${forward.localPort}:127.0.0.1:${forward.remotePort}`,
    ]);

    const sshArgs = ['-N', '-f', '-T', '-o', 'ExitOnForwardFailure=yes', ...forwards, target];

    console.log(cyan(`Opening tunnels to ${target}...`));
    const result = spawnSync('ssh', sshArgs, { stdio: 'inherit' });
    if (result.status !== 0) {
      console.error(red('❌ Failed to establish tunnels. Check SSH connectivity and permissions.'));
      process.exit(result.status ?? 1);
    }

    const commandString = ['ssh', ...sshArgs].join(' ');
    const entries = readTunnelEntries();
    entries.push({ command: commandString });
    writeTunnelEntries(entries);

    console.log(green('✅ Tunnels established. Access services locally:'));
    for (const forward of TUNNEL_FORWARDS) {
      console.log(`  • ${forward.name}: ${forward.url}`);
    }
    console.log(yellow('Use `pnpm run ex0 -- tunnel down` to close tunnels when finished.'));
  },
});

const tunnelDownCommand = defineCommand({
  meta: {
    name: 'down',
    description: 'Close SSH tunnels opened with `tunnel up`',
  },
  async run() {
    const entries = readTunnelEntries();
    if (!entries.length) {
      console.log(yellow('ℹ️ No tunnel state file found. Nothing to close.'));
      return;
    }

    let closed = 0;
    for (const entry of entries) {
      try {
        spawnSync('pkill', ['-f', entry.command], { stdio: 'ignore' });
        closed += 1;
      } catch {
        // ignore
      }
    }

    clearTunnelEntries();
    console.log(green(`✅ Closed ${closed} tunnel${closed === 1 ? '' : 's'}.`));
  },
});

const tunnelStatusCommand = defineCommand({
  meta: {
    name: 'status',
    description: 'Show status of SSH tunnels',
  },
  async run() {
    const entries = readTunnelEntries();
    if (!entries.length) {
      console.log(yellow('ℹ️ No recorded tunnels. Run `pnpm run ex0 -- tunnel up` first.'));
      return;
    }

    console.log(cyan('Current tunnel processes:'));
    for (const entry of entries) {
      const res = spawnSync('pgrep', ['-f', entry.command], { stdio: 'pipe' });
      const active = res.status === 0 && res.stdout.toString().trim().length > 0;
      console.log(`  • ${entry.command} ${active ? green('(active)') : red('(not running)')}`);
    }
    console.log(cyan('Local endpoints:'));
    for (const forward of TUNNEL_FORWARDS) {
      console.log(`    ${forward.name}: ${forward.url}`);
    }
  },
});

const tunnelCommand = defineCommand({
  meta: {
    name: 'tunnel',
    description: 'Manage SSH tunnels to internal services',
  },
  subCommands: {
    up: tunnelUpCommand,
    down: tunnelDownCommand,
    status: tunnelStatusCommand,
  },
});

const SERVICES = [
  {
    key: 'minio',
    name: 'MinIO Object Storage',
    description: 'S3-compatible storage UI & API',
    links: [
      { label: 'Console', url: 'http://localhost:9001', note: 'Requires tunnel' },
      { label: 'S3 API', url: 'http://localhost:9000', note: 'Requires tunnel' },
    ],
  },
  {
    key: 'mailhog',
    name: 'Mailhog SMTP viewer',
    description: 'Dev mail inbox UI',
    links: [{ label: 'Web UI', url: 'http://localhost:8025', note: 'Requires tunnel' }],
  },
];

const servicesListCommand = defineCommand({
  meta: {
    name: 'list',
    description: 'List self-hosted services and access URLs',
  },
  async run() {
    console.log(cyan('Available internal services (accessible once tunnels are up):'));
    for (const svc of SERVICES) {
      console.log(`\n${green(svc.name)} – ${svc.description}`);
      for (const link of svc.links) {
        console.log(`  • ${link.label}: ${link.url} (${link.note})`);
      }
    }
    console.log(`\n${yellow('Tip:')} run ${cyan('pnpm run ex0 -- tunnel up')} to open local forwards.`);
  },
});

const createServiceCommand = (key: string) =>
  defineCommand({
    meta: {
      name: key,
      description: `Show ${key} service details`,
    },
    async run() {
      const svc = SERVICES.find((service) => service.key === key);
      if (!svc) {
        console.error(red(`Unknown service: ${key}`));
        process.exit(1);
      }
      console.log(`${green(svc.name)} – ${svc.description}`);
      for (const link of svc.links) {
        console.log(`  • ${link.label}: ${link.url} (${link.note})`);
      }
      console.log(`\n${yellow('Hint:')} start tunnels with ${cyan('pnpm run ex0 -- tunnel up')}.`);
    },
  });

const servicesCommand = defineCommand({
  meta: {
    name: 'services',
    description: 'Describe internal services (MinIO, Mailhog, etc.)',
  },
  subCommands: {
    list: servicesListCommand,
    minio: createServiceCommand('minio'),
    mailhog: createServiceCommand('mailhog'),
  },
  async run() {
    await servicesListCommand.run({ args: {}, options: {}, rawArgs: [] });
  },
});

const main = defineCommand({
  meta: {
    name: 'cli',
    version: '1.0.0',
    description: 'Project management CLI',
  },
  subCommands: {
    init: initCommand,
    stop: stopCommand,
    reload: reloadCommand,
    recreate: recreateCommand,
    gc: gcCommand,
    testdata: testdataCommand,
    deploy: deployCommand,
    'deploy-image': deployImageCommand,
    tunnel: tunnelCommand,
    services: servicesCommand,
  },
});

runMain(main);
