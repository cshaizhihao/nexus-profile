<template></template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const style = document.createElement('style')
style.dataset.nexusCustomCss = 'true'
document.head.appendChild(style)

watch(
  () => store.siteConfig?.customCss,
  (css) => {
    style.textContent = css || ''
  },
  { immediate: true },
)

onBeforeUnmount(() => style.remove())
</script>
