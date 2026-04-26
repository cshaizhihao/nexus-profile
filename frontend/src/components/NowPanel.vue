<template>
  <section class="archive-card p-6">
    <p class="kicker">Now board</p>
    <div class="mt-5 grid gap-4 md:grid-cols-3">
      <article v-for="item in visibleItems" :key="item.title" class="rounded-2xl border border-stone-950/10 bg-white/20 p-4" :class="variantClass(item.variant)">
        <p class="mono text-[10px] uppercase tracking-[.2em] text-stone-500">{{ item.kicker }}</p>
        <h3 class="mt-3 text-2xl tracking-[-0.04em]">{{ item.title }}</h3>
        <p class="mt-3 text-sm leading-6 text-stone-600">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ items?: Array<{ kicker: string; title: string; desc: string; enabled?: boolean; variant?: string }> }>()
const fallback = [
  { kicker: 'Focus', title: '整理入口', desc: '把真正高频使用的服务放到清晰位置。', variant: 'default' },
  { kicker: 'Build', title: '沉淀项目', desc: '把作品、工具和长期维护资产整理成作品集。', variant: 'feature' },
  { kicker: 'Taste', title: '保持克制', desc: '动效只引导注意力，不喧宾夺主。', variant: 'default' },
]
const visibleItems = computed(() => {
  const source = props.items?.length ? props.items : fallback
  return source.filter((item: any) => item.enabled !== false)
})
function variantClass(variant?: string) {
  return variant === 'feature'
    ? 'bg-stone-950 text-white border-stone-950 [&_.text-stone-600]:text-white/75 [&_.text-stone-500]:text-white/55'
    : variant === 'soft'
      ? 'bg-amber-50/60'
      : ''
}
</script>
