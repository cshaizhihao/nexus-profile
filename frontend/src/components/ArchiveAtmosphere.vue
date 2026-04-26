<template>
  <div class="atmosphere" aria-hidden="true">
    <div class="orb orb-a" />
    <div class="orb orb-b" />
    <div class="orb orb-c" />
    <div class="scanline" />
    <div class="constellation">
      <span v-for="i in 18" :key="i" :style="dotStyle(i)" />
    </div>
  </div>
</template>

<script setup lang="ts">
function dotStyle(i: number) {
  const x = (i * 37) % 100
  const y = (i * 61) % 100
  const delay = (i % 7) * 0.4
  return { left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }
}
</script>
