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
    const value = store.siteConfig?.backgroundValue || ''
    const isDark = value.includes('#0') || value.includes('#111') || value.includes('#020617') || (css || '').includes('color-scheme: dark')
    document.documentElement.classList.toggle('dark-archive', isDark)
    document.body.classList.toggle('dark-archive', isDark)
  },
  { immediate: true },
)

onBeforeUnmount(() => style.remove())
</script>
