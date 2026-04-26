<template>
  <CustomCssInjector />
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef2ff,transparent_32%),linear-gradient(135deg,#f8fafc,#eef2f7)] text-slate-950">
    <header class="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="flex items-center gap-3 font-semibold tracking-tight">
          <span class="grid h-9 w-9 place-items-center rounded-2xl bg-slate-950 text-white shadow-sm">星</span>
          <span>Nexus Profile</span>
        </RouterLink>
        <div class="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-sm text-slate-600">
          <RouterLink class="nav-pill" to="/">主页</RouterLink>
          <RouterLink class="nav-pill" to="/navigation">导航</RouterLink>
          <RouterLink class="nav-pill" to="/projects">项目</RouterLink>
          <RouterLink class="nav-pill" to="/profile">档案</RouterLink>
          <RouterLink class="nav-pill" to="/about">关于</RouterLink>
          <RouterLink class="nav-pill" to="/admin">后台</RouterLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import CustomCssInjector from '../components/CustomCssInjector.vue'
</script>
