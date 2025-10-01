#!/bin/bash
# Database backup script for PostgreSQL
# Run via cron: 0 2 * * * /opt/constructa/backup-db.sh

set -euo pipefail

# Configuration
BACKUP_DIR="/opt/constructa/backups"
RETENTION_DAYS=7
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

# ✅ SECURITY: Read DB credentials from environment
: "${DATABASE_URL:?DATABASE_URL not set}"

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Parse DATABASE_URL (postgresql://user:pass@host:port/dbname)
DB_USER=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://([^:]+):.*|\1|')
DB_PASS=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^:]+:([^@]+)@.*|\1|')
DB_HOST=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^@]+@([^:]+):.*|\1|')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^@]+@[^:]+:([0-9]+)/.*|\1|')
DB_NAME=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^/]+/(.+)(\?.*)?$|\1|')

# Create backup
echo "[$(date)] Starting backup of database: ${DB_NAME}"
PGPASSWORD="${DB_PASS}" pg_dump \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  --no-owner \
  --no-acl \
  | gzip > "${BACKUP_FILE}"

if [ -f "${BACKUP_FILE}" ]; then
  SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
  echo "[$(date)] Backup completed: ${BACKUP_FILE} (${SIZE})"
  
  # Set restrictive permissions
  chmod 600 "${BACKUP_FILE}"
  
  # Delete backups older than retention period
  find "${BACKUP_DIR}" -name "db_backup_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete
  echo "[$(date)] Cleaned up backups older than ${RETENTION_DAYS} days"
else
  echo "[$(date)] ERROR: Backup failed - file not created"
  exit 1
fi
