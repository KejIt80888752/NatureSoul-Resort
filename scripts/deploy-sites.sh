#!/usr/bin/env bash
# Builds and publishes both sites.
#
#   ./scripts/deploy-sites.sh                         → demo mode (no backend)
#   ./scripts/deploy-sites.sh https://api.onrender.com → live mode, talking to the API
#
# Website   → KejIt80888752/NatureSoul-Resort   (gh-pages)
# Dashboard → KejIt80888752/NatureSoul-Dashboard (gh-pages)

set -euo pipefail

API_URL="${1:-}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

cd "$ROOT"

if [ -n "$API_URL" ]; then
  echo "▸ Building against API: $API_URL"
else
  echo "▸ Building in demo mode (no API)"
fi

export VITE_API_URL="$API_URL"

echo "▸ Building website..."
npm run build >/dev/null
cp dist/index.html dist/404.html
touch dist/.nojekyll

echo "▸ Building dashboard..."
npm run build:dashboard >/dev/null
mv dist-dashboard/dashboard.html dist-dashboard/index.html
cp dist-dashboard/index.html dist-dashboard/404.html
touch dist-dashboard/.nojekyll

publish() {
  local src="$1" repo="$2" label="$3"
  echo "▸ Publishing $label → $repo"

  rm -rf "$WORK/$label"
  cp -R "$src" "$WORK/$label"
  cd "$WORK/$label"

  git init -q -b gh-pages
  git add -A
  git -c user.email="sr5049011@gmail.com" -c user.name="KejIt80888752" \
      commit -q -m "Deploy $label"
  git remote add origin "https://github.com/$repo.git"
  git -c credential.helper='!gh auth git-credential' push -f -q origin gh-pages

  cd "$ROOT"
}

publish "$ROOT/dist"           "KejIt80888752/NatureSoul-Resort"    "website"
publish "$ROOT/dist-dashboard" "KejIt80888752/NatureSoul-Dashboard" "dashboard"

echo
echo "Done."
echo "  Website   : https://kejit80888752.github.io/NatureSoul-Resort/"
echo "  Dashboard : https://kejit80888752.github.io/NatureSoul-Dashboard/"
echo "GitHub Pages takes about a minute to serve the new build."
