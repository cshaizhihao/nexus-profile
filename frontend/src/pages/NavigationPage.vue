<template>
  <section class="grid gap-7">
    <div class="grid gap-5 md:grid-cols-[1fr_340px] md:items-end">
      <div>
        <p class="kicker">Curated gateway</p>
        <h1 class="mt-4 text-6xl leading-none tracking-[-0.07em] md:text-8xl">导航<br />索引</h1>
      </div>
      <div class="archive-card p-5">
        <p class="text-sm leading-6 text-stone-500">不是把链接堆起来，而是把真正会反复抵达的入口整理成清晰的路径。</p>
        <input v-model="keyword" class="mt-5 w-full rounded-full border border-stone-950/10 bg-white/50 px-5 py-3 outline-none" placeholder="搜索链接、描述或地址..." />
      </div>
    </div>

    <div v-if="store.loading" class="archive-card p-8 text-stone-500">正在加载导航数据...</div>
    <div v-else-if="filteredGroups.length" class="grid gap-8">
      <section v-for="group in filteredGroups" :key="group.id" class="archive-card p-6 md:p-7">
        <div class="mb-5 flex items-center justify-between gap-3">
          <div><p class="kicker">Category</p><h2 class="mt-2 text-3xl tracking-[-0.04em]">{{ group.name }}</h2></div>
          <span class="mono rounded-full border border-stone-950/10 px-3 py-1 text-xs text-stone-500">{{ group.links.length }} links</span>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a v-for="link in group.links" :key="link.id" :href="link.url" target="_blank" rel="noreferrer" class="group rounded-3xl border border-stone-950/10 bg-white/30 p-5 transition duration-300 hover:-translate-y-1 hover:bg-stone-950 hover:text-white">
            <img v-if="link.iconUrl" :src="link.iconUrl" class="mb-5 h-11 w-11 rounded-2xl object-cover" />
            <div v-else class="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-current/20 mono text-sm">{{ link.title.slice(0, 1).toUpperCase() }}</div>
            <h3 class="text-2xl tracking-[-0.04em]">{{ link.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-stone-500 group-hover:text-white/70">{{ link.description || link.url }}</p>
          </a>
        </div>
      </section>
    </div>
    <div v-else class="archive-card p-8 text-stone-500">暂无导航数据。请进入后台添加分类和链接。</div>
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
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
