<template>
  <section class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <p class="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">Digital identity · Clean profile · Curated links</p>
      <h1 class="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-slate-950">星枢主页，把个人展示与导航入口收束成一个清爽的数字中枢。</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">前后端分离、CMS 可配置、支持背景与自定义 CSS。动效克制，结构清晰，不做廉价长滚动。</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/navigation" class="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl">查看导航</RouterLink>
        <RouterLink to="/admin" class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300">进入后台</RouterLink>
      </div>
    </div>

    <div class="grid gap-4">
      <article v-for="item in cards" :key="item.title" class="rounded-[1.5rem] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70">
        <p class="text-sm text-slate-400">{{ item.kicker }}</p>
        <h2 class="mt-2 text-xl font-semibold tracking-tight">{{ item.title }}</h2>
        <p class="mt-2 leading-7 text-slate-600">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  { kicker: 'CMS', title: '内容完全自定义', desc: '标题、简介、背景、主题变量与自定义 CSS 将由后台统一管理。' },
  { kicker: 'Navigation', title: '多级导航分类', desc: '链接按分类组织，支持本地图标上传与外链图标读取。' },
  { kicker: 'Deploy', title: '开源与部署友好', desc: '内置 Docker Compose 与 VPS 一键安装脚本。' },
]
</script>
