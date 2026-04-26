<template>
  <section class="grid gap-7 lg:grid-cols-[.95fr_1.05fr]">
    <div class="archive-card p-8 md:p-10">
      <p class="kicker">Profile dossier</p>
      <h1 class="mt-5 text-6xl leading-none tracking-[-0.07em] md:text-8xl">{{ profile?.headline || '个人档案' }}</h1>
      <p class="mt-8 text-xl leading-9 text-stone-600">{{ profile?.bio }}</p>
    </div>
    <div class="grid gap-4">
      <article class="bento-card"><p class="kicker">Identity tags</p><p class="mt-5 text-3xl tracking-[-0.04em]">{{ tags.join(' · ') }}</p></article>
      <article class="bento-card"><p class="kicker">Current state</p><p class="mt-5 text-3xl tracking-[-0.04em]">{{ profile?.status }}</p></article>
      <article class="bento-card"><p class="kicker">Stack</p><p class="mt-5 text-3xl tracking-[-0.04em]">{{ techStack.join(' · ') }}</p></article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSiteStore } from '../stores/site'
const store = useSiteStore()
const profile = computed(() => store.profile)
const tags = computed(() => (profile.value?.tags || '').split(',').filter(Boolean))
const techStack = computed(() => (profile.value?.techStack || '').split(',').filter(Boolean))
onMounted(() => { if (!store.siteConfig) store.loadAll() })
</script>
