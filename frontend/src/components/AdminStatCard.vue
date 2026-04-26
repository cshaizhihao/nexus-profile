<template>
  <article class="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
    <p class="text-sm text-slate-400">{{ label }}</p>
    <p class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{{ value }}</p>
    <p v-if="hint" class="mt-2 text-sm text-slate-500">{{ hint }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; hint?: string }>()
</script>
