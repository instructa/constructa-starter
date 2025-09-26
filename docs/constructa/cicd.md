# CI/CD (GitHub → GHCR → Coolify)

## Overview

* **Build**: On each push to `main`, we build and push `ghcr.io/<owner>/<repo>/app:<sha>` and `:latest`.
* **Deploy**: Manually trigger **Deploy** workflow and choose **dev** or **prod**. The workflow calls Coolify’s `/deploy?uuid=&tag=` API to deploy that image tag to the selected environment.

## Setup

1. In your GitHub repo → *Settings → Environments* create two environments: **dev** and **prod**.
2. Add these **Environment Secrets** on each environment:

   * `COOLIFY_URL` — e.g. `https://coolify.yourdomain.com/api`
   * `COOLIFY_TOKEN` — Coolify API token
   * `COOLIFY_SERVICE_UUID` — the UUID of your Coolify resource (web app or a compose resource)
3. Push to `main` to build the image.
4. Run **Actions → deploy → Run workflow**, pick **dev** or **prod** and (optionally) enter a tag (defaults to the current commit SHA).

## Notes

* You can create separate Coolify resources for **web** and **worker**, each with its own UUID and a second Deploy workflow if you want to deploy them independently.
* The Deploy workflow supports `force=true` for cache-busting rebuilds.