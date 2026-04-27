<template>
  <CustomCssInjector />
  <div class="shell">
    <header class="topbar">
      <nav class="nav-wrap">
        <RouterLink to="/" class="brand-inline">
          <span class="brand-mark">星</span>
          <div>
            <p class="mono text-[10px] uppercase tracking-[.26em] text-zinc-500">Nexus</p>
            <p class="text-sm font-semibold tracking-[-0.03em]">Personal Gateway</p>
          </div>
        </RouterLink>
        <div class="nav-minimal nav-scroll">
          <div class="nav-minimal-line">
            <RouterLink class="nav-link nav-link-main" to="/">主页</RouterLink>
            <RouterLink class="nav-link nav-link-main" to="/navigation">导航</RouterLink>
            <RouterLink class="nav-link" to="/projects">项目</RouterLink>
            <RouterLink class="nav-link" to="/profile">档案</RouterLink>
            <RouterLink class="nav-link nav-link-subtle" to="/admin">管理</RouterLink>
          </div>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-[1240px] px-5 py-8 md:py-12">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in"><component :is="Component" /></Transition>
      </RouterView>
    </main>
    <QuickDock />
  </div>
</template>

<script setup lang="ts">
import CustomCssInjector from '../components/CustomCssInjector.vue'
import QuickDock from '../components/QuickDock.vue'
</script>
