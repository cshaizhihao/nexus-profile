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

### 2026-04-27 动效审美修复

- Added MOTION_AUDIT.md.
- Introduced Motion System v2 tokens.
- Disabled noisy scanline effect.
- Reduced global orb/cursor visual intensity.
- Added prefers-reduced-motion support.
- Added lightweight MagneticCard interaction.
- Applied magnetic interaction to homepage main route cards.
- Redeployed production frontend.

### 2026-04-27 设计系统与真实内容模块

- Added DESIGN_SYSTEM.md to freeze visual direction, tokens and component rules.
- Added SocialRail component for external identity links.
- Added NowPanel component for real personal homepage content.
- Replaced generic focus cards on homepage with concrete Now and Social modules.
- Redeployed production frontend.

### 2026-04-27 首页模块 CMS 化

- Added `nowItems` field to profile config.
- Homepage NowPanel now reads backend profile config JSON.
- Homepage SocialRail now reads backend profile config JSON.
- Admin profile tab now supports editing Social Links JSON and Now Board JSON.
- Redeployed production frontend.

### 2026-04-27 Profile 可视化配置

- Replaced manual JSON-only editing for homepage modules with visual add/remove forms.
- Added editable Social links list in admin profile tab.
- Added editable Now board cards in admin profile tab.
- Added live preview block for homepage module content inside admin.
- Save action serializes form state back into JSON for backend compatibility.
- Redeployed production frontend.

### 2026-04-27 三轮并行优化交付

- Added visible toggle + manual ordering for Social links.
- Added visible toggle + manual ordering for Now board cards.
- Upgraded live preview from simple text blocks to a homepage-like split preview panel.
- Preserved backend JSON compatibility while moving editing to structured UI.
- Redeployed production frontend.

### 2026-04-27 三轮第二阶段

- Added social iconUrl support with upload in visual editor.
- Added Now card variant selection: default / feature / soft.
- Upgraded preview panel to reflect icon and variant differences.
- Redeployed production frontend.

### 2026-04-27 三轮第三阶段

- Added homepageLayout field to profile config flow.
- Added homepage module visibility toggles: showNow / showSocial / showProjects.
- Homepage now conditionally renders major modules from backend-configurable layout.
- Admin preview upgraded to reflect Hero + Now + Social + Projects block visibility.
- Redeployed production frontend.

### 2026-04-27 大步三连交付

- Added homepage layout mode support: compact / balanced / showcase.
- Added backend controls for homepage major module visibility.
- Added drag-and-drop sorting for Social and Now blocks.
- Upgraded preview to reflect Hero + Now + Social + Projects with layout toggles.
- Homepage now consumes backend layout mode.
- Redeployed production frontend.

### 2026-04-27 前端视觉方向重置

- Replaced retro paper/archive aesthetic with high-fashion tech editorial direction.
- Switched primary typography to Syne + Manrope.
- Rebuilt color system to dark premium contrast with violet/cyan accent lighting.
- Removed old paper texture language and unified components under modern glass-metal surfaces.
- Preserved CMS/product structure while replacing visual identity system.
- Redeployed production frontend.

### 2026-04-27 Modern editorial structure pass

- Rebuilt homepage hero composition into stronger editorial structure.
- Reworked navigation page into a more productized index surface.
- Reworked projects page into a stronger portfolio grid.
- Reworked profile page into a sharper dossier layout.
- Added modern structural page classes and responsive layout system.
- Switched typography/color language toward sharper high-fashion tech editorial direction.
- Redeployed production frontend.

### 2026-04-27 Modern editorial page system rollout

- Reworked homepage hero into a stronger editorial composition.
- Reworked navigation page into a sharper index surface.
- Reworked projects page into a more portfolio-like grid.
- Reworked profile page into a cleaner dossier layout.
- Added structural page classes for hero, metrics, strips, grids and panels.
- Redeployed production frontend after long-form approval.

### 2026-04-27 美术资源与玻璃质感补强

- Added abstract built-in art assets for projects/social fallback imagery.
- Refined liquid glass surfaces with stronger layered highlights, internal edge light and better depth.
- Added sheen transitions on cards and controls.
- Improved project media treatment and page transition feel.
- Redeployed production frontend.

### 2026-04-27 减法重构与导航优先

- Reduced homepage back to personal-homepage + quick-navigation core.
- Reworked top navigation bar into cleaner pill shell with less visual noise.
- Simplified homepage structure: hero + quick links + now/social + selected projects.
- Integrated built-in art asset directly into homepage hero and projects fallback.
- Disabled bottom quick dock to reduce interface clutter.
- Continued refining liquid glass surfaces toward cleaner premium look.
- Redeployed production frontend.

### 2026-04-27 导航优先二次打磨

- Added stronger hero art resource for homepage.
- Improved top navigation bar shell and active tab visual weight.
- Increased quick-links block priority and made first card larger.
- Refined project cover heights and visual hierarchy.
- Continued subtraction pass to keep homepage focused on navigation use-case.
- Redeployed production frontend.

### 2026-04-27 主导航与入口权重优化

- Added stronger homepage hero art asset prism-surface.svg.
- Refined top nav shell, tab spacing, active state and weight hierarchy.
- Elevated quick-links section to primary functional area with larger priority cards.
- Added subtle premium texture overlay using noise-metal asset.
- Improved hero visual scale and status card presence.
- Continued subtraction-focused homepage refinement.
- Redeployed production frontend.

### 2026-04-27 极简导航与主入口强化

- Replaced pill-style top nav with cleaner line-based minimal nav.
- Added new art assets: monolith-poster.svg and signal-column.svg.
- Upgraded homepage hero art to monolith-poster.
- Increased visual priority of quick-link cards and enlarged primary entries.
- Improved project fallback art set with stronger poster-like graphics.
- Continued subtraction pass to keep focus on personal homepage + quick navigation.
- Redeployed production frontend.

### 2026-04-27 导航与封面终态强化

- Added hero art asset cover-helix.svg and project art asset offset-panel.svg.
- Further refined minimal nav into a more brand-like line navigation.
- Increased hero visual size and status panel presence.
- Strengthened first quick-link cards into more poster-like priority surfaces.
- Continued premium art-forward homepage refinement around quick navigation.
- Redeployed production frontend.

### 2026-04-27 品牌化导航与封面深化

- Added hero art asset spectrum-slab.svg and support asset velvet-frame.svg.
- Further polished top navigation toward cleaner brand-like line navigation.
- Increased hero cover scale and status card composition.
- Strengthened quick-link primary card to feel more like a cover panel.
- Improved mature depth treatment for homepage and project surfaces.
- Redeployed production frontend.

### 2026-04-27 品牌首页最终抛光

- Added hero art asset halo-sheet.svg and project asset stacked-signal.svg.
- Further refined navigation into cleaner brand-like top-line system.
- Increased homepage hero cover scale and added compact brand caption.
- Enlarged priority quick-link cards and strengthened homepage focal hierarchy.
- Improved project fallback art set for more mature product-site feel.
- Redeployed production frontend.

### 2026-04-27 KV 与入口终局强化

- Added hero key visual asset kv-aperture.svg.
- Rebalanced homepage hero proportions toward a more cover-like composition.
- Elevated quick links into the dominant functional block with larger first and second cards.
- Reduced visible quick links count to strengthen hierarchy.
- Continued subtraction-first homepage refinement around quick navigation core.
- Redeployed production frontend.

### 2026-04-27 首页终局收口

- Elevated Quick Links into the clearest primary functional block on the homepage.
- Increased primary card scale and reduced competing visual weight from secondary sections.
- Added final hero gloss layer and refined title/lead proportions.
- Muted projects preview slightly so navigation remains the core purpose.
- Redeployed production frontend.

### 2026-04-27 Navigation 主场化

- Added dedicated gateway hero art asset gateway-beam.svg.
- Elevated navigation page into a primary workspace with featured routes block.
- Added stronger featured link hierarchy with enlarged primary card.
- Reduced category link density to two-column layout for cleaner scannability.
- Reframed navigation page as the core working surface of the product.
- Redeployed production frontend.
