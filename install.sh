#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/nexus-profile}"
REPO_URL="${REPO_URL:-}"

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || return 1
}

if ! need_cmd docker; then
  echo "[nexus-profile] Docker is required. Please install Docker first."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "[nexus-profile] Docker Compose plugin is required."
  exit 1
fi

mkdir -p "$PROJECT_DIR"

if [ -n "$REPO_URL" ] && need_cmd git; then
  if [ ! -d "$PROJECT_DIR/.git" ]; then
    git clone "$REPO_URL" "$PROJECT_DIR"
  else
    git -C "$PROJECT_DIR" pull --ff-only
  fi
else
  echo "[nexus-profile] Using current directory files. Set REPO_URL for remote install."
fi

cd "$PROJECT_DIR"
[ -f .env ] || cp .env.example .env
mkdir -p uploads

docker compose up -d --build

echo "[nexus-profile] Deployed."
echo "Frontend: http://127.0.0.1:10080"
echo "Backend:  http://127.0.0.1:10081/health"
