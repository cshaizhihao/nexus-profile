<template>
  <div class="quick-dock">
    <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="dock-item">
      <span class="mono text-[10px] text-stone-400">{{ item.no }}</span>
      <span>{{ item.label }}</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
const items = [
  { no: '01', label: '导航', to: '/navigation' },
  { no: '02', label: '项目', to: '/projects' },
  { no: '03', label: '档案', to: '/profile' },
  { no: '04', label: '后台', to: '/admin' },
]
</script>
