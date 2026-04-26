<template>
  <section class="grid gap-6">
    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-10 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">Projects</p>
      <h1 class="mt-2 text-4xl font-semibold tracking-[-0.03em]">项目作品</h1>
      <p class="mt-4 max-w-2xl leading-8 text-slate-600">这里将用于展示精选项目、开源仓库、作品案例和长期维护的数字资产。下一阶段会接入后台项目管理。</p>
    </div>
    <div class="grid gap-5 md:grid-cols-3">
      <article v-for="item in projects" :key="item.title" class="bento-card">
        <p class="text-sm text-slate-400">{{ item.type }}</p>
        <h2 class="mt-3 text-xl font-semibold">{{ item.title }}</h2>
        <p class="mt-3 leading-7 text-slate-500">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  { type: 'Open Source', title: 'Nexus Profile', desc: '可后台管理、可自部署的个人主页与导航 CMS。' },
  { type: 'CMS', title: 'Navigation Hub', desc: '多级分类、链接健康检测、图标上传与主题配置。' },
  { type: 'Roadmap', title: 'Digital Identity', desc: '后续将扩展 Profile、Now、Portfolio 与多展示模式。' },
]
</script>
