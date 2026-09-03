#!/usr/bin/env bash
# Build locally and upload the static site to the VPS.
#   ./deploy/deploy.sh deploy@VPS_IP
set -euo pipefail
TARGET="${1:?usage: deploy.sh user@host}"
cd "$(dirname "$0")/.."

npm ci
npm run build
rsync -av --delete dist/ "$TARGET:/var/www/mkado.dev/dist/"
echo "mkado.dev uploaded to $TARGET"
