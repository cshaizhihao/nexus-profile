<template>
  <section class="archive-card p-6">
    <div class="mb-5 flex items-center justify-between">
      <div><p class="kicker">Social signals</p><h2 class="mt-2 text-2xl tracking-[-0.04em]">外部身份</h2></div>
      <RouterLink to="/profile" class="mono text-xs uppercase tracking-[.2em] text-stone-500">Profile</RouterLink>
    </div>
    <div class="grid gap-3 sm:grid-cols-3">
      <a v-for="item in visibleLinks" :key="item.label" :href="item.href" target="_blank" rel="noreferrer" class="rounded-2xl border border-stone-950/10 bg-white/25 p-4 transition hover:-translate-y-1 hover:bg-stone-950 hover:text-white">
        <p class="mono text-[10px] uppercase tracking-[.2em] opacity-60">{{ item.type }}</p>
        <p class="mt-3 text-xl tracking-[-0.03em]">{{ item.label }}</p>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ links?: Array<{ type: string; label: string; href: string; enabled?: boolean }> }>()
const fallback = [
  { type: 'Code', label: 'GitHub', href: 'https://github.com/cshaizhihao' },
  { type: 'Archive', label: 'Projects', href: '/projects' },
  { type: 'Gateway', label: 'Navigation', href: '/navigation' },
]
const visibleLinks = computed(() => { const source = props.links?.length ? props.links : fallback; return source.filter((item: any) => item.enabled !== false) })
</script>
