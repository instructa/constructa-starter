# Desarrollo Local

## Una sola vez

```bash
cp .env.example .env
pnpm install
pnpm run ex0 -- init   # instala deps, inicia servicios principales, ejecuta migraciones
```

Esto inicia **PostgreSQL**, **MinIO**, **Redis**, **Meilisearch**, y **Mailhog** bajo el perfil `dev`.

## Ejecutar la aplicación localmente

```bash
pnpm dev
```

Tu aplicación está en [http://localhost:3000](http://localhost:3000). El **worker** en segundo plano se ejecuta como un proceso separado si lo deseas (opcional):

```bash
pnpm worker
```

> El contenedor Docker `app` está reservado para auto-hospedaje/previews. En desarrollo, ejecuta el servidor Vite localmente para iteración más rápida.

## Webhooks reales en desarrollo

* **Ngrok**: `ngrok http 3000` — pega la URL de reenvío (ej. `https://xyz.ngrok-free.app/api/webhook/polar`) en el panel de Polar.
* **Cloudflare Tunnel (opcional)**: Coloca tu token de túnel en `.env` como `CLOUDFLARED_TUNNEL_TOKEN`, luego:

```bash
docker compose --profile tunnel up -d cloudflared
```

> Los documentos de Polar recomiendan ngrok; Cloudflare Tunnel es una alternativa robusta con Zero Trust. Configura el que prefieras.

## Emails

Interfaz de Mailhog: [http://localhost:8025](http://localhost:8025) (SMTP en `mailhog:1025`).

## Búsqueda

* API de Meilisearch: `MEILI_HOST=http://localhost:7700`
* Sembrar o reconstruir el índice:

```bash
pnpm run search:sync
```

## Trabajos en segundo plano

* Cola: Redis (`REDIS_URL=redis://localhost:6379`)
* La recarga diaria de créditos está programada a las 03:00 UTC vía BullMQ. Llama a tu endpoint existente `routes/api/jobs/daily-credit-refill`.
* Puedes ejecutar el worker localmente:

```bash
pnpm worker
```

### Worker ↔ Endpoint de la App en desarrollo

# Por defecto `JOB_DAILY_CREDIT_REFILL_URL=http://localhost:3000/api/jobs/daily-credit-refill`. Cuando ejecutas el worker dentro de Docker, también puede alcanzar el host vía `http://host.docker.internal:3000`.

```
