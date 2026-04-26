<template>
  <section class="grid gap-6 lg:grid-cols-[280px_1fr]">
    <aside class="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">CMS</p>
      <h1 class="mt-2 text-2xl font-semibold">后台控制台</h1>
      <div class="mt-6 grid gap-2 text-sm text-slate-600">
        <button class="admin-tab active">主页内容</button>
        <button class="admin-tab">导航管理</button>
        <button class="admin-tab">资源上传</button>
        <button class="admin-tab">主题设置</button>
      </div>
    </aside>
    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-sm backdrop-blur-xl">
      <h2 class="text-2xl font-semibold tracking-tight">CMS MVP 占位</h2>
      <p class="mt-3 leading-7 text-slate-600">下一阶段接入 Fastify API，实现主页内容、导航分类、链接和图标上传管理。</p>
    </div>
  </section>
</template>
