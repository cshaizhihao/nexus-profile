<template>
  <section class="page-shell grid gap-7">
    <div class="page-hero gateway-hero">
      <div class="hero-reveal">
        <p class="kicker">Curated gateway</p>
        <h1 class="page-title">Navigation<br />Index</h1>
      </div>
      <div class="archive-card page-hero-card hero-reveal-delay gateway-hero-card">
        <img class="gateway-hero-art" src="/art/gateway-lattice.svg" alt="gateway art" />
        <div class="gateway-hero-overlay">
          <p class="page-copy">Search, filter, and jump. This page should feel like a working control surface, not a list dump.</p>
          <input v-model="keyword" class="page-search" placeholder="Search links, descriptions, or URLs..." />
        </div>
      </div>
    </div>

    <div class="gateway-top-grid gateway-top-grid-strong">
      <section v-if="featuredLinks.length" class="archive-card featured-gateway p-6">
        <div class="section-head compact-head">
          <div><p class="kicker">Featured routes</p><h2 class="section-title">精选入口</h2></div>
          <span class="mono text-xs uppercase tracking-[.2em] text-zinc-500">Top picks</span>
        </div>
        <div class="featured-link-grid">
          <a v-for="(link, index) in featuredLinks" :key="link.id" :href="link.url" target="_blank" rel="noreferrer" class="featured-link-card" :class="index === 0 ? 'featured-link-main' : ''">
            <img v-if="link.iconUrl" :src="link.iconUrl" class="mb-4 h-10 w-10 rounded-2xl object-cover" />
            <div v-else class="mb-4 grid h-10 w-10 place-items-center rounded-2xl border border-current/20 mono text-sm">{{ link.title.slice(0, 1).toUpperCase() }}</div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.description || link.url }}</p>
          </a>
        </div>
      </section>

      <div class="metrics-row">
      <article class="archive-card metric-card"><p class="kicker">Categories</p><strong>{{ store.categories.length }}</strong></article>
      <article class="archive-card metric-card"><p class="kicker">Visible links</p><strong>{{ store.visibleLinks.length }}</strong></article>
      <article class="archive-card metric-card metric-wide"><p class="kicker">Health</p><strong>{{ healthSummary }}</strong></article>
    </div>
    </div>

    <div v-if="store.loading" class="archive-card p-8 text-zinc-400">Loading routes...</div>
    <div v-else-if="filteredGroups.length" class="grid gap-8 route-sections">
      <section v-for="(group, groupIndex) in filteredGroups" :key="group.id" class="archive-card p-6 md:p-7" :class="groupIndex === 0 ? "route-section-primary" : "route-section-secondary"">
        <div class="section-head mb-5">
          <div><p class="kicker">Category</p><h2 class="section-title">{{ group.name }}</h2></div>
          <span class="mono text-xs uppercase tracking-[.2em] text-zinc-500">{{ group.links.length }} links</span>
        </div>
        <div class="link-grid">
          <a v-for="link in group.links" :key="link.id" :href="link.url" target="_blank" rel="noreferrer" class="link-card group">
            <div class="absolute right-4 top-4 h-2.5 w-2.5 rounded-full" :class="statusDot(link.healthStatus)" />
            <img v-if="link.iconUrl" :src="link.iconUrl" class="mb-5 h-11 w-11 rounded-2xl object-cover" />
            <div v-else class="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-current/20 mono text-sm">{{ link.title.slice(0, 1).toUpperCase() }}</div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.description || link.url }}</p>
          </a>
        </div>
      </section>
    </div>
    <div v-else class="archive-card empty-state">
      <p class="empty-title">No routes here yet.</p>
      <p class="text-zinc-400">Add your first categories and links in the admin panel, then this becomes your working gateway.</p>
      <RouterLink to="/admin" class="primary-btn w-max">Open Admin</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
const keyword = ref('')
const filteredGroups = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  return store.linksByCategory.map((group) => ({ ...group, links: group.links.filter((link) => !q || `${link.title} ${link.description} ${link.url}`.toLowerCase().includes(q)) })).filter((group) => group.links.length > 0)
})
const featuredLinks = computed(() => store.visibleLinks.slice(0, 5))
const healthSummary = computed(() => {
  const ok = store.links.filter((l) => l.healthStatus === 'ok').length
  const bad = store.links.filter((l) => ['broken', 'timeout'].includes(l.healthStatus)).length
  return `${ok} healthy · ${bad} issues · ${store.links.length - ok - bad} unchecked`
})
function statusDot(status: string) { return status === 'ok' ? 'bg-emerald-500' : ['broken', 'timeout'].includes(status) ? 'bg-rose-500' : 'bg-zinc-500' }
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
