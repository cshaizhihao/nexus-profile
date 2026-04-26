<template>
  <section class="grid gap-7">
    <div class="grid gap-5 md:grid-cols-[1fr_340px] md:items-end">
      <div class="hero-reveal">
        <p class="kicker">Selected works</p>
        <h1 class="mt-4 text-6xl leading-none tracking-[-0.07em] md:text-8xl">项目<br />作品</h1>
      </div>
      <div class="archive-card hero-reveal-delay p-5">
        <p class="text-sm leading-6 text-stone-500">不是作品墙，而是长期资产目录。把值得被再次看见的东西放在这里。</p>
      </div>
    </div>
    <div v-if="store.projects.length" class="grid gap-5 md:grid-cols-6">
      <a v-for="(item, index) in store.projects" :key="item.id" :href="item.url || '#'" target="_blank" rel="noreferrer" class="archive-card group overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-[0_40px_100px_rgba(65,47,25,.18)]" :class="index === 0 ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2'">
        <div v-if="item.imageUrl" class="mb-5 overflow-hidden rounded-3xl"><img :src="item.imageUrl" class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" /></div>
        <div v-else class="mb-5 grid h-44 place-items-center rounded-3xl border border-stone-950/10 bg-white/20"><span class="display-title !text-6xl opacity-20">{{ item.title.slice(0, 1) }}</span></div>
        <p class="kicker">{{ item.type }}</p>
        <h2 class="mt-4 text-4xl tracking-[-0.05em]">{{ item.title }}</h2>
        <p class="mt-4 max-w-xl leading-8 text-stone-600">{{ item.description }}</p>
      </a>
    </div>
    <div v-else class="archive-card grid gap-5 p-8 text-stone-500">
      <p class="text-2xl tracking-[-0.04em] text-stone-800">作品集还空着。</p>
      <p>去后台添加项目标题、描述、链接和封面图，这里会自动形成作品集布局。</p>
      <RouterLink to="/admin" class="primary-btn w-max">添加项目</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
