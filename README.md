# 🚀 TanStack Starter

<div align="center">
  <p><strong>A modern React starter with shadcn/ui and Tailwind CSS 4</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## ✨ Features

- **[TanStack Start](https://tanstack.com/start)** - Modern full-stack React framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Modern utility-first CSS framework
- **[TypeScript](https://typescriptlang.org/)** - Full type safety
- **[TanStack Router](https://tanstack.com/router)** - Type-safe file-based routing
- **[Better Auth](https://better-auth.com/)** - Modern authentication library
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM for PostgreSQL
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** - Fast JavaScript/TypeScript linter
- **[Vitest](https://vitest.dev/)** - Lightning fast unit testing framework

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended package manager)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd tanstack-starter-instructa

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm db:generate  # Generate database migrations
pnpm db:migrate   # Run database migrations
pnpm db:push      # Push schema changes to database
pnpm db:studio    # Open Drizzle Studio

# Code Quality
pnpm lint         # Check code with Oxlint
pnpm lint:fix     # Fix linting issues
pnpm typecheck    # Run TypeScript type checking

# Testing
pnpm test         # Run tests with Vitest
```

### Project CLI (`pnpm ex0`)

This project includes a custom CLI tool for common tasks. Run it using `pnpm ex0 <command>`.

#### Project Structure

```
src/
├── components/
│   ├── auth/            # Authentication components
│   ├── ui/              # shadcn/ui components
│   └── ...              # Other reusable components
├── routes/              # File-based routing
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page
│   ├── (auth)/          # Auth routes (sign-in, sign-up)
│   ├── (marketing)/     # Marketing pages
│   └── api/             # API routes
├── lib/                 # Utility libraries
├── hooks/               # Custom React hooks
├── styles/              # Global styles
└── utils/               # Utility functions

server/
├── auth.ts              # Better Auth configuration
└── db/                  # Database configuration and schemas

drizzle/                 # Database migrations
tests/                   # Test files
```

| Command    | Description                                                                | Args                 |
| :--------- | :------------------------------------------------------------------------- | :------------------- |
| `init`     | Initialize the project (dependencies, DB setup, Docker)                    |                      |
| `stop`     | Stop running Docker containers                                             |                      |
| `reload`   | Reload Docker containers with updated configuration                        |                      |
| `recreate` | Recreate Docker containers and volume (WARNING: deletes all data!)         |                      |
| `recreate` | Recreate Docker containers (use <code>--wipeVolume</code> to also delete the data volume) | `--wipeVolume` |
| `testdata` | Create or delete seed test data in the database                            | `--create`, `--delete` |
| `deploy`   | [TODO] Deploy the application                                              |                      |

### npm/pnpm Scripts

Standard project scripts are available via `pnpm <script-name>`.

| Script             | Description                                      | Underlying Command                                                                       |
| :----------------- | :----------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `dev`              | Start development server                         | `vinxi dev`                                                                              |
| `build`            | Build the project                                | `vinxi build`                                                                            |
| `start`            | Start production server                          | `vinxi start`                                                                            |
| `test`             | Run tests                                        | `vitest`                                                                                 |
| `db:pull`          | Pull database schema using Drizzle Kit           | `npx drizzle-kit pull`                                                                   |
| `db:generate`      | Generate Drizzle migrations/schema changes       | `npx drizzle-kit generate`                                                               |
| `db:migrate`       | Apply Drizzle migrations                         | `npx drizzle-kit migrate`                                                                |
| `biome:fix:unsafe` | Fix code style issues (includes unsafe fixes)    | `biome check --fix --unsafe`                                                             |
| `biome:check`      | Check code style issues                          | `biome check`                                                                            |
| `auth:init`        | Generate Better Auth schema                      | `npx -y @better-auth/cli@latest generate --config src/server/auth.ts --output src/server/db/auth.schema.ts` |
| `ex0`              | Run the custom project CLI                       | `tsx cli/index.ts`                                                                       |

### Tech Stack Reference

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **TanStack Start** | Full-stack React framework | [Docs](https://tanstack.com/start) |
| **TanStack Router** | Type-safe file-based routing | [Docs](https://tanstack.com/router) |
| **Better Auth** | Authentication & user management | [Docs](https://better-auth.com/) |
| **Drizzle ORM** | Type-safe database ORM | [Docs](https://orm.drizzle.team/) |
| **PostgreSQL** | Database | [Docs](https://postgresql.org/) |
| **shadcn/ui** | Component library | [Docs](https://ui.shadcn.com/) |
| **Tailwind CSS** | Utility-first CSS framework | [Docs](https://tailwindcss.com/) |
| **TypeScript** | Type safety | [Docs](https://typescriptlang.org/) |
| **Oxlint** | Fast JavaScript/TypeScript linter | [Docs](https://oxc.rs/) |
| **Vitest** | Unit testing framework | [Docs](https://vitest.dev/) |
| **Resend** | Email delivery service | [Docs](https://resend.com/) |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/constructa"

# Client-side Base URL (optional - defaults to current origin in production)
VITE_BASE_URL="http://localhost:3000"

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

### Adding shadcn/ui Components
```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

### Database
- **PostgreSQL** with Drizzle ORM for type-safe database operations
- **Docker Compose** setup included for local development
- **Drizzle Studio** for database visualization and management

### Authentication
- **Better Auth** provides secure authentication with email/password and OAuth
- **Protected routes** with automatic redirects
- **Email verification** and password reset functionality
- **GitHub & Google OAuth** support

### Styling & Components
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **CSS custom properties** for theming support
- **Dark/light mode** toggle included

### Development Tools
- **Oxlint** for fast linting
- **TypeScript** for type safety
- **Vitest** for testing
- **Path aliases**: `~` resolves to `src/` directory

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ using modern React tools</p>
</div>


