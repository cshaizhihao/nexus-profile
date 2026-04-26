<template>
  <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-10 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">Profile</p>
      <h1 class="mt-2 text-4xl font-semibold tracking-[-0.03em]">个人档案</h1>
      <p class="mt-5 leading-8 text-slate-600">这里用于承载个人简介、身份标签、社交链接、技术栈和当前状态。当前为产品化占位，下一阶段接入 CMS。</p>
    </div>
    <div class="grid gap-4">
      <article class="bento-card"><h2 class="text-xl font-semibold">身份标签</h2><p class="mt-3 text-slate-500">Developer · Creator · Builder</p></article>
      <article class="bento-card"><h2 class="text-xl font-semibold">当前状态</h2><p class="mt-3 text-slate-500">正在构建一个更完整的个人主页系统。</p></article>
      <article class="bento-card"><h2 class="text-xl font-semibold">技术栈</h2><p class="mt-3 text-slate-500">Vue · Fastify · Prisma · Docker · Nginx</p></article>
    </div>
  </section>
</template>
