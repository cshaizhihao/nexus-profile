<template>
  <section>
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-sm text-slate-400">Curated links</p>
        <h1 class="mt-2 text-4xl font-semibold tracking-[-0.03em]">结构化导航</h1>
      </div>
      <input v-model="keyword" class="w-64 rounded-full border border-slate-200 bg-white/80 px-5 py-3 outline-none transition focus:border-slate-400" placeholder="搜索链接..." />
    </div>

    <div v-if="store.loading" class="rounded-3xl border border-white/80 bg-white/70 p-8 text-slate-500">正在加载导航数据...</div>
    <div v-else-if="filteredGroups.length" class="grid gap-8">
      <section v-for="group in filteredGroups" :key="group.id">
        <div class="mb-4 flex items-center gap-3">
          <h2 class="text-xl font-semibold tracking-tight">{{ group.name }}</h2>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-400">{{ group.links.length }} links</span>
        </div>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <a v-for="link in group.links" :key="link.id" :href="link.url" target="_blank" rel="noreferrer" class="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl">
            <img v-if="link.iconUrl" :src="link.iconUrl" class="mb-5 h-12 w-12 rounded-2xl object-cover" />
            <div v-else class="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">{{ link.title.slice(0, 1).toUpperCase() }}</div>
            <h3 class="text-lg font-semibold">{{ link.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">{{ link.description || link.url }}</p>
          </a>
        </div>
      </section>
    </div>
    <div v-else class="rounded-3xl border border-white/80 bg-white/70 p-8 text-slate-500">暂无导航数据。请进入后台添加分类和链接。</div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const keyword = ref('')
const filteredGroups = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  return store.linksByCategory
    .map((group) => ({
      ...group,
      links: group.links.filter((link) => !q || `${link.title} ${link.description} ${link.url}`.toLowerCase().includes(q)),
    }))
    .filter((group) => group.links.length > 0)
})

onMounted(() => {
  if (!store.siteConfig) store.loadAll()
})
</script>
