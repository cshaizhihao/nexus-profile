#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/home/web/html/nexus-profile}"
PID_FILE="$PROJECT_DIR/backend/.nexus-profile-backend.pid"
LOG_FILE="$PROJECT_DIR/backend/.nexus-profile-backend.log"

cd "$PROJECT_DIR"
npm --prefix backend run build
npm --prefix frontend run build

mkdir -p "$WEB_ROOT"
rm -rf "$WEB_ROOT"/*
cp -a frontend/dist/. "$WEB_ROOT"/

cd "$PROJECT_DIR/backend"
cp -n .env.example .env || true
npx prisma generate
npx prisma db push

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  kill "$(cat "$PID_FILE")" || true
  sleep 1
fi

PORT=10081 UPLOAD_DIR="$PROJECT_DIR/uploads" nohup node dist/main.js > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

echo "Nexus Profile production deployed."
echo "Frontend root: $WEB_ROOT"
echo "Backend PID: $(cat "$PID_FILE")"
echo "Backend log: $LOG_FILE"
