<template>
  <section class="grid gap-8">
    <div class="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
      <div>
        <p class="kicker">Personal archive · curated gateway</p>
        <h1 class="display-title mt-5">{{ titleParts[0] }}<br />{{ titleParts[1] || 'Archive' }}</h1>
      </div>
      <div class="archive-card p-7 md:p-8">
        <div class="flex items-start justify-between gap-5">
          <div>
            <p class="kicker">Now</p>
            <p class="mt-4 text-2xl leading-tight tracking-[-0.03em]">{{ profile?.status || '构建、整理、发布。' }}</p>
          </div>
          <div class="mono rounded-full border border-stone-950/10 px-3 py-1 text-xs text-stone-500">GMT+8</div>
        </div>
        <div class="rule my-7" />
        <p class="text-lg leading-8 text-stone-600">{{ config?.description || profile?.bio || '一个用于展示身份、项目、链接与当前状态的数字主页。' }}</p>
        <div class="mt-7 flex flex-wrap gap-3">
          <RouterLink to="/navigation" class="primary-btn">进入导航</RouterLink>
          <RouterLink to="/projects" class="ghost-btn">看项目</RouterLink>
          <RouterLink to="/profile" class="ghost-btn">读档案</RouterLink>
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <article class="bento-card md:col-span-2 md:row-span-2">
        <p class="kicker">Identity</p>
        <h2 class="mt-6 max-w-xl text-4xl leading-none tracking-[-0.05em]">{{ config?.subtitle || '不是说明书，是一个人的入口。' }}</h2>
        <p class="mt-6 leading-8 text-stone-600">{{ profile?.bio || '把个人介绍、作品、服务入口和长期维护的链接收束在一个克制而清晰的界面里。' }}</p>
      </article>
      <RouterLink to="/navigation" class="bento-card block">
        <p class="kicker">Links</p>
        <p class="mt-5 text-5xl tracking-[-0.06em]">{{ store.visibleLinks.length }}</p>
        <p class="mt-2 text-stone-500">精选链接</p>
      </RouterLink>
      <RouterLink to="/projects" class="bento-card block">
        <p class="kicker">Works</p>
        <p class="mt-5 text-5xl tracking-[-0.06em]">{{ store.projects.length }}</p>
        <p class="mt-2 text-stone-500">项目作品</p>
      </RouterLink>
      <article class="bento-card md:col-span-2">
        <p class="kicker">Featured routes</p>
        <div class="mt-5 grid gap-3 sm:grid-cols-3">
          <RouterLink v-for="route in routes" :key="route.to" :to="route.to" class="rounded-2xl border border-stone-950/10 bg-white/25 p-4 transition hover:bg-stone-950 hover:text-white">
            <span class="mono text-xs">{{ route.no }}</span>
            <p class="mt-3 text-xl">{{ route.label }}</p>
          </RouterLink>
        </div>
      </article>
    </div>

    <section v-if="featuredProjects.length" class="archive-card p-7 md:p-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div><p class="kicker">Selected works</p><h2 class="mt-2 text-3xl tracking-[-0.04em]">最近想展示的东西</h2></div>
        <RouterLink to="/projects" class="mono text-xs uppercase tracking-[.2em] text-stone-500">View all</RouterLink>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <RouterLink v-for="project in featuredProjects" :key="project.id" to="/projects" class="rounded-3xl border border-stone-950/10 bg-white/25 p-5 transition hover:-translate-y-1 hover:bg-white/45">
          <p class="kicker">{{ project.type }}</p>
          <h3 class="mt-4 text-2xl tracking-[-0.03em]">{{ project.title }}</h3>
          <p class="mt-3 line-clamp-3 text-stone-600">{{ project.description }}</p>
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const config = computed(() => store.siteConfig)
const profile = computed(() => store.profile)
const titleParts = computed(() => (config.value?.title || 'Zaki Archive').split(' '))
const featuredProjects = computed(() => store.projects.filter((p) => p.isFeatured).slice(0, 3))
const routes = [
  { no: '01', label: '导航中心', to: '/navigation' },
  { no: '02', label: '项目作品', to: '/projects' },
  { no: '03', label: '个人档案', to: '/profile' },
]

onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
