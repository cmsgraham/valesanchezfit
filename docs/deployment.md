# Deployment Guide

## Prerequisites on the Linux server

- Docker Engine 24+
- Docker Compose v2 (`docker compose` not `docker-compose`)
- Git

## First-time setup

```bash
# 1. Clone the repo
git clone git@github.com:cmsgraham/valesanchezfit.git
cd valesanchezfit

# 2. Create your production env file
cp .env.production.example .env
# Edit .env — at minimum set DB_PASSWORD, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL

# 3. Build and start (migrations run automatically on startup)
docker compose up -d --build
```

The app will be available on **port 3000**. Point your reverse proxy (nginx/Caddy) to it.

## Updating to a new version

```bash
git pull origin main
docker compose up -d --build
```

Docker Compose will rebuild the image, stop the old container, and start the new one. Migrations run automatically before the server starts.

## Useful commands

```bash
# View live logs
docker compose logs -f app

# View database logs
docker compose logs -f db

# Open a shell inside the running app container
docker compose exec app sh

# Run a one-off Payload migration manually
docker compose exec app pnpm migrate

# Stop everything (keeps data volumes)
docker compose down

# Stop everything AND wipe the database (destructive!)
docker compose down -v
```

## Volumes

| Volume | What's inside |
|--------|--------------|
| `postgres_data` | PostgreSQL database files |
| `media_data` | Uploaded images/videos (mounted at `/app/media`) |

Back these up regularly. On most Linux servers:
```bash
# Backup media uploads
docker run --rm -v valesanchezfit_media_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/media-backup-$(date +%Y%m%d).tar.gz -C /data .

# Backup the database
docker compose exec db pg_dump -U postgres valesanchez_fit > backup-$(date +%Y%m%d).sql
```

## Reverse proxy (nginx example)

```nginx
server {
    listen 80;
    server_name valesanchez.fit www.valesanchez.fit;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name valesanchez.fit www.valesanchez.fit;

    ssl_certificate     /etc/letsencrypt/live/valesanchez.fit/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/valesanchez.fit/privkey.pem;

    client_max_body_size 50M;  # allow large media uploads

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Build notes

- The Docker image is built with `pnpm` using the frozen lockfile (`pnpm-lock.yaml`)
- `PAYLOAD_SECRET` must be provided as a build arg **and** as a runtime env var
- Database migrations run automatically inside `scripts/docker-start.sh` before the server starts
- The `media/` directory is a Docker volume — it persists across container restarts and rebuilds
