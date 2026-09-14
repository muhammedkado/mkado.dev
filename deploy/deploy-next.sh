#!/usr/bin/env bash
# mkado.dev preview — build on the workstation, upload to the preview host.
#
# Same shape as deploy/deploy.sh, but the output lands in /var/www/mkado.dev/next,
# which deploy/nginx-next.conf serves as https://next.mkado.dev/ (noindex). Use it
# to look at a redesign on a real phone before it goes to mkado.dev.
#   bash deploy/deploy-next.sh
set -euo pipefail
cd "$(dirname "$0")/.."
[ -d node_modules ] || npm install --no-audit --no-fund
npm run build
tar -czf - -C dist . | ssh mkado 'set -e
  R=/var/www/mkado.dev
  sudo rm -rf "$R/next.new" && sudo mkdir -p "$R/next.new"
  sudo tar -xzf - -C "$R/next.new"
  sudo chown -R ubuntu:www-data "$R/next.new"
  sudo rm -rf "$R/next.old"
  [ -d "$R/next" ] && sudo mv "$R/next" "$R/next.old"
  sudo mv "$R/next.new" "$R/next"
  sudo rm -rf "$R/next.old"'
echo "next.mkado.dev: uploaded $(git rev-parse --short HEAD) — $(git log -1 --format=%s | cut -c1-70)"
