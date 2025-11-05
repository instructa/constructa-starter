# Hospedaje en Hetzner con Dokku

Esta guía te proporciona un despliegue **limpio y reproducible**:

- **Terraform** provisiona un VPS Debian 13 con Docker y Dokku
- **Compose (solo servidor)** ejecuta **Postgres, MinIO, Redis, Meilisearch, Worker**
- **Dokku** ejecuta la **aplicación web**; alcanza los servicios vía `host.docker.internal`
- **Let's Encrypt** manejado por Dokku

---

## 1) Provisionar el servidor

```bash
cd infra/hetzner
export TF_VAR_hcloud_token=YOUR_HETZNER_TOKEN
terraform init && terraform apply
````

Esto instala:

* Docker Engine
* Dokku v0.36.7
* Usuario `deploy` sin root con tu clave SSH
* Firewall UFW (SSH/HTTP/HTTPS)

## 1.5) Bootstrap con Ansible (recomendado)

La automatización vive en `infra/ansible/`. Sincroniza el bundle de compose, renderiza `/opt/constructa/.env`, inicia los servicios y configura Dokku para apuntar a ellos.

```bash
# instalar colecciones galaxy de Ansible localmente
ansible-galaxy collection install -r infra/ansible/requirements.yml

# copiar + editar secretos (mantenidos localmente)
cp infra/ansible/group_vars/constructa/vars.example.yml infra/ansible/group_vars/constructa/vars.yml
$EDITOR infra/ansible/group_vars/constructa/vars.yml

# actualizar inventario con tu host/IP
$EDITOR infra/ansible/inventory/hosts.ini

# ejecutar después de que terraform apply se complete
ansible-playbook -i infra/ansible/inventory/hosts.ini infra/ansible/site.yml
```

Lo que hace el playbook:

* sincroniza `infra/deploy/` en `/opt/constructa`
* escribe `/opt/constructa/.env` desde tu archivo de variables
* inicia Postgres/MinIO/Redis/Meilisearch + worker vía compose
* ejecuta aprovisionamiento de buckets + `pnpm run db:migrate`
* asegura que la app Dokku existe y apunta a `host.docker.internal`
* provisiona un archivo swap (`constructa_swap_file` / `constructa_swap_size`) para que las compilaciones Docker tengan suficiente memoria
* instala el plugin **dokku-redirect** y agrega redirecciones 301 para cualquier `constructa_redirect_domains`
* instala el plugin **dokku-letsencrypt**, establece `DOKKU_LETSENCRYPT_EMAIL`, habilita certificados y programa renovaciones cuando se proporciona `constructa_letsencrypt_email`
* si estás usando Dokku-first, establece `HOST_BIND_ADDR=0.0.0.0` para que los
  contenedores Dokku puedan alcanzar los servicios compose vía el gateway del host

---

## Dokku-first (recomendado, sin registro)

Usa esto si no quieres un registro en absoluto.

**Primera ejecución:**

1. Ejecuta el playbook una vez (la BD principal/almacenamiento de objetos/búsqueda se inician; el worker compose permanece inactivo hasta que lo apuntes a una imagen real).
2. **Despliega una vez** para que Dokku construya la imagen localmente:

   ```bash
   pnpm run ex0 -- deploy --env dev --ref <main-or-sha>
   # o --env prod
   ```

   Dokku produce `dokku/constructa:latest`.
3. Apunta Compose a esa imagen local y re-ejecuta Ansible:

   ```yml
   # en vars.yml bajo constructa_compose_env
   APP_IMAGE: "dokku/constructa"
   APP_TAG: "latest"
   ```

   Deja `constructa_run_compose_migrate` en su valor por defecto `false`; Dokku ya ejecuta migraciones durante el despliegue. Re-ejecuta el playbook y (re)iniciará el worker usando la **imagen local de Dokku**—sin necesidad de push/pull del registro. El playbook también refrescará las redirecciones y certificados LetsEncrypt después de que la nueva configuración de dominio esté en su lugar.

¿Necesitas omitir completamente el paso de compilación de Dokku? Construye y envía la imagen desde tu laptop en una línea:

```bash
pnpm run ex0 -- deploy-image --env dev
```

Este comando ejecuta `docker build`, transmite la imagen por SSH y ejecuta `dokku git:from-image` bajo el capó (cambia `--env dev` por `--env prod` según sea necesario, y agrega `--tag my-tag` si quieres un tag diferente).

---

## 2) DNS

Apunta tu dominio de la app (ej. `app.example.com`) a la IP del servidor (un registro A proxied de Cloudflare está bien). Si quieres que `www.` redirija 301 al apex, listalo en `constructa_redirect_domains` y re-ejecuta el playbook.

## 3) Iniciar servicios principales (Compose en el servidor)

> Estos se ejecutan localmente en el VPS y se vinculan solo a **127.0.0.1**.

> Si ejecutaste el playbook Ansible en el paso 1.5, los comandos a continuación ya fueron ejecutados. Mantenlos para referencia o cuando te recuperes manualmente.

```bash
# Copiar el bundle de infra; o deja que la Acción de GH lo haga
scp -r infra/deploy/* deploy@your.server:/opt/constructa

ssh deploy@your.server
cd /opt/constructa
cp .env.sample .env  # completar valores
# Para Dokku-first, establece HOST_BIND_ADDR=0.0.0.0 para que la app Dokku alcance los servicios

# Iniciar Postgres, MinIO (+provisionar bucket), Redis, Meilisearch
docker compose -f compose.yml up -d db minio redis meilisearch
docker compose -f compose.yml up provision-minio || true

# Iniciar worker en segundo plano (las migraciones se ejecutan durante el despliegue Dokku)
docker compose -f compose.yml up -d worker
```

**¿Por qué este diseño?** Evita la variación de plugins para Postgres/MinIO en Dokku y te da una ruta estable para persistencia de datos a través de reinicios del servidor.

> **Importante:** Este proyecto **no** usa los addons de Postgres/Redis de Dokku. La base de datos, caché, almacenamiento de objetos, etc. todos se ejecutan dentro del stack de compose arriba. Siempre mantén ese stack ejecutándose antes de desplegar; de lo contrario Dokku recurrirá a recursos provisionados por plugins que carecen de extensiones requeridas como `pgvector`.

## 4) Crear la app Dokku

> Si ejecutaste el playbook Ansible en el paso 1.5, Dokku ya ha sido configurado con la app, dominios, plugin de redirección, LetsEncrypt y opciones docker. Usa esta sección solo para bootstrap manual o recuperación ante desastres.

```bash
# creación única de app
ssh root@your.server "dokku apps:create constructa"

# dominio, enrutamiento http, y mapeo de host para alcanzar servicios compose
ssh root@your.server "dokku domains:set constructa app.example.com"
ssh root@your.server "dokku proxy:ports-set constructa http:80:5000"
ssh root@your.server \"dokku docker-options:add constructa deploy,run '--add-host=host.docker.internal:host-gateway'\"
```

Ahora establece la configuración requerida. El detalle clave: **apunta a tus servicios loopback** (si omites esto, Dokku intentará usar su base de datos addon, que no incluye `pgvector` y tus migraciones fallarán):

```bash
ssh root@your.server "dokku config:set constructa \
  NODE_ENV=production PORT=5000 \
  DATABASE_URL='postgresql://user:password@host.docker.internal:5432/ex0' \
  S3_ENDPOINT='http://host.docker.internal:9000' S3_REGION='us-east-1' \
  S3_ACCESS_KEY_ID='minioadmin' S3_SECRET_ACCESS_KEY='minioadmin' \
  S3_BUCKET='constructa-files' S3_ENABLE_PATH_STYLE=1 S3_PREVIEW_URL_EXPIRE_IN=7200 \
  MEILI_HOST='http://host.docker.internal:7700' MEILI_API_KEY='changeme-master-key' \
  REDIS_URL='redis://host.docker.internal:6379'"
```

Habilitar HTTPS:

```bash
ssh root@your.server "dokku letsencrypt:enable constructa"
```

(Con Ansible, establece `constructa_letsencrypt_email` en tu archivo vars y el playbook manejará la instalación del plugin, emisión del certificado y el trabajo cron de renovación.)

## 5) Desplegar la app

### Opción A – Simple: push desde tu laptop

```bash
git remote add dokku-prod dokku@your.server:constructa
pnpm run ex0 -- deploy --env prod
```

### Opción B – CI/CD (GHCR): ver **docs/es/constructa/cicd.md** para login de registro y tags.

---

## Operaciones Comunes

```bash
# Logs
ssh root@your.server "dokku logs constructa -t"

# Escalar (solo web, worker es manejado por compose)
ssh root@your.server "dokku ps:scale constructa web=1"

# Reconstruir
ssh root@your.server "dokku ps:rebuild constructa"

# Rotar certificados
ssh root@your.server "dokku letsencrypt:force-renew constructa"

# Limpieza de disco (bajo demanda, seguro)
pnpm run ex0 -- gc --age 720h   # podar imágenes/caché sin usar más antiguas que 30 días
```

### ¿Por qué `host.docker.internal`?

Los contenedores Dokku viven en la red **dokku**, pero tus servicios viven en la red **compose**. Mapear `host.docker.internal` al gateway del host Linux permite que los contenedores de la app hablen con servicios publicados en loopback (`127.0.0.1:…`). Establecemos eso con:

```bash
dokku docker-options:add constructa deploy,run "--add-host=host.docker.internal:host-gateway"
```
