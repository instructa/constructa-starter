# Constructa Starter

<div align="center">
  <img src="public/constructa_banner_.png" alt="Constructa Starter Banner" width="100%" />
</div>

<div align="center">
  <h2>AI-First SAAS Starter Kit</h2>
  <p>Optimized for coding with AI assistants • Powered by <a href="https://instructa.ai">instructa.ai</a></p>
</div>

> ⚠️ **Work in Progress** - This starter kit is currently under active development. Features and documentation may change frequently.


## ✨ Features

- 🔐 **Authentication** - Login/signup with email, GitHub & Google OAuth, password reset
- 📊 **Dashboard Templates** - AI Chat, Workflows, Documents, Image Chat, Charts (`/dashboard`)
- 🤖 **AI Assistant Chat** - Repository-aware AI assistant powered by Mastra with MinIO-backed file access (`/dashboard/chat`)
- 🎨 **Marketing Pages** - Modern landing page with responsive design & dark/light mode
- 💾 **Database** - Local PostgreSQL with Docker, Supabase ready, Drizzle ORM
- 🤖 **AI-Optimized** - Cursor rules, .ruler auto-generated agent rules, AGENTS.md format for Claude Code/Codex/Cursor, consistent patterns, TypeScript for better AI coding
- 🛠️ **Developer Tools** - Hot reload, path aliases, Oxlint, Vitest, custom CLI
- 🐛 **Frontend Error Logging** - Browser-Echo integration for automatic error capture and structured logging


## 🚀 Quick Start

### Prerequisites
- Download & Install **[Node.js](https://nodejs.org/en)** 18+ 
- Download & Install **[Docker](https://www.docker.com/)** Desktop
- **pnpm** (recommended package manager)

### Installation

```bash
# Clone the repository
npx gitpick git@github.com:instructa/constructa-starter.git my-app
cd my-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Setup

```
# Create env file
cp .env.example .env

# Use CLI to kickstart your project
pnpm ex0 init
```

## Why?

Why start with a boilerplate when AI can generate almost an entire app for us? Because a solid foundation is still the most important part of building full-stack web applications. Even code generators like v0 or bolt.new bootstrap from a starter project. It provides consistency and a reliable point of departure.

On top of that, we can layer in helpful tooling such as AI rules (Cursor Rules, Agents.md, and more) and configuration settings that make it easier for Cursor, Claude, and similar tools to build your app. That’s the whole idea behind this project. It’s still in an early stage and not production-ready, but it’s already mature enough to create some cool things.


## Tech Stack

- **[TanStack Start](https://tanstack.com/start)** - Modern full-stack React framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Modern utility-first CSS framework
- **[TypeScript](https://typescriptlang.org/)** - Full type safety
- **[TanStack Router](https://tanstack.com/router)** - Type-safe file-based routing
- **[Better Auth](https://better-auth.com/)** - Modern authentication library
- **[Better Auth UI](https://github.com/daveyplate/better-auth-ui)** - Pre-built React components for Better Auth
- **[Mastra](https://mastra.ai)** - AI agent framework with tool integration
- **[Assistant UI](https://assistant-ui.com)** - React components for AI chat interfaces
- **[OpenAI SDK](https://github.com/vercel/ai)** - AI SDK for LLM integration
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM for PostgreSQL
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** - Fast JavaScript/TypeScript linter
- **[Vitest](https://vitest.dev/)** - Lightning fast unit testing framework
- **Cursor Rules** - Pre-configured AI coding assistant rules for optimal development experience
- **.ruler** - Auto-generates agent rules for consistent AI-assisted development
- **AGENTS.md** - Standardized agent rules format compatible with Claude Code, Codex, Cursor, and other AI coding assistants


### Project CLI (`pnpm ex0`)

This project includes a custom CLI tool for common tasks. Run it using `pnpm ex0 <command>`.


| Command    | Description                                                                | Args                 |
| :--------- | :------------------------------------------------------------------------- | :------------------- |
| `init`     | Initialize the project (dependencies, DB setup, Docker)                    |                      |
| `stop`     | Stop running Docker containers                                             |                      |
| `reload`   | Reload Docker containers with updated configuration                        |                      |
| `recreate` | Recreate Docker containers and volume (WARNING: deletes all data!)         |                      |
| `recreate` | Recreate Docker containers (use <code>--wipeVolume</code> to also delete the data volume) | `--wipeVolume` |
| `testdata` | Create or delete seed test data in the database                            | `--create`, `--delete` |
| `deploy`   | [TODO] Deploy the application                                              |                      |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/constructa"

# Client-side Base URL (optional - defaults to current origin in production)
VITE_BASE_URL="http://localhost:3000"

# AI Configuration
OPENAI_API_KEY="sk-..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Email Verification (disabled by default)
# Server-side email verification control
ENABLE_EMAIL_VERIFICATION="false"
# Client-side email verification control (for UI decisions)
VITE_ENABLE_EMAIL_VERIFICATION="false"

# Email Service Configuration (Resend is the default provider)
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="your-resend-api-key"

# OAuth Providers (optional)
# Server-side OAuth configuration
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Client-side OAuth configuration (for UI buttons)
VITE_GITHUB_CLIENT_ID="your-github-client-id"
VITE_GOOGLE_CLIENT_ID="your-google-client-id"
```

- `VITE_BASE_URL` is optional - in production, it will automatically use the current domain
- For local development, it defaults to `http://localhost:3000`

### Email Service Setup

The application supports **multiple email providers** for maximum flexibility. You can choose between console logging, Mailhog (for local development), SMTP, or Resend based on your needs.

#### Email Provider Options

1. **Console Provider** (Default for development)
   - Logs emails to the console
   - No external dependencies
   - Perfect for initial development

   ```bash
   EMAIL_PROVIDER="console"
   ```

2. **Mailhog** (Recommended for local development)
   - Catches all emails locally
   - Web UI to view emails at http://localhost:8025
   - Already included in Docker Compose

   ```bash
   EMAIL_PROVIDER="mailhog"
   # No additional configuration needed
   ```

   Start Mailhog with Docker:
   ```bash
   docker-compose up -d mailhog
   ```

3. **SMTP Provider** (For production or custom email servers)
   ```bash
   EMAIL_PROVIDER="smtp"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. **Resend** (Modern email API)
   ```bash
   EMAIL_PROVIDER="resend"
   RESEND_API_KEY="re_xxxxxxxxxxxx"
   ```

   - Sign up at [resend.com](https://resend.com)
   - Create an API key in your dashboard
   - Add your domain and verify it (for production)

#### Common Email Configuration

```bash
# Set the default "from" address
EMAIL_FROM="noreply@yourdomain.com"

# Enable email verification (optional)
ENABLE_EMAIL_VERIFICATION="true"
VITE_ENABLE_EMAIL_VERIFICATION="true"
```

#### Adding Custom Email Providers

The email system is designed to be extensible. To add a new provider:

1. **Create a new provider class** in `src/server/email/providers.ts`:
   ```typescript
   export class MyCustomProvider implements EmailProvider {
     async sendEmail({ from, to, subject, html }) {
       // Your implementation here
     }
   }
   ```

2. **Add the provider to the factory** in `src/server/email/index.ts`:
   ```typescript
   case "custom":
     emailProvider = new MyCustomProvider();
     break;
   ```

3. **Update your environment variables**:
   ```bash
   EMAIL_PROVIDER="custom"
   # Add any custom configuration needed
   ```

#### Email Verification Behavior

**When disabled** (default):
- Users are automatically signed in after registration
- No verification email is sent
- Users are redirected directly to the dashboard

**When enabled**:
- Users must verify their email before signing in
- A verification email is sent upon registration
- Users are redirected to a "check your email" page
- Users cannot sign in until their email is verified

### OAuth Providers Setup

The application supports OAuth authentication with GitHub and Google. Here's how to set them up:

#### GitHub OAuth Setup

1. **Create a GitHub OAuth App:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the application details:
     - **Application name**: Your app name
     - **Homepage URL**: `http://localhost:3000` (for development)
     - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

2. **Get your credentials:**
   - After creating the app, copy the **Client ID**
   - Generate a new **Client Secret**

3. **Add to environment variables:**
   ```bash
   # Server-side configuration
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # Client-side configuration (for UI buttons)
   VITE_GITHUB_CLIENT_ID="your-github-client-id"
   ```

4. **For production deployment:**
   - Update the **Homepage URL** to your production domain
   - Update the **Authorization callback URL** to `https://yourdomain.com/api/auth/callback/github`

#### Google OAuth Setup

1. **Create a Google OAuth App:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configure OAuth consent screen:**
   - Fill in the required application information
   - Add your domain to authorized domains

3. **Create OAuth 2.0 Client ID:**
   - Application type: **Web application**
   - **Authorized JavaScript origins**: `http://localhost:3000` (for development)
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

4. **Get your credentials:**
   - Copy the **Client ID** and **Client Secret**

5. **Add to environment variables:**
   ```bash
   # Server-side configuration
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Client-side configuration (for UI buttons)
   VITE_GOOGLE_CLIENT_ID="your-google-client-id"
   ```

6. **For production deployment:**
   - Update authorized origins to your production domain
   - Update redirect URI to `https://yourdomain.com/api/auth/callback/google`

#### Testing OAuth Integration

Once configured, users will see GitHub and Google sign-in options on the authentication pages. The OAuth providers are conditionally enabled based on the presence of their respective environment variables.


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Links

- X/Twitter: [@kregenrek](https://x.com/kregenrek)
- Bluesky: [@kevinkern.dev](https://bsky.app/profile/kevinkern.dev)

## AI Academy & Courses
- Learn Cursor AI: [Ultimate Cursor Course](https://www.instructa.ai/en/cursor-ai)
- Learn to build software with AI: [instructa.ai](https://www.instructa.ai)

## See my other projects:

* [AI Prompts](https://github.com/instructa/ai-prompts/blob/main/README.md) - Curated AI Prompts for Cursor AI, Cline, Windsurf and Github Copilot
* [codefetch](https://github.com/regenrek/codefetch) - Turn code into Markdown for LLMs with one simple terminal command
* [aidex](https://github.com/regenrek/aidex) A CLI tool that provides detailed information about AI language models, helping developers choose the right model for their needs.# tool-starter