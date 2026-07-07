#!/bin/bash

set -euo pipefail

# Charge les variables d'environnement
set -a
source /opt/cesizen/.env
set +a

BACKUP_DIR="/opt/backups/supabase"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Début du backup..."

pg_dump "$DIRECT_URL" \
  | gzip > "$BACKUP_DIR/supabase_${DATE}.sql.gz"

echo "[$(date)] Backup terminé."
 
find "$BACKUP_DIR" \
  -type f \
  -name "*.sql.gz" \
  -mtime +30 \
  -delete

echo "[$(date)] Nettoyage terminé."