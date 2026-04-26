<template>
  <section class="page-shell grid gap-7 lg:grid-cols-[.9fr_1.1fr]">
    <div class="archive-card p-8 md:p-10 hero-reveal">
      <p class="kicker">Profile dossier</p>
      <h1 class="page-title !text-[clamp(3.8rem,10vw,8rem)] mt-5">{{ profile?.headline || 'Profile' }}</h1>
      <p class="mt-8 max-w-2xl text-xl leading-9 text-zinc-300">{{ profile?.bio }}</p>
      <div class="rule my-8" />
      <p class="mono text-xs uppercase tracking-[.24em] text-zinc-500">Curated identity surface</p>
    </div>
    <div class="grid gap-4 hero-reveal-delay">
      <article class="bento-card depth-card profile-panel"><p class="kicker">Identity tags</p><div class="mt-5 flex flex-wrap gap-2"><span v-for="tag in tags" :key="tag" class="profile-chip">{{ tag }}</span></div></article>
      <article class="bento-card depth-card profile-panel"><p class="kicker">Current state</p><p class="mt-5 text-3xl tracking-[-0.04em]">{{ profile?.status }}</p></article>
      <article class="bento-card depth-card profile-panel"><p class="kicker">Stack</p><div class="profile-stack-grid mt-5"><span v-for="item in techStack" :key="item" class="profile-stack-item">{{ item }}</span></div></article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
const profile = computed(() => store.profile)
const tags = computed(() => (profile.value?.tags || '').split(',').map((s) => s.trim()).filter(Boolean))
const techStack = computed(() => (profile.value?.techStack || '').split(',').map((s) => s.trim()).filter(Boolean))
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
