#!/usr/bin/env bash
# Nightly dumps for this box, installed by ../../deploy.sh mkado.dev --nginx to
# /usr/local/bin/mkado-backup.sh and run by cron at 02:30 UTC.
#
# What it writes into /var/backups/mkado, each kept 30 days:
#   mariadb-<date>.sql.gz   every MariaDB database except staging
#   jobs-<date>.sql.gz      the live registration database on its own
#   postgres-<date>.sql.gz  every PostgreSQL database
#   chatwoot-<date>.sql.gz  Chatwoot's own PostgreSQL (Docker, crm.mkado.dev)
#   chatwoot-storage-<date>.tar.gz  Chatwoot attachments (stays on this machine)
#   secrets-<date>.tar.gz   the env files holding the keys (root-only, stays here)
#
# The *.sql.gz files are also copied to Google Drive when the rclone remote
# "gdrive" is configured for root (ORACLE-SETUP.md, off-site backups), and kept
# 30 days there as well. The secrets snapshot deliberately never leaves the
# machine: every personal column in `jobs` is encrypted, and a key sitting in the
# same Drive folder as the ciphertext would undo that in one step.
set -uo pipefail

DIR=/var/backups/mkado
KEEP_DAYS=30
STAMP=$(date -u +%F)
mkdir -p "$DIR"

# Staging is left out on purpose: jobs_dev holds test rows that are written and
# deleted all day, and restoring them would never be the right thing to do.
mariadb-dump --all-databases --ignore-database=jobs_dev --single-transaction --quick \
  | gzip > "$DIR/mariadb-$STAMP.sql.gz"

# The registration database on its own, so putting it back is one command:
#   zcat /var/backups/mkado/jobs-<date>.sql.gz | sudo mariadb
mariadb-dump --databases jobs --single-transaction --quick | gzip > "$DIR/jobs-$STAMP.sql.gz"

sudo -u postgres pg_dumpall | gzip > "$DIR/postgres-$STAMP.sql.gz"

# Chatwoot (crm.mkado.dev) runs its own PostgreSQL inside Docker, so pg_dumpall
# above never sees it. Dump through the container, and pack the attachments
# volume next to it. Skipped while the stack is not running.
CW=/opt/chatwoot/docker-compose.yml
if [ -f "$CW" ] && docker compose -f "$CW" ps --status running --services 2>/dev/null | grep -qx postgres; then
  docker compose -f "$CW" exec -T postgres pg_dump -U postgres -d chatwoot </dev/null     | gzip > "$DIR/chatwoot-$STAMP.sql.gz"
  tar -czf "$DIR/chatwoot-storage-$STAMP.tar.gz" -C /var/lib/docker/volumes/chatwoot_storage_data/_data . 2>/dev/null
  chmod 600 "$DIR/chatwoot-storage-$STAMP.tar.gz"
fi

# A dump of `jobs` without CRYPTO_KEY and INDEX_KEY is unreadable ciphertext, so
# the keys are worth as much as the rows. Root-only, and never copied off-site.
# Chatwoot's SECRET_KEY_BASE signs its tokens; without it a restored dump logs everyone out.
tar -czf "$DIR/secrets-$STAMP.tar.gz" -C / etc/jobs/jobs.env etc/mkado/contact.env opt/chatwoot/.env 2>/dev/null
chmod 600 "$DIR/secrets-$STAMP.tar.gz"

find "$DIR" -name '*.sql.gz' -mtime +$KEEP_DAYS -delete
find "$DIR" -name 'secrets-*.tar.gz' -mtime +$KEEP_DAYS -delete
find "$DIR" -name 'chatwoot-storage-*.tar.gz' -mtime +$KEEP_DAYS -delete

# One line a night, so a job that quietly stopped working can be noticed.
echo "$(date -u +%FT%TZ) local ok: $(ls -1 "$DIR"/*-"$STAMP".* 2>/dev/null | wc -l) written today, $(ls -1 "$DIR" | wc -l) kept, $(du -sh "$DIR" | cut -f1) on disk"

# Off-site copy: skipped (silently) until `rclone config create gdrive drive ...` has been run as root.
# --include '*.sql.gz' is what keeps secrets-*.tar.gz on this machine.
if rclone listremotes 2>/dev/null | grep -qx 'gdrive:'; then
  if rclone copy "$DIR" gdrive:mkado-backups --include '*.sql.gz' --quiet; then
    rclone delete gdrive:mkado-backups --min-age 30d --quiet
    echo "$(date -u +%FT%TZ) offsite ok: $(rclone size gdrive:mkado-backups 2>/dev/null | tr '\n' ' ')"
  else
    echo "$(date -u +%FT%TZ) offsite FAILED (rclone copy)"
  fi
fi
