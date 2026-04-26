<template><div ref="aura" class="cursor-aura" aria-hidden="true" /></template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
const aura = ref<HTMLElement | null>(null)
let raf = 0
let x = 0, y = 0, tx = 0, ty = 0
function move(e: PointerEvent) { tx = e.clientX; ty = e.clientY }
function tick() {
  x += (tx - x) * 0.14
  y += (ty - y) * 0.14
  if (aura.value) aura.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
  raf = requestAnimationFrame(tick)
}
onMounted(() => { window.addEventListener('pointermove', move); raf = requestAnimationFrame(tick) })
onBeforeUnmount(() => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) })
</script>
