#!/usr/bin/env bash
# mkado.dev — build on the workstation, upload the static output.
#
# The server has no Node, so the Astro build happens here and only dist/
# travels, over the `mkado` ssh alias from ~/.ssh/config. The upload lands in
# dist.new and is then swapped in, so the site never serves a half-copied tree.
# Usually run through deploy.sh in the mkado-dev workspace (./deploy.sh mkado.dev),
# but it works on its own too:  bash deploy/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."
[ -d node_modules ] || npm install --no-audit --no-fund
npm run build
tar -czf - -C dist . | ssh mkado 'set -e
  R=/var/www/mkado.dev
  sudo rm -rf "$R/dist.new" && sudo mkdir -p "$R/dist.new"
  sudo tar -xzf - -C "$R/dist.new"
  sudo chown -R ubuntu:www-data "$R/dist.new"
  sudo rm -rf "$R/dist.old"
  [ -d "$R/dist" ] && sudo mv "$R/dist" "$R/dist.old"
  sudo mv "$R/dist.new" "$R/dist"
  sudo rm -rf "$R/dist.old"'
echo "mkado.dev: uploaded $(git rev-parse --short HEAD) — $(git log -1 --format=%s | cut -c1-70)"
