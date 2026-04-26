<template>
  <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-10 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">Profile</p>
      <h1 class="mt-2 text-4xl font-semibold tracking-[-0.03em]">{{ profile?.headline || '个人档案' }}</h1>
      <p class="mt-5 leading-8 text-slate-600">{{ profile?.bio }}</p>
    </div>
    <div class="grid gap-4">
      <article class="bento-card"><h2 class="text-xl font-semibold">身份标签</h2><p class="mt-3 text-slate-500">{{ tags.join(' · ') }}</p></article>
      <article class="bento-card"><h2 class="text-xl font-semibold">当前状态</h2><p class="mt-3 text-slate-500">{{ profile?.status }}</p></article>
      <article class="bento-card"><h2 class="text-xl font-semibold">技术栈</h2><p class="mt-3 text-slate-500">{{ techStack.join(' · ') }}</p></article>
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
