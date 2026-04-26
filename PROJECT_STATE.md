# PROJECT_STATE.md

## Project

- Name: Nexus Profile / 星枢主页
- Concept: Modern, minimal, self-display oriented personal homepage and navigation CMS
- Architecture: Frontend/backend separated
- Repository directory: `/root/.openclaw/workspace/nexus-profile`
- GitHub repository: `https://github.com/cshaizhihao/nexus-profile`

## Tech Stack

### Frontend

- Vue 3
- Vite
- TypeScript
- Vue Router
- Pinia
- Tailwind CSS

### Backend

- Node.js
- Fastify
- Prisma
- SQLite by default
- PostgreSQL optional in Docker-oriented future extension

### Deployment

- Docker Compose
- Bash one-command installer for VPS

## Port Plan

- Frontend: `10080`
- Backend API: `10081`

## Completed

- [x] Confirmed project name: `Nexus Profile / 星枢主页`
- [x] Confirmed stack: Vue 3 + Fastify + Prisma + Tailwind CSS
- [x] Created initial directory structure
- [x] Created README.md
- [x] Created PROJECT_STATE.md
- [x] Created baseline Docker Compose plan
- [x] Created baseline VPS install script
- [x] Created frontend Vue Router multi-page scaffold
- [x] Created backend Fastify API scaffold
- [x] Created Prisma schema for site config, navigation and assets
- [x] Confirmed local ports `10080` and `10081` are free
- [x] Installed frontend dependencies
- [x] Installed backend dependencies
- [x] Fixed Prisma compatibility by pinning Prisma to v6 line
- [x] Generated Prisma client and initialized SQLite database
- [x] Added frontend TypeScript/Vite configuration
- [x] Validated frontend production build
- [x] Validated backend TypeScript build
- [x] Started local frontend/backend preview
- [x] Validated backend health endpoint
- [x] Created GitHub repository
- [x] Pushed local `main` branch to GitHub

## In Progress

- [x] Implemented CMS edit forms for site config, categories and links
- [x] Wired homepage and navigation page to backend API
- [x] Added frontend API client and Pinia site store
- [x] Validated backend/frontend builds after CMS wiring
- [x] Added asset upload endpoint and static uploads serving
- [x] Added avatar/icon upload controls in CMS
- [x] Added category/link edit mode in CMS
- [x] Enabled custom CSS injection on frontend

## Todo

### Frontend

- [ ] Build polished minimal homepage
- [ ] Build navigation page with multi-level categories
- [ ] Build about page
- [ ] Build admin layout
- [ ] Add theme tokens and restrained page transitions

### Backend/CMS

- [x] Implement site config CRUD
- [x] Implement navigation category CRUD
- [x] Implement navigation link CRUD
- [x] Implement icon upload endpoint
- [x] Add custom CSS persistence field and API path

### Deployment

- [ ] Validate docker-compose build
- [ ] Validate install.sh on fresh VPS-like environment
- [ ] Add `.env.example`

### Open Source Polish

- [ ] Add screenshots
- [ ] Add license
- [ ] Add contribution notes

## Environment Notes

- Target local frontend preview: `http://127.0.0.1:10080`
- Target backend API: `http://127.0.0.1:10081`
- Public no-port preview through existing Nginx default server: `http://208.115.216.131/`
- Public API through existing Nginx default server: `http://208.115.216.131/api/site-config`
- Production static root: `/home/web/html/nexus-profile`
- Production backend: built Node process on `127.0.0.1:10081`
- Avoid single-page long-scroll design; route/module separation is mandatory.

## Update Log

### 2026-04-26

- Initialized project planning and scaffold.
- Locked first product identity as `Nexus Profile / 星枢主页`.
- Created initial frontend/backend/deployment/documentation structure.
- Confirmed reason for previous short reply: long command was blocked by approval policy; switched to granular file writes.
- Installed dependencies and fixed Prisma v7 incompatibility by pinning Prisma v6.
- Started local preview:
  - Frontend: `http://127.0.0.1:10080/`
  - Backend: `http://127.0.0.1:10081/health`
- Created Git commits:
  - `438305f chore: initialize nexus profile project structure`
  - `4884106 fix: stabilize scaffold build and local preview`
- Created and pushed GitHub repository: `https://github.com/cshaizhihao/nexus-profile`
- Implemented Phase 2 CMS wiring:
  - Admin site config form
  - Admin navigation category creation/deletion
  - Admin navigation link creation/deletion
  - Frontend API client + Pinia store
  - Homepage and navigation page now read from backend API
- Fixed public access issue:
  - Existing Docker Nginx default server was returning `444` for direct IP access.
  - Reconfigured `/home/web/conf.d/default.conf` to proxy direct IP access to frontend `10080` and `/api/` to backend `10081`.
  - Changed frontend API base to relative path and added Vite `/api` proxy for dev mode.

### 2026-04-26 Phase 3

- Added local image upload endpoint: `POST /api/uploads/icon`.
- Added static upload serving from `/uploads/`.
- Added CMS upload controls for avatar and link icons.
- Added edit mode for navigation categories and links.
- Enabled frontend custom CSS injection from site config.
- Verified backend and frontend production builds.

### 2026-04-26 Production收敛

- Frontend is now served as static production build via existing Docker Nginx.
- Stopped Vite dev server; public page no longer depends on port `10080`.
- Backend now runs from built `dist/main.js` on `10081`.
- Existing Docker Nginx default direct-IP server now serves `/home/web/html/nexus-profile`.
- `/api/` and `/uploads/` are proxied to backend `127.0.0.1:10081`.
- Added `scripts/deploy-production.sh` and `scripts/nginx-direct-ip.conf`.
- Updated Docker frontend Nginx config to proxy `/api/` and `/uploads/` to compose backend service.

### 2026-04-26 后台安全与主题

- Added admin login endpoint: `POST /api/auth/login`.
- Protected all mutating CMS APIs with Bearer token verification.
- Protected image upload endpoint with admin token.
- Added admin login UI and local token storage.
- Added four theme presets in CMS: 极简浅色、深空暗色、暖纸质感、Mono Dark.
- Generated production admin password in local `.env` only; not committed.
- Redeployed production static frontend and restarted built backend.

### 2026-04-26 链接健康检测与首页升级

- Added health fields to `NavLink`: status, HTTP code and checked time.
- Added protected health check APIs for single link and all links.
- Added CMS buttons to check one link or all links.
- Added health status display in the admin link list.
- Added homepage Bento showcase component.
- Redeployed production frontend and restarted backend.

### 2026-04-26 产品完整度补强

- Added PRODUCT_AUDIT.md with product diagnosis and priority model.
- Added ROADMAP.md with v0.1.0/v0.2.0/v0.3.0 plan.
- Added LICENSE, CONTRIBUTING.md and SECURITY.md.
- Added `/projects` and `/profile` routes as productized information architecture.
- Updated homepage CTAs to point to navigation center, projects and admin.

### 2026-04-26 后台产品化概览

- Added admin overview dashboard.
- Added stat cards for categories, total links and visible links.
- Added quick actions to edit homepage, manage links and preview frontend.
- Added product completeness reminders in CMS overview.
- Redeployed production frontend.

### 2026-04-26 内容模型升级

- Added `Project` model and protected project CRUD APIs.
- Added `ProfileConfig` model and protected profile update API.
- Added protected data export API: `/api/export`.
- Projects page now reads project data from backend.
- Profile page now reads profile data from backend.
- Admin now includes Profile, Projects and Data Export tabs.
- Redeployed production frontend and restarted backend.

### 2026-04-26 前台视觉重构

- Rebuilt frontend aesthetic direction as a personal digital archive instead of project documentation.
- Replaced generic SaaS look with editorial archive style: paper texture, serif display type, muted ink palette and refined cards.
- Reworked homepage into real personal homepage: identity, now status, routes, selected works and counters.
- Reworked navigation, projects and profile pages with coherent visual language.
- Improved mobile navigation with horizontal scroll.
- Redeployed production frontend.

### 2026-04-26 前端二次打磨

- Added ambient marquee for archive identity.
- Added floating quick dock for core routes.
- Reworked homepage with stronger personal meaning: current signal, counters, gateway card, works card and focus cards.
- Added page reveal animation and hover orb detail.
- Improved mobile bottom dock behavior.
- Redeployed production frontend.

### 2026-04-26 子页视觉打磨

- Reworked navigation page with stats, health summary, stronger empty state and link status dots.
- Reworked projects page into portfolio-style asymmetrical grid with visual placeholders.
- Reworked profile page with dossier layout, tag chips and stack grid.
- Added dark archive CSS variable baseline for future theme compatibility.
- Redeployed production frontend.

### 2026-04-26 主题与后台视觉统一

- Connected dark theme detection to frontend CSS variable baseline.
- Added dark archive compatibility for topbar, cards, fields and buttons.
- Reworked admin shell visual style to match the personal archive frontend.
- Replaced generic admin white cards with archive-style surfaces.
- Redeployed production frontend.

### 2026-04-26 大步视觉特效升级

- Added global animated archive atmosphere: drifting orbs, scanlines and constellation dots.
- Added custom cursor aura with eased pointer following.
- Added kinetic typography component for hero title glyph reveal.
- Added card sheen and depth interactions.
- Added stacked reveal animations and slow floating hero card.
- Applied depth-card interactions across homepage and key subpages.
- Redeployed production frontend.
