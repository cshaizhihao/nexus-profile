# Nexus Profile / 星枢主页

A modern, minimal, front-end/back-end separated personal homepage and navigation CMS.

Repository: <https://github.com/cshaizhihao/nexus-profile>

> Status: Phase 0/1 scaffold in progress. Preview screenshots will be added after the first visual milestone.

## Features

- Vue 3 + Vite + TypeScript frontend
- Vue Router based multi-page structure, no one-page waterfall layout
- Fastify + Prisma backend API
- CMS-ready site configuration, navigation categories, links and asset upload model
- Custom CSS injection support planned
- Local icon upload and external icon URL support planned
- Docker Compose deployment
- VPS one-command install script

## Preview

![Preview placeholder](./docs/preview-placeholder.svg)

## Default Ports

- Frontend: <http://127.0.0.1:10080>
- Backend API: <http://127.0.0.1:10081>

## Development

```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Docker Deployment

```bash
cp .env.example .env
docker compose up -d --build
```

## VPS One-command Install

```bash
bash install.sh
```

## Project State

See [PROJECT_STATE.md](./PROJECT_STATE.md) for progress, completed tasks, todo list and environment notes.
