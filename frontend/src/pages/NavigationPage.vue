<template>
  <section>
    <div class="mb-8 flex items-end justify-between gap-4">
      <div>
        <p class="text-sm text-slate-400">Curated links</p>
        <h1 class="mt-2 text-4xl font-semibold tracking-[-0.03em]">结构化导航</h1>
      </div>
      <input class="w-64 rounded-full border border-slate-200 bg-white/80 px-5 py-3 outline-none transition focus:border-slate-400" placeholder="搜索链接..." />
    </div>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="link in links" :key="link.title" class="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl">
        <div class="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">{{ link.icon }}</div>
        <h2 class="text-lg font-semibold">{{ link.title }}</h2>
        <p class="mt-2 text-sm leading-6 text-slate-500">{{ link.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const links = [
  { icon: 'G', title: 'GitHub', desc: '代码仓库与开源项目入口。' },
  { icon: 'D', title: 'Docs', desc: '个人知识库、文档与笔记。' },
  { icon: 'S', title: 'Services', desc: '常用服务与系统面板。' },
]
</script>
