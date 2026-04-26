<template>
  <section class="grid gap-7">
    <div>
      <p class="kicker">Selected works</p>
      <h1 class="mt-4 text-6xl leading-none tracking-[-0.07em] md:text-8xl">项目<br />作品</h1>
    </div>
    <div v-if="store.projects.length" class="grid gap-5 md:grid-cols-2">
      <a v-for="item in store.projects" :key="item.id" :href="item.url || '#'" target="_blank" rel="noreferrer" class="archive-card group overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-[0_40px_100px_rgba(65,47,25,.18)]">
        <div v-if="item.imageUrl" class="mb-5 overflow-hidden rounded-3xl"><img :src="item.imageUrl" class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" /></div>
        <p class="kicker">{{ item.type }}</p>
        <h2 class="mt-4 text-4xl tracking-[-0.05em]">{{ item.title }}</h2>
        <p class="mt-4 max-w-xl leading-8 text-stone-600">{{ item.description }}</p>
      </a>
    </div>
    <div v-else class="archive-card p-8 text-stone-500">暂无项目数据，请在后台添加。</div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
