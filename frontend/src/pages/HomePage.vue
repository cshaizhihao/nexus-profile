<template>
  <section class="grid gap-8">
    <HomeMarquee />

    <div class="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
      <div class="hero-reveal">
        <p class="kicker">Personal archive · curated gateway</p>
        <KineticTitle :text="displayName" class="mt-5" />
        <p class="mt-6 max-w-xl text-xl leading-9 text-stone-600">{{ profile?.bio || '把身份、作品、入口和当前状态放进一个安静但有辨识度的数字空间。' }}</p>
      </div>
      <div class="archive-card depth-card hero-reveal-delay float-slow p-7 md:p-8">
        <div class="flex items-start justify-between gap-5">
          <div>
            <p class="kicker">Current signal</p>
            <p class="mt-4 text-3xl leading-tight tracking-[-0.04em]">{{ profile?.status || '整理长期链接，打磨个人入口。' }}</p>
          </div>
          <div class="mono rounded-full border border-stone-950/10 px-3 py-1 text-xs text-stone-500">LIVE</div>
        </div>
        <div class="rule my-7" />
        <div class="grid grid-cols-3 gap-3 text-center">
          <div><p class="text-3xl tracking-[-0.05em]">{{ store.visibleLinks.length }}</p><p class="mono mt-1 text-[10px] uppercase tracking-[.18em] text-stone-500">Links</p></div>
          <div><p class="text-3xl tracking-[-0.05em]">{{ store.projects.length }}</p><p class="mono mt-1 text-[10px] uppercase tracking-[.18em] text-stone-500">Works</p></div>
          <div><p class="text-3xl tracking-[-0.05em]">{{ store.categories.length }}</p><p class="mono mt-1 text-[10px] uppercase tracking-[.18em] text-stone-500">Groups</p></div>
        </div>
      </div>
    </div>

    <div class="reveal-stack grid gap-4 md:grid-cols-6">
      <MagneticCard class="md:col-span-3 md:row-span-2" style="--d:1"><RouterLink to="/navigation" class="bento-card depth-card link-orb block h-full">
        <p class="kicker">Gateway</p>
        <h2 class="relative z-10 mt-8 max-w-lg text-5xl leading-none tracking-[-0.06em]">常用入口，不再散落在浏览器角落。</h2>
        <p class="relative z-10 mt-6 max-w-md leading-8 text-stone-600">按分类收纳真实会用到的链接，并持续检测它们是否还活着。</p>
      </RouterLink></MagneticCard>

      <MagneticCard class="md:col-span-3" style="--d:2"><RouterLink to="/projects" class="bento-card depth-card link-orb block h-full">
        <p class="kicker">Works</p>
        <h2 class="relative z-10 mt-5 text-4xl tracking-[-0.05em]">作品、项目、长期资产。</h2>
      </RouterLink></MagneticCard>

      <MagneticCard class="md:col-span-2" style="--d:3"><RouterLink to="/profile" class="bento-card depth-card block h-full">
        <p class="kicker">Dossier</p>
        <h2 class="mt-5 text-3xl tracking-[-0.05em]">档案</h2>
        <p class="mt-3 text-stone-500">身份标签与当前状态。</p>
      </RouterLink></MagneticCard>

      <MagneticCard class="md:col-span-1" style="--d:4"><article class="bento-card depth-card h-full">
        <p class="kicker">Theme</p>
        <p class="mt-5 text-3xl tracking-[-0.05em]">Archive</p>
      </article></MagneticCard>
    </div>

    <NowPanel v-if="homepageLayout.showNow !== false" :items="nowItems" />
    <SocialRail v-if="homepageLayout.showSocial !== false" :links="socialLinks" />

    <section v-if="homepageLayout.showProjects !== false && featuredProjects.length" class="archive-card depth-card p-7 md:p-8">
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
import HomeMarquee from '../components/HomeMarquee.vue'
import MagneticCard from '../components/MagneticCard.vue'
import KineticTitle from '../components/KineticTitle.vue'
import NowPanel from '../components/NowPanel.vue'
import SocialRail from '../components/SocialRail.vue'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const config = computed(() => store.siteConfig)
const profile = computed(() => store.profile)
const displayName = computed(() => config.value?.title || 'Zaki Archive')
const featuredProjects = computed(() => store.projects.filter((p) => p.isFeatured).slice(0, 3))
const socialLinks = computed(() => {
  try { return JSON.parse(store.profile?.socialLinks || '[]') } catch { return [] }
})
const nowItems = computed(() => {
  try { return JSON.parse(store.profile?.nowItems || '[]') } catch { return [] }
})
const homepageLayout = computed(() => {
  try { return JSON.parse(store.profile?.homepageLayout || '{}') } catch { return {} }
})
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
