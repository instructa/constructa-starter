#!/bin/bash
# Database restore script
# Usage: ./restore-db.sh /path/to/backup.sql.gz

set -euo pipefail

if [ $# -eq 0 ]; then
  echo "Usage: $0 /path/to/backup.sql.gz"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "ERROR: Backup file not found: ${BACKUP_FILE}"
  exit 1
fi

# ✅ SECURITY: Read DB credentials from environment
: "${DATABASE_URL:?DATABASE_URL not set}"

# Parse DATABASE_URL
DB_USER=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://([^:]+):.*|\1|')
DB_PASS=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^:]+:([^@]+)@.*|\1|')
DB_HOST=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^@]+@([^:]+):.*|\1|')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^@]+@[^:]+:([0-9]+)/.*|\1|')
DB_NAME=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^/]+/(.+)(\?.*)?$|\1|')

echo "⚠️  WARNING: This will DROP and recreate the database!"
echo "Database: ${DB_NAME}"
echo "Backup: ${BACKUP_FILE}"
read -p "Are you sure? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Restore cancelled."
  exit 0
fi

echo "[$(date)] Dropping database..."
PGPASSWORD="${DB_PASS}" psql \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d postgres \
  -c "DROP DATABASE IF EXISTS ${DB_NAME};"

echo "[$(date)] Creating database..."
PGPASSWORD="${DB_PASS}" psql \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d postgres \
  -c "CREATE DATABASE ${DB_NAME};"

echo "[$(date)] Restoring backup..."
gunzip < "${BACKUP_FILE}" | PGPASSWORD="${DB_PASS}" psql \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d "${DB_NAME}"

echo "[$(date)] Restore completed successfully!"
