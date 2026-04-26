<template>
  <div class="grid gap-4 md:grid-cols-3">
    <article class="bento-card md:col-span-2">
      <p class="text-sm text-slate-400">Profile Mode</p>
      <h2 class="mt-3 text-2xl font-semibold tracking-tight">个人展示、导航入口、项目索引合为一体。</h2>
      <p class="mt-3 leading-7 text-slate-500">通过后台配置内容、主题、CSS 与链接，让主页从静态展示变成可维护的个人中枢。</p>
    </article>
    <article class="bento-card">
      <p class="text-sm text-slate-400">Links</p>
      <h2 class="mt-3 text-4xl font-semibold tracking-tight">{{ linkCount }}</h2>
      <p class="mt-2 text-sm text-slate-500">已收录导航链接</p>
    </article>
    <article class="bento-card">
      <p class="text-sm text-slate-400">CMS</p>
      <h2 class="mt-3 text-xl font-semibold">后台可视化维护</h2>
    </article>
    <article class="bento-card md:col-span-2">
      <p class="text-sm text-slate-400">Theme</p>
      <h2 class="mt-3 text-xl font-semibold">极简浅色 / 深空暗色 / 暖纸质感 / Mono Dark</h2>
    </article>
  </div>
</template>

<script setup lang="ts">
defineProps<{ linkCount: number }>()
</script>
