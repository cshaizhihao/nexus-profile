<template>
  <section class="grid gap-7 lg:grid-cols-[.95fr_1.05fr]">
    <div class="archive-card hero-reveal p-8 md:p-10">
      <p class="kicker">Profile dossier</p>
      <h1 class="mt-5 text-6xl leading-none tracking-[-0.07em] md:text-8xl">{{ profile?.headline || '个人档案' }}</h1>
      <p class="mt-8 text-xl leading-9 text-stone-600">{{ profile?.bio }}</p>
      <div class="rule my-8" />
      <p class="mono text-xs uppercase tracking-[.24em] text-stone-500">Last curated · Nexus Profile</p>
    </div>
    <div class="grid gap-4 hero-reveal-delay">
      <article class="bento-card"><p class="kicker">Identity tags</p><div class="mt-5 flex flex-wrap gap-2"><span v-for="tag in tags" :key="tag" class="rounded-full border border-stone-950/10 bg-white/30 px-4 py-2 text-sm">{{ tag }}</span></div></article>
      <article class="bento-card"><p class="kicker">Current state</p><p class="mt-5 text-3xl tracking-[-0.04em]">{{ profile?.status }}</p></article>
      <article class="bento-card"><p class="kicker">Stack</p><div class="mt-5 grid gap-2 sm:grid-cols-2"><span v-for="item in techStack" :key="item" class="rounded-2xl border border-stone-950/10 bg-white/25 p-3 mono text-xs uppercase tracking-[.16em]">{{ item }}</span></div></article>
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
