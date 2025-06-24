import dotenv from "dotenv"
import "dotenv/config"
import { execSync } from "node:child_process"
import { existsSync } from "node:fs"
import { basename } from "node:path"
import * as p from "@clack/prompts"
import { blue, cyan, green, red, yellow } from "ansis"
import { defineCommand, runMain } from "citty"
dotenv.config()
// Helper function to run commands and log output
const runCommand = (command: string, description: string) => {
    console.log(
        blue(`
Running: ${description} (${command})`)
    )
    try {
        execSync(command, { stdio: "inherit" })
        console.log(green(`✅ Success: ${description}`))
    } catch (error: unknown) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            console.error(red(`❌ Error running ${description}: ${error.message}`))
        } else {
            console.error(red(`❌ Error running ${description}: An unknown error occurred`))
        }
        process.exit(1) // Exit if any command fails
    }
}

// Helper function to check if Docker is installed and running
const checkDocker = () => {
    console.log(blue("Checking Docker status..."))
    try {
        execSync("docker --version", { stdio: "pipe" }) // Check if docker command exists
    } catch (error) {
        console.error(red("❌ Error: Docker command not found. Please install Docker."), error)
        process.exit(1)
    }
    try {
        execSync("docker info", { stdio: "pipe" }) // Check if docker daemon is running
        console.log(green("✅ Docker is installed and running."))
    } catch (error) {
        console.error(red("❌ Error: Docker daemon is not running. Please start Docker."), error)
        process.exit(1)
    }
}

const initCommand = defineCommand({
    meta: {
        name: "init",
        description: "Initialize the project by installing dependencies and setting up services"
    },
    async run() {
        console.log(cyan("🚀 Starting project initialization..."))

        runCommand("pnpm install", "Install dependencies")
        checkDocker()
        // Check if only Mailhog is needed
        if (existsSync("docker-compose.yml")) {
            console.log(yellow("ℹ️ Starting Docker container for Mailhog..."))
            runCommand("docker compose up -d", "Start Mailhog container")
        }
        
        // Initialize Convex
        console.log(yellow("ℹ️ Initializing Convex..."))
        runCommand("npx convex dev --once", "Initialize Convex deployment")

        console.log(cyan("🎉 Project initialization complete!"))
    }
})

const stopCommand = defineCommand({
    meta: {
        name: "stop",
        description: "Stop running Docker containers"
    },
    async run() {
        console.log(cyan("🛑 Stopping Docker containers..."))
        runCommand("docker compose down", "Stop Docker containers")
        console.log(cyan("✅ Docker containers stopped successfully"))
    }
})

const reloadCommand = defineCommand({
    meta: {
        name: "reload",
        description: "Reload Docker containers with updated configuration"
    },
    async run() {
        console.log(cyan("🔄 Reloading Docker containers..."))
        runCommand("docker compose down", "Stop and remove existing Docker containers")
        console.log(yellow("ℹ️ Starting Docker containers. This might take a while..."))
        runCommand("docker compose up -d", "Start Docker containers with updated configuration")
        console.log(cyan("✅ Docker containers reloaded successfully"))
    }
})

const recreateCommand = defineCommand({
    meta: {
        name: "recreate",
        description: "Recreate Docker containers (optionally wipe data volume)"
    },
    args: {
        wipeVolume: {
            type: "boolean",
            description: "Also delete the data volume (DANGER: all data will be lost)",
            default: false
        }
    },
    async run({ args }) {
        // Dynamically determine the project name and volume name
        const projectName = basename(process.cwd())
        // Volume management removed - Convex is cloud-based

        const { wipeVolume } = args

        if (wipeVolume) {
            // Use clack prompts for warning and confirmation only when wiping data
            p.log.warn(
                `🚨 WARNING: This command will stop containers, delete the associated volume (${volumeName}), and start fresh containers.`
            )
            p.log.error("🚨 ALL DATA IN THE VOLUME WILL BE PERMANENTLY LOST.\n")

            const confirmWipe = await p.confirm({
                message: "Are you absolutely sure you want to delete the volume and all its data?",
                initialValue: false
            })

            if (p.isCancel(confirmWipe) || !confirmWipe) {
                p.cancel("Operation cancelled.")
                return
            }
        } else {
            p.log.info(
                `ℹ️ This will recreate containers while keeping the '${volumeName}' volume intact.`
            )
        }

        const s = p.spinner()
        s.start("Recreating Docker containers ...")

        if (wipeVolume) {
            // Stop and remove containers and volumes.
            runCommand(
                "docker compose down --volumes --remove-orphans",
                "Stop and remove existing Docker containers, networks, and volumes"
            )

            // Rare edge-case cleanups
            runCommand(
                "sh -c 'docker rm -f ex0-db 2>/dev/null || true'",
                "Force-remove lingering ex0-db container if it exists"
            )

            runCommand(
                `sh -c 'docker volume rm -f ${volumeName} 2>/dev/null || true'`,
                `Force-remove Docker volume ${volumeName} if it exists`
            )
        } else {
            // Standard recreate (keep volume)
            runCommand(
                "docker compose down --remove-orphans",
                "Stop and remove existing Docker containers and networks (keeping volumes)"
            )
        }

        runCommand("docker compose up -d", "Start Docker containers")

        s.stop(green("✅ Docker containers recreated successfully"))

        // Offer to run the init command afterwards
        const shouldInit = await p.confirm({
            message:
                "Would you like to run the 'init' command now to install dependencies and run migrations?",
            initialValue: false
        })

        if (!p.isCancel(shouldInit) && shouldInit) {
            runCommand("pnpm run ex0 -- init", "Run init command")
        }

        p.outro(
            `Recreation complete for project '${projectName}'${wipeVolume ? " (data volume wiped)" : ""}`
        )
    }
})

// testdata command removed - Convex handles data differently

const deployCommand = defineCommand({
    meta: {
        name: "deploy",
        description: "[TODO] Deploy the application"
    },
    async run() {
        console.log(yellow("⚠️ Deploy command not implemented yet"))
    }
})

const main = defineCommand({
    meta: {
        name: "cli",
        version: "1.0.0",
        description: "Project management CLI"
    },
    subCommands: {
        init: initCommand,
        stop: stopCommand,
        reload: reloadCommand,
        recreate: recreateCommand,
        deploy: deployCommand
    }
})

runMain(main)
