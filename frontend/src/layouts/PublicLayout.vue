<template>
  <CustomCssInjector />
  <div class="shell">
    <header class="topbar">
      <nav class="nav-wrap">
        <RouterLink to="/" class="flex items-center gap-3 font-medium tracking-tight">
          <span class="brand-mark">星</span>
          <span class="mono text-xs uppercase tracking-[0.26em] text-stone-600">Nexus / Archive</span>
        </RouterLink>
        <div class="nav-scroll">
          <div class="flex min-w-max items-center gap-1 rounded-full border border-stone-950/10 bg-white/25 p-1">
            <RouterLink class="nav-pill" to="/">首页</RouterLink>
            <RouterLink class="nav-pill" to="/navigation">导航</RouterLink>
            <RouterLink class="nav-pill" to="/projects">项目</RouterLink>
            <RouterLink class="nav-pill" to="/profile">档案</RouterLink>
            <RouterLink class="nav-pill" to="/about">关于</RouterLink>
            <RouterLink class="nav-pill" to="/admin">后台</RouterLink>
          </div>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-[1180px] px-5 py-8 md:py-12">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in"><component :is="Component" /></Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import CustomCssInjector from '../components/CustomCssInjector.vue'
</script>
