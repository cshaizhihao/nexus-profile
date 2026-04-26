<template>
  <div class="marquee archive-card overflow-hidden py-3">
    <div class="marquee-track mono text-xs uppercase tracking-[0.28em] text-stone-500">
      <span v-for="item in repeated" :key="item">{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const words = ['Digital Identity', 'Curated Links', 'Selected Works', 'Now Status', 'Personal Archive']
const repeated = [...words, ...words, ...words]
</script>
