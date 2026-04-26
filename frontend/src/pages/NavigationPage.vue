<template>
  <section class="grid gap-7">
    <div class="grid gap-5 md:grid-cols-[1fr_360px] md:items-end">
      <div class="hero-reveal">
        <p class="kicker">Curated gateway</p>
        <h1 class="mt-4 text-6xl leading-none tracking-[-0.07em] md:text-8xl">导航<br />索引</h1>
      </div>
      <div class="archive-card hero-reveal-delay p-5">
        <p class="text-sm leading-6 text-stone-500">把真正会反复抵达的入口整理成路径。搜索、分类、状态，一眼可达。</p>
        <input v-model="keyword" class="mt-5 w-full rounded-full border border-stone-950/10 bg-white/50 px-5 py-3 outline-none transition focus:border-stone-950/30" placeholder="搜索链接、描述或地址..." />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <article class="archive-card p-5"><p class="kicker">Categories</p><p class="mt-3 text-4xl tracking-[-0.05em]">{{ store.categories.length }}</p></article>
      <article class="archive-card p-5"><p class="kicker">Visible links</p><p class="mt-3 text-4xl tracking-[-0.05em]">{{ store.visibleLinks.length }}</p></article>
      <article class="archive-card p-5 md:col-span-2"><p class="kicker">Health</p><p class="mt-3 text-2xl tracking-[-0.04em]">{{ healthSummary }}</p></article>
    </div>

    <div v-if="store.loading" class="archive-card p-8 text-stone-500">正在加载导航数据...</div>
    <div v-else-if="filteredGroups.length" class="grid gap-8">
      <section v-for="group in filteredGroups" :key="group.id" class="archive-card p-6 md:p-7">
        <div class="mb-5 flex items-center justify-between gap-3">
          <div><p class="kicker">Category</p><h2 class="mt-2 text-3xl tracking-[-0.04em]">{{ group.name }}</h2></div>
          <span class="mono rounded-full border border-stone-950/10 px-3 py-1 text-xs text-stone-500">{{ group.links.length }} links</span>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a v-for="link in group.links" :key="link.id" :href="link.url" target="_blank" rel="noreferrer" class="group relative overflow-hidden rounded-3xl border border-stone-950/10 bg-white/30 p-5 transition duration-300 hover:-translate-y-1 hover:bg-stone-950 hover:text-white">
            <div class="absolute right-4 top-4 h-2 w-2 rounded-full" :class="statusDot(link.healthStatus)" />
            <img v-if="link.iconUrl" :src="link.iconUrl" class="mb-5 h-11 w-11 rounded-2xl object-cover" />
            <div v-else class="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-current/20 mono text-sm">{{ link.title.slice(0, 1).toUpperCase() }}</div>
            <h3 class="text-2xl tracking-[-0.04em]">{{ link.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-stone-500 group-hover:text-white/70">{{ link.description || link.url }}</p>
            <p class="mono mt-5 text-[10px] uppercase tracking-[.18em] text-stone-400 group-hover:text-white/50">{{ healthLabel(link.healthStatus) }}</p>
          </a>
        </div>
      </section>
    </div>
    <div v-else class="archive-card grid gap-5 p-8 text-stone-500">
      <p class="text-2xl tracking-[-0.04em] text-stone-800">这里还没有入口。</p>
      <p>去后台添加第一组导航分类和链接，这一页会自动变成你的入口索引。</p>
      <RouterLink to="/admin" class="primary-btn w-max">进入后台</RouterLink>
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
const healthSummary = computed(() => {
  const ok = store.links.filter((l) => l.healthStatus === 'ok').length
  const bad = store.links.filter((l) => ['broken', 'timeout'].includes(l.healthStatus)).length
  return `${ok} 正常 · ${bad} 异常 · ${store.links.length - ok - bad} 未检测`
})
function healthLabel(status: string) { return { ok: '正常', broken: '失效', timeout: '超时', unknown: '未检测' }[status] || '未检测' }
function statusDot(status: string) { return status === 'ok' ? 'bg-emerald-500' : ['broken', 'timeout'].includes(status) ? 'bg-rose-500' : 'bg-stone-300' }
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
