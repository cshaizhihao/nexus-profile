<template>
  <h1 class="kinetic-title" :aria-label="text">
    <span v-for="(char, index) in chars" :key="index" :style="{ '--i': index }">{{ char === ' ' ? '\u00A0' : char }}</span>
  </h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ text: string }>()
const chars = computed(() => props.text.split(''))
</script>
