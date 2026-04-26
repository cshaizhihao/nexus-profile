<template>
  <section class="grid gap-8 home-shell">
    <HomeMarquee />

    <section class="hero-grid">
      <div class="hero-copy hero-reveal">
        <p class="kicker">Digital identity / curated presence</p>
        <KineticTitle :text="displayName" class="mt-5" />
        <p class="hero-lead">{{ profile?.bio || 'A sharper, more curated personal index — part identity, part work archive, part gateway.' }}</p>
        <div class="hero-actions">
          <RouterLink to="/navigation" class="primary-btn">Open Gateway</RouterLink>
          <RouterLink to="/projects" class="ghost-btn">Selected Works</RouterLink>
        </div>
      </div>

      <div class="hero-side hero-reveal-delay">
        <div class="archive-card hero-side-card float-slow">
          <p class="kicker">Current signal</p>
          <p class="hero-side-title">{{ profile?.status || 'Building a personal presence that feels more like a designed object than a template.' }}</p>
          <div class="rule my-6" />
          <div class="hero-metrics">
            <div><span>{{ store.visibleLinks.length }}</span><small>links</small></div>
            <div><span>{{ store.projects.length }}</span><small>works</small></div>
            <div><span>{{ store.categories.length }}</span><small>groups</small></div>
          </div>
        </div>
      </div>
    </section>

    <section class="editorial-grid reveal-stack" :class="layoutModeClass">
      <MagneticCard class="feature-a" style="--d:1">
        <RouterLink to="/navigation" class="bento-card depth-card link-orb block h-full editorial-feature editorial-feature-main">
          <p class="kicker">Gateway</p>
          <h2>Everything you actually return to.</h2>
          <p>Links are not decoration here. They are working routes — sorted, checked, and arranged to feel immediate.</p>
        </RouterLink>
      </MagneticCard>

      <MagneticCard class="feature-b" style="--d:2">
        <RouterLink to="/projects" class="bento-card depth-card link-orb block h-full editorial-feature">
          <p class="kicker">Works</p>
          <h2>Selected things worth opening again.</h2>
        </RouterLink>
      </MagneticCard>

      <MagneticCard class="feature-c" style="--d:3">
        <RouterLink to="/profile" class="bento-card depth-card block h-full editorial-feature">
          <p class="kicker">Dossier</p>
          <h2>Identity, stack, current state.</h2>
        </RouterLink>
      </MagneticCard>

      <MagneticCard class="feature-d" style="--d:4">
        <article class="bento-card depth-card h-full editorial-counter">
          <p class="kicker">Mode</p>
          <p class="counter-value">{{ layoutMode }}</p>
        </article>
      </MagneticCard>
    </section>

    <NowPanel v-if="homepageLayout.showNow !== false" :items="nowItems" />
    <SocialRail v-if="homepageLayout.showSocial !== false" :links="socialLinks" />

    <section v-if="homepageLayout.showProjects !== false && featuredProjects.length" class="archive-card depth-card p-7 md:p-8">
      <div class="section-head">
        <div>
          <p class="kicker">Selected works</p>
          <h2 class="section-title">Recent things to open.</h2>
        </div>
        <RouterLink to="/projects" class="mono text-xs uppercase tracking-[.2em] text-zinc-400">View all</RouterLink>
      </div>
      <div class="project-strip">
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
const layoutMode = computed(() => homepageLayout.value.mode || 'balanced')
const layoutModeClass = computed(() => layoutMode.value === 'compact' ? 'home-layout-compact' : layoutMode.value === 'showcase' ? 'home-layout-showcase' : 'home-layout-balanced')
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
