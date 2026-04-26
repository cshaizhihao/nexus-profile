<template>
  <section class="home-minimal">
    <div class="home-hero archive-card hero-panel">
      <div class="hero-text hero-reveal">
        <p class="kicker">Personal homepage / quick navigation</p>
        <KineticTitle :text="displayName" class="mt-4" />
        <p class="hero-lead">{{ profile?.bio || '一个更好看的个人主页，用来快速进入常用入口、项目和个人档案。' }}</p>
        <div class="hero-actions">
          <RouterLink to="/navigation" class="primary-btn">打开导航</RouterLink>
          <RouterLink to="/projects" class="ghost-btn">查看项目</RouterLink>
        </div>
      </div>
      <div class="hero-visual hero-reveal-delay">
        <img class="hero-art" src="/art/liquid-orbit.svg" alt="hero art" />
        <div class="hero-status-card">
          <p class="kicker">Current</p>
          <p class="hero-status-text">{{ profile?.status || '保持主页干净、好看、好用。' }}</p>
        </div>
      </div>
    </div>

    <section class="quick-links-section">
      <div class="section-head compact-head">
        <div>
          <p class="kicker">Quick links</p>
          <h2 class="section-title">常用入口</h2>
        </div>
        <RouterLink to="/navigation" class="mono text-xs uppercase tracking-[.2em] text-zinc-400">All routes</RouterLink>
      </div>
      <div v-if="topLinks.length" class="quick-grid">
        <a v-for="link in topLinks" :key="link.id" :href="link.url" target="_blank" rel="noreferrer" class="quick-card depth-card">
          <img v-if="link.iconUrl" :src="link.iconUrl" class="mb-4 h-10 w-10 rounded-2xl object-cover" />
          <div v-else class="mb-4 grid h-10 w-10 place-items-center rounded-2xl border border-current/15 mono text-sm">{{ link.title.slice(0, 1).toUpperCase() }}</div>
          <h3>{{ link.title }}</h3>
          <p>{{ link.description || link.url }}</p>
        </a>
      </div>
      <div v-else class="archive-card empty-state">
        <p class="empty-title">还没有常用入口。</p>
        <p class="text-zinc-400">去后台添加导航分类和链接，这里会自动展示你最常用的入口。</p>
      </div>
    </section>

    <section class="support-grid">
      <NowPanel v-if="homepageLayout.showNow !== false" :items="nowItems.slice(0, 3)" />
      <SocialRail v-if="homepageLayout.showSocial !== false" :links="socialLinks.slice(0, 3)" />
    </section>

    <section v-if="homepageLayout.showProjects !== false && featuredProjects.length" class="projects-preview archive-card">
      <div class="section-head compact-head">
        <div>
          <p class="kicker">Selected work</p>
          <h2 class="section-title">精选项目</h2>
        </div>
        <RouterLink to="/projects" class="mono text-xs uppercase tracking-[.2em] text-zinc-400">View all</RouterLink>
      </div>
      <div class="project-strip compact-strip">
        <RouterLink v-for="project in featuredProjects" :key="project.id" to="/projects" class="project-card">
          <p class="kicker">{{ project.type }}</p>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import KineticTitle from '../components/KineticTitle.vue'
import NowPanel from '../components/NowPanel.vue'
import SocialRail from '../components/SocialRail.vue'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const config = computed(() => store.siteConfig)
const profile = computed(() => store.profile)
const displayName = computed(() => config.value?.title || 'Zaki Gateway')
const featuredProjects = computed(() => store.projects.filter((p) => p.isFeatured).slice(0, 3))
const topLinks = computed(() => store.visibleLinks.slice(0, 6))
const socialLinks = computed(() => { try { return JSON.parse(store.profile?.socialLinks || '[]') } catch { return [] } })
const nowItems = computed(() => { try { return JSON.parse(store.profile?.nowItems || '[]') } catch { return [] } })
const homepageLayout = computed(() => { try { return JSON.parse(store.profile?.homepageLayout || '{}') } catch { return {} } })

onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
