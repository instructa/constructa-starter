# Constructa Starter

<div align="center">
  <img src="public/constructa_banner_.png" alt="Banner de Constructa Starter" width="100%" />
</div>

<div align="center">
  <h2>Kit de Inicio SAAS con IA</h2>
  <p>Optimizado para codificar con asistentes de IA • Impulsado por <a href="https://instructa.ai">instructa.ai</a></p>
</div>

> 🌍 **También disponible en inglés** - [English README](README.md) | [English Documentation](docs/)

> ⚠️ **Trabajo en Progreso** - Este kit de inicio está actualmente en desarrollo activo. Las características y la documentación pueden cambiar con frecuencia.


## ✨ Características

- 🔐 **Autenticación** - Inicio de sesión/registro con email, GitHub y Google OAuth, recuperación de contraseña
- 📊 **Plantillas de Panel** - Chat de IA, Flujos de Trabajo, Documentos, Chat de Imágenes, Gráficos (`/dashboard`)
- 🤖 **Chat de Asistente IA** - Asistente de IA consciente del repositorio impulsado por Mastra con acceso a archivos respaldado por MinIO (`/dashboard/chat`)
- 💳 **Facturación y Pagos** - Sistema completo de suscripciones con integración de Polar.sh, gestión de créditos y portal de facturación (`/dashboard/billing`)
- 🎨 **Páginas de Marketing** - Página de inicio moderna con diseño responsivo y modo claro/oscuro
- 💾 **Base de Datos** - PostgreSQL local con Docker, listo para Supabase, Drizzle ORM
- 🚀 **Despliegue** - Despliegue en la nube de Hetzner con Docker, Dokku y CI/CD automatizado
- 🤖 **Optimizado para IA** - Reglas de Cursor, reglas de agentes auto-generadas con .ruler, formato AGENTS.md para Claude Code/Codex/Cursor, patrones consistentes, TypeScript para mejor codificación con IA
- 🛠️ **Herramientas de Desarrollo** - Recarga en caliente, alias de rutas, Oxlint, Vitest, CLI personalizado
- 🐛 **Registro de Errores Frontend** - Integración de Browser-Echo para captura automática de errores y registro estructurado


## 🚀 Inicio Rápido

### Prerequisitos
- Descargar e Instalar **[Node.js](https://nodejs.org/en)** 22.12+ (requerido para TanStack Start RC1)
- Descargar e Instalar **[Docker](https://www.docker.com/)** Desktop
- **pnpm** (gestor de paquetes recomendado)

### Instalación

```bash
# Clonar el repositorio
npx gitpick git@github.com:instructa/constructa-starter.git my-app
cd my-app

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Configuración

```
# Crear archivo env
cp .env.example .env

# Usar CLI para iniciar tu proyecto
pnpm ex0 init
```

## ¿Por Qué?

¿Por qué comenzar con una plantilla cuando la IA puede generar casi toda una aplicación? Porque una base sólida sigue siendo la parte más importante de construir aplicaciones web full-stack. Incluso los generadores de código como v0 o bolt.new se basan en un proyecto inicial. Proporciona consistencia y un punto de partida confiable.

Además de eso, podemos agregar herramientas útiles como reglas de IA (Cursor Rules, Agents.md y más) y configuraciones que facilitan que Cursor, Claude y herramientas similares construyan tu aplicación. Esa es toda la idea detrás de este proyecto. Todavía está en una etapa temprana y no está listo para producción, pero ya es lo suficientemente maduro para crear algunas cosas interesantes.


## Stack Tecnológico

- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes hermosa y accesible
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS moderno basado en utilidades
- **[TypeScript](https://typescriptlang.org/)** - Seguridad de tipos completa
- **[TanStack Router](https://tanstack.com/router)** - Enrutamiento type-safe basado en archivos (v1.132.x)
- **[TanStack Start](https://tanstack.com/start)** - Framework React full-stack moderno (RC1)
- **[Better Auth](https://better-auth.com/)** - Biblioteca de autenticación moderna
- **[Better Auth UI](https://github.com/daveyplate/better-auth-ui)** - Componentes React pre-construidos para Better Auth
- **[Polar.sh](https://polar.sh)** - Gestión moderna de facturación y suscripciones
- **[Mastra](https://mastra.ai)** - Framework de agentes de IA con integración de herramientas
- **[Assistant UI](https://assistant-ui.com)** - Componentes React para interfaces de chat de IA
- **[OpenAI SDK](https://github.com/vercel/ai)** - SDK de IA para integración de LLM
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript para PostgreSQL
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** - Linter rápido para JavaScript/TypeScript
- **[Vitest](https://vitest.dev/)** - Framework de pruebas unitarias ultra rápido
- **Cursor Rules** - Reglas pre-configuradas de asistente de codificación con IA para experiencia de desarrollo óptima
- **.ruler** - Auto-genera reglas de agentes para desarrollo asistido por IA consistente
- **AGENTS.md** - Formato de reglas de agentes estandarizado compatible con Claude Code, Codex, Cursor y otros asistentes de codificación con IA


### CLI del Proyecto (`pnpm ex0`)

Este proyecto incluye una herramienta CLI personalizada para tareas comunes. Ejecútala usando `pnpm ex0 <comando>`.


| Comando    | Descripción                                                                | Argumentos           |
| :--------- | :------------------------------------------------------------------------- | :------------------- |
| `init`     | Inicializar el proyecto (dependencias, configuración de BD, Docker)       |                      |
| `stop`     | Detener contenedores Docker en ejecución                                   |                      |
| `reload`   | Recargar contenedores Docker con configuración actualizada                 |                      |
| `recreate` | Recrear contenedores Docker y volumen (¡ADVERTENCIA: elimina todos los datos!) |                      |
| `recreate` | Recrear contenedores Docker (usar <code>--wipeVolume</code> para también eliminar el volumen de datos) | `--wipeVolume` |
| `testdata` | Crear o eliminar datos de prueba en la base de datos                       | `--create`, `--delete` |
| `deploy`   | Desplegar vía `git push dokku main` (ver docs/es/constructa/hosting.md)   | Ejecutar según sea necesario |

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en el directorio raíz basado en `.env.example`:

```bash
# Base de Datos
DATABASE_URL="postgresql://username:password@localhost:5432/constructa"

# URL Base del Cliente (opcional - por defecto usa el origen actual en producción)
VITE_BASE_URL="http://localhost:3000"

# Configuración de IA
OPENAI_API_KEY="sk-..."

# Configuración de Facturación / Polar
POLAR_SERVER="sandbox"
POLAR_ACCESS_TOKEN=""
POLAR_WEBHOOK_SECRET=""
POLAR_ORGANIZATION_ID=""
POLAR_PRODUCT_PRO_MONTHLY="prod_..."
POLAR_PRODUCT_BUSINESS_MONTHLY="prod_..."
POLAR_PRODUCT_CREDITS_50="prod_..."
POLAR_PRODUCT_CREDITS_100="prod_..."
PUBLIC_URL="http://localhost:3000"
CHECKOUT_SUCCESS_URL="http://localhost:3000/dashboard/billing/success"
CHECKOUT_CANCEL_URL="http://localhost:3000/dashboard/billing"
VITE_ENTERPRISE_DEMO_URL="https://calendly.com/your-team/demo"
VITE_POLAR_PRODUCT_CREDITS_50="prod_..."
VITE_POLAR_PRODUCT_CREDITS_100="prod_..."
VITE_POLAR_PRODUCT_PRO_MONTHLY="prod_..."
VITE_POLAR_PRODUCT_BUSINESS_MONTHLY="prod_..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Verificación de Email (deshabilitada por defecto)
# Control de verificación de email del lado del servidor
ENABLE_EMAIL_VERIFICATION="false"
# Control de verificación de email del lado del cliente (para decisiones de UI)
VITE_ENABLE_EMAIL_VERIFICATION="false"

# Configuración del Servicio de Email (Resend es el proveedor por defecto)
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="your-resend-api-key"

# Proveedores OAuth (opcional)
# Configuración OAuth del lado del servidor
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Configuración OAuth del lado del cliente (para botones de UI)
VITE_GITHUB_CLIENT_ID="your-github-client-id"
VITE_GOOGLE_CLIENT_ID="your-google-client-id"
```

- `VITE_BASE_URL` es opcional - en producción, usará automáticamente el dominio actual
- Para desarrollo local, por defecto es `http://localhost:3000`

### Configuración del Servicio de Email

La aplicación soporta **múltiples proveedores de email** para máxima flexibilidad. Puedes elegir entre registro en consola, Mailhog (para desarrollo local), SMTP o Resend según tus necesidades.

#### Opciones de Proveedores de Email

1. **Proveedor de Consola** (Por defecto para desarrollo)
   - Registra emails en la consola
   - Sin dependencias externas
   - Perfecto para desarrollo inicial

   ```bash
   EMAIL_PROVIDER="console"
   ```

2. **Mailhog** (Recomendado para desarrollo local)
   - Captura todos los emails localmente
   - Interfaz web para ver emails en http://localhost:8025
   - Ya incluido en Docker Compose

   ```bash
   EMAIL_PROVIDER="mailhog"
   # No requiere configuración adicional
   ```

   Iniciar Mailhog con Docker:
   ```bash
   docker-compose up -d mailhog
   ```

3. **Proveedor SMTP** (Para producción o servidores de email personalizados)
   ```bash
   EMAIL_PROVIDER="smtp"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. **Resend** (API de email moderna)
   ```bash
   EMAIL_PROVIDER="resend"
   RESEND_API_KEY="re_xxxxxxxxxxxx"
   ```

   - Regístrate en [resend.com](https://resend.com)
   - Crea una clave API en tu panel
   - Agrega y verifica tu dominio (para producción)

#### Configuración Común de Email

```bash
# Establecer la dirección "from" por defecto
EMAIL_FROM="noreply@yourdomain.com"

# Habilitar verificación de email (opcional)
ENABLE_EMAIL_VERIFICATION="true"
VITE_ENABLE_EMAIL_VERIFICATION="true"
```

#### Agregar Proveedores de Email Personalizados

El sistema de email está diseñado para ser extensible. Para agregar un nuevo proveedor:

1. **Crear una nueva clase de proveedor** en `src/server/email/providers.ts`:
   ```typescript
   export class MyCustomProvider implements EmailProvider {
     async sendEmail({ from, to, subject, html }) {
       // Tu implementación aquí
     }
   }
   ```

2. **Agregar el proveedor a la fábrica** en `src/server/email/index.ts`:
   ```typescript
   case "custom":
     emailProvider = new MyCustomProvider();
     break;
   ```

3. **Actualizar tus variables de entorno**:
   ```bash
   EMAIL_PROVIDER="custom"
   # Agregar cualquier configuración personalizada necesaria
   ```

#### Comportamiento de la Verificación de Email

**Cuando está deshabilitada** (por defecto):
- Los usuarios inician sesión automáticamente después del registro
- No se envía email de verificación
- Los usuarios son redirigidos directamente al panel

**Cuando está habilitada**:
- Los usuarios deben verificar su email antes de iniciar sesión
- Se envía un email de verificación tras el registro
- Los usuarios son redirigidos a una página de "verifica tu email"
- Los usuarios no pueden iniciar sesión hasta que su email sea verificado

### Configuración de Proveedores OAuth

La aplicación soporta autenticación OAuth con GitHub y Google. Aquí está cómo configurarlos:

#### Configuración de OAuth de GitHub

1. **Crear una App OAuth de GitHub:**
   - Ir a [Configuración de Desarrollador de GitHub](https://github.com/settings/developers)
   - Clic en "New OAuth App"
   - Completar los detalles de la aplicación:
     - **Nombre de la aplicación**: Nombre de tu app
     - **URL de la página principal**: `http://localhost:3000` (para desarrollo)
     - **URL de callback de autorización**: `http://localhost:3000/api/auth/callback/github`

2. **Obtener tus credenciales:**
   - Después de crear la app, copiar el **Client ID**
   - Generar un nuevo **Client Secret**

3. **Agregar a las variables de entorno:**
   ```bash
   # Configuración del lado del servidor
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # Configuración del lado del cliente (para botones de UI)
   VITE_GITHUB_CLIENT_ID="your-github-client-id"
   ```

4. **Para despliegue en producción:**
   - Actualizar la **URL de la página principal** a tu dominio de producción
   - Actualizar la **URL de callback de autorización** a `https://yourdomain.com/api/auth/callback/github`

#### Configuración de OAuth de Google

1. **Crear una App OAuth de Google:**
   - Ir a [Google Cloud Console](https://console.cloud.google.com/)
   - Crear un nuevo proyecto o seleccionar uno existente
   - Habilitar la API de Google+
   - Ir a "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configurar la pantalla de consentimiento OAuth:**
   - Completar la información requerida de la aplicación
   - Agregar tu dominio a los dominios autorizados

3. **Crear ID de Cliente OAuth 2.0:**
   - Tipo de aplicación: **Aplicación web**
   - **Orígenes JavaScript autorizados**: `http://localhost:3000` (para desarrollo)
   - **URIs de redireccionamiento autorizados**: `http://localhost:3000/api/auth/callback/google`

4. **Obtener tus credenciales:**
   - Copiar el **Client ID** y **Client Secret**

5. **Agregar a las variables de entorno:**
   ```bash
   # Configuración del lado del servidor
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Configuración del lado del cliente (para botones de UI)
   VITE_GOOGLE_CLIENT_ID="your-google-client-id"
   ```

6. **Para despliegue en producción:**
   - Actualizar orígenes autorizados a tu dominio de producción
   - Actualizar URI de redirección a `https://yourdomain.com/api/auth/callback/google`

#### Probar la Integración OAuth

Una vez configurado, los usuarios verán opciones de inicio de sesión con GitHub y Google en las páginas de autenticación. Los proveedores OAuth se habilitan condicionalmente basados en la presencia de sus respectivas variables de entorno.


## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contribuir

¡Damos la bienvenida a contribuciones! Por favor ver [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

## Enlaces

- X/Twitter: [@kregenrek](https://x.com/kregenrek)
- Bluesky: [@kevinkern.dev](https://bsky.app/profile/kevinkern.dev)

## Academia de IA y Cursos
- Aprende Cursor AI: [Curso Definitivo de Cursor](https://www.instructa.ai/en/cursor-ai)
- Aprende a construir software con IA: [instructa.ai](https://www.instructa.ai)

## Ve mis otros proyectos:

* [AI Prompts](https://github.com/instructa/ai-prompts/blob/main/README.md) - Prompts de IA curados para Cursor AI, Cline, Windsurf y Github Copilot
* [codefetch](https://github.com/regenrek/codefetch) - Convierte código en Markdown para LLMs con un simple comando de terminal
* [aidex](https://github.com/regenrek/aidex) - Herramienta CLI que proporciona información detallada sobre modelos de lenguaje de IA, ayudando a desarrolladores a elegir el modelo correcto para sus necesidades
