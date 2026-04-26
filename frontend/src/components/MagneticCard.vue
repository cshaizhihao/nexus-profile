<template>
  <div ref="el" class="magnetic-wrap" @pointermove="onMove" @pointerleave="onLeave">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const el = ref<HTMLElement | null>(null)
function onMove(event: PointerEvent) {
  if (!el.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const rect = el.value.getBoundingClientRect()
  const x = event.clientX - rect.left - rect.width / 2
  const y = event.clientY - rect.top - rect.height / 2
  el.value.style.transform = `translate3d(${x * 0.025}px, ${y * 0.025}px, 0)`
}
function onLeave() {
  if (!el.value) return
  el.value.style.transform = 'translate3d(0, 0, 0)'
}
</script>
