<template>
  <section class="page-shell grid gap-7">
    <div class="page-hero">
      <div class="hero-reveal">
        <p class="kicker">Selected works</p>
        <h1 class="page-title">Projects<br />Archive</h1>
      </div>
      <div class="archive-card page-hero-card hero-reveal-delay">
        <p class="page-copy">This should feel like a portfolio spread — strong cover blocks, clearer hierarchy, less dashboard energy.</p>
      </div>
    </div>
    <div v-if="store.projects.length" class="projects-grid">
      <a v-for="(item, index) in store.projects" :key="item.id" :href="item.url || '#'" target="_blank" rel="noreferrer" class="archive-card project-panel group" :class="index === 0 ? 'project-panel-main' : ''">
        <div class="project-media"><img :src="item.imageUrl || artFor(index)" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
        <p class="kicker mt-5">{{ item.type }}</p>
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </a>
    </div>
    <div v-else class="archive-card empty-state">
      <p class="empty-title">No projects yet.</p>
      <p class="text-zinc-400">Add project titles, descriptions, links, and covers in the admin panel to turn this into a real portfolio surface.</p>
      <RouterLink to="/admin" class="primary-btn w-max">Add projects</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
const art = ['/art/halo-sheet.svg', '/art/stacked-signal.svg', '/art/monolith-poster.svg', '/art/signal-column.svg']
function artFor(index: number) { return art[index % art.length] }
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
