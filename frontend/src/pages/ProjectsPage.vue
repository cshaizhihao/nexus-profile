<template>
  <section class="grid gap-6">
    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-10 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">Projects</p>
      <h1 class="mt-2 text-4xl font-semibold tracking-[-0.03em]">项目作品</h1>
      <p class="mt-4 max-w-2xl leading-8 text-slate-600">展示精选项目、开源仓库、作品案例和长期维护的数字资产。</p>
    </div>
    <div v-if="store.projects.length" class="grid gap-5 md:grid-cols-3">
      <a v-for="item in store.projects" :key="item.id" :href="item.url || '#'" target="_blank" rel="noreferrer" class="bento-card">
        <img v-if="item.imageUrl" :src="item.imageUrl" class="mb-4 h-36 w-full rounded-2xl object-cover" />
        <p class="text-sm text-slate-400">{{ item.type }}</p>
        <h2 class="mt-3 text-xl font-semibold">{{ item.title }}</h2>
        <p class="mt-3 leading-7 text-slate-500">{{ item.description }}</p>
      </a>
    </div>
    <div v-else class="rounded-3xl border border-white/80 bg-white/70 p-8 text-slate-500">暂无项目数据，请在后台添加。</div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
