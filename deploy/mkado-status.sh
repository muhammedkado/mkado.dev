#!/usr/bin/env bash
# mkado-status.sh — probes every demo and writes status.json for the portfolio's
# status board. Installed to /usr/local/bin and run by cron every 5 minutes as
# `ubuntu` (see deploy/deploy.sh --nginx / ORACLE-SETUP.md §9).
#
# Output: /var/www/mkado.dev/status/status.json, served by nginx as
# https://mkado.dev/status.json (location = /status.json, no-cache). The file
# lives OUTSIDE dist/ on purpose: the deploy swaps dist/ wholesale.
#
# Shape: {"checkedAt":"2026-09-05T10:15:03Z",
#         "apps":{"pos":{"ok":true,"code":200,"ms":183}, …}}
#
# Two-strike rule: an app is reported down only when two consecutive probes
# fail. The nightly `migrate:fresh --seed` makes /health fail for a few seconds,
# and a single blip must not flip the board.
set -uo pipefail

DIR=/var/www/mkado.dev/status
RAW=$DIR/raw.json          # last probe results, for the two-strike rule
OUT=$DIR/status.json

declare -A URL=(
  [pos]=https://pos.mkado.dev/health
  [invoice]=https://invoice.mkado.dev/health.php
  [findjob]=https://findjob.mkado.dev/health
  [besttrend-api]=https://besttrend-api.mkado.dev/health
  [besttrend]=https://besttrend.mkado.dev/
  [tireshop]=https://tireshop.mkado.dev/
  [timezone]=https://timezone.mkado.dev/
)

mkdir -p "$DIR"

results=""
for slug in "${!URL[@]}"; do
  # code + total time; 000 on timeout/connection failure
  read -r code secs < <(curl -sS -o /dev/null -m 8 -A 'mkado-status/1' -w '%{http_code} %{time_total}' "${URL[$slug]}" 2>/dev/null || echo "000 0")
  results+="$slug $code $secs"$'\n'
done

RESULTS="$results" python3 - "$RAW" "$OUT" <<'PY'
import json, sys, os, datetime, tempfile
raw_path, out_path = sys.argv[1], sys.argv[2]
lines = [l.split() for l in os.environ.get('RESULTS', '').strip().splitlines() if l.strip()]
try:
    prev = json.load(open(raw_path))
except Exception:
    prev = {}
now = {slug: int(code) for slug, code, _ in lines}
apps = {}
for slug, code, secs in lines:
    code = int(code)
    healthy_now = code == 200
    healthy_prev = prev.get(slug, 200) == 200
    apps[slug] = {"ok": healthy_now or healthy_prev, "code": code, "ms": int(float(secs) * 1000)}
doc = {"checkedAt": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "apps": dict(sorted(apps.items()))}
for path, data in ((raw_path, now), (out_path, doc)):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path), prefix=".tmp-")
    with os.fdopen(fd, "w") as f:
        json.dump(data, f, separators=(",", ":"))
    os.chmod(tmp, 0o644)
    os.replace(tmp, path)      # atomic: readers never see a half-written file
down = [s for s, a in doc["apps"].items() if not a["ok"]]
print(doc["checkedAt"], "down:" + (",".join(down) if down else "none"))
PY
