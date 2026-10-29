#!/bin/bash
# Sauvegarde quotidienne de J&B SANIYAPUR : base PostgreSQL + images (media).
# Usage : /var/www/saniyapur/scripts/backup.sh   (lancé chaque nuit par cron)
# Les sauvegardes sont rangées dans /root/backups et conservées 14 jours.
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/root/backups}"
KEEP_DAYS="${KEEP_DAYS:-14}"
STAMP="$(date +%Y-%m-%d_%H%M)"

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

DB_FILE="$BACKUP_DIR/db_$STAMP.sql.gz"
MEDIA_FILE="$BACKUP_DIR/media_$STAMP.tar.gz"

# Écriture dans un fichier temporaire : une sauvegarde interrompue ne remplace jamais une bonne.
docker exec saniyapur_db sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > "$DB_FILE.part"
gzip -t "$DB_FILE.part"
mv "$DB_FILE.part" "$DB_FILE"

docker cp saniyapur_backend:/app/media - | gzip > "$MEDIA_FILE.part"
gzip -t "$MEDIA_FILE.part"
mv "$MEDIA_FILE.part" "$MEDIA_FILE"

find "$BACKUP_DIR" -maxdepth 1 -type f \( -name 'db_*.sql.gz' -o -name 'media_*.tar.gz' \) -mtime +"$KEEP_DAYS" -delete

echo "$(date '+%F %T') OK  $(basename "$DB_FILE") ($(du -h "$DB_FILE" | cut -f1))  $(basename "$MEDIA_FILE") ($(du -h "$MEDIA_FILE" | cut -f1))"
