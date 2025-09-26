import dotenv from 'dotenv';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { basename } from 'node:path';
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
    description: '[TODO] Deploy the application',
  },
  async run() {
    console.log(yellow('⚠️ Deploy command not implemented yet'));
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
    testdata: testdataCommand,
    deploy: deployCommand,
  },
});

runMain(main);
