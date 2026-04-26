<template>
  <section class="grid gap-6 lg:grid-cols-[280px_1fr]">
    <aside class="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">CMS</p>
      <h1 class="mt-2 text-2xl font-semibold">后台控制台</h1>
      <div class="mt-6 grid gap-2 text-sm text-slate-600">
        <button v-for="tab in tabs" :key="tab.key" class="admin-tab" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">{{ tab.label }}</button>
      </div>
    </aside>

    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-sm backdrop-blur-xl">
      <div class="mb-6 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm text-slate-400">Nexus CMS</p>
          <h2 class="text-2xl font-semibold tracking-tight">{{ currentTitle }}</h2>
        </div>
        <button class="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5" @click="loadAll">刷新</button>
      </div>

      <p v-if="message" class="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{{ message }}</p>
      <p v-if="store.error" class="mb-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ store.error }}</p>

      <form v-if="activeTab === 'site'" class="grid gap-4" @submit.prevent="saveSite">
        <label class="field"><span>站点标题</span><input v-model="siteForm.title" /></label>
        <label class="field"><span>副标题</span><input v-model="siteForm.subtitle" /></label>
        <label class="field"><span>简介</span><textarea v-model="siteForm.description" rows="4" /></label>
        <label class="field"><span>头像 URL</span><input v-model="siteForm.avatarUrl" placeholder="https://..." /></label>
        <label class="field"><span>背景类型</span><select v-model="siteForm.backgroundType"><option value="color">纯色</option><option value="image">图片</option><option value="gradient">渐变</option></select></label>
        <label class="field"><span>背景值</span><input v-model="siteForm.backgroundValue" placeholder="#f8fafc 或图片 URL" /></label>
        <label class="field"><span>自定义 CSS</span><textarea v-model="siteForm.customCss" rows="7" placeholder=":root { --brand: #0f172a; }" /></label>
        <button class="primary-btn">保存主页配置</button>
      </form>

      <div v-else-if="activeTab === 'categories'" class="grid gap-6">
        <form class="grid gap-4 md:grid-cols-[1fr_160px_auto]" @submit.prevent="saveCategory">
          <label class="field"><span>分类名称</span><input v-model="categoryForm.name" placeholder="常用服务" /></label>
          <label class="field"><span>排序</span><input v-model.number="categoryForm.sortOrder" type="number" /></label>
          <button class="primary-btn self-end">新增分类</button>
        </form>
        <div class="grid gap-3">
          <article v-for="category in store.categories" :key="category.id" class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-4">
            <div><h3 class="font-semibold">{{ category.name }}</h3><p class="text-sm text-slate-400">排序：{{ category.sortOrder }}</p></div>
            <button class="danger-btn" @click="removeCategory(category.id)">删除</button>
          </article>
        </div>
      </div>

      <div v-else class="grid gap-6">
        <form class="grid gap-4 md:grid-cols-2" @submit.prevent="saveLink">
          <label class="field"><span>所属分类</span><select v-model.number="linkForm.categoryId"><option v-for="category in store.categories" :key="category.id" :value="category.id">{{ category.name }}</option></select></label>
          <label class="field"><span>标题</span><input v-model="linkForm.title" placeholder="GitHub" /></label>
          <label class="field md:col-span-2"><span>URL</span><input v-model="linkForm.url" placeholder="https://github.com" /></label>
          <label class="field md:col-span-2"><span>描述</span><textarea v-model="linkForm.description" rows="3" /></label>
          <label class="field"><span>图标 URL</span><input v-model="linkForm.iconUrl" placeholder="https://..." /></label>
          <label class="field"><span>排序</span><input v-model.number="linkForm.sortOrder" type="number" /></label>
          <label class="flex items-center gap-3 text-sm text-slate-600"><input v-model="linkForm.isVisible" type="checkbox" /> 前台显示</label>
          <button class="primary-btn md:col-span-2">新增链接</button>
        </form>
        <div class="grid gap-3">
          <article v-for="link in store.links" :key="link.id" class="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4">
            <div><h3 class="font-semibold">{{ link.title }}</h3><p class="break-all text-sm text-slate-400">{{ link.url }}</p></div>
            <button class="danger-btn" @click="removeLink(link.id)">删除</button>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { api } from '../api/client'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const activeTab = ref<'site' | 'categories' | 'links'>('site')
const message = ref('')
const tabs = [
  { key: 'site', label: '主页内容' },
  { key: 'categories', label: '导航分类' },
  { key: 'links', label: '链接管理' },
] as const
const currentTitle = computed(() => tabs.find((tab) => tab.key === activeTab.value)?.label || '后台控制台')

const siteForm = reactive({ title: '', subtitle: '', description: '', avatarUrl: '', backgroundType: 'color', backgroundValue: '#f8fafc', customCss: '' })
const categoryForm = reactive({ name: '', sortOrder: 0 })
const linkForm = reactive({ categoryId: 0, title: '', url: '', description: '', iconUrl: '', iconType: 'external', sortOrder: 0, isVisible: true })

watch(() => store.siteConfig, (config) => {
  if (!config) return
  Object.assign(siteForm, {
    title: config.title,
    subtitle: config.subtitle,
    description: config.description,
    avatarUrl: config.avatarUrl || '',
    backgroundType: config.backgroundType,
    backgroundValue: config.backgroundValue,
    customCss: config.customCss,
  })
}, { immediate: true })

watch(() => store.categories, (categories) => {
  if (!linkForm.categoryId && categories[0]) linkForm.categoryId = categories[0].id
}, { immediate: true })

async function loadAll() { await store.loadAll() }
function flash(text: string) { message.value = text; setTimeout(() => (message.value = ''), 2200) }

async function saveSite() {
  await api.updateSiteConfig(siteForm)
  await loadAll()
  flash('主页配置已保存')
}

async function saveCategory() {
  await api.createCategory({ ...categoryForm })
  categoryForm.name = ''
  categoryForm.sortOrder = 0
  await loadAll()
  flash('导航分类已新增')
}

async function removeCategory(id: number) {
  await api.deleteCategory(id)
  await loadAll()
  flash('导航分类已删除')
}

async function saveLink() {
  await api.createLink({ ...linkForm })
  Object.assign(linkForm, { title: '', url: '', description: '', iconUrl: '', sortOrder: 0, isVisible: true })
  await loadAll()
  flash('导航链接已新增')
}

async function removeLink(id: number) {
  await api.deleteLink(id)
  await loadAll()
  flash('导航链接已删除')
}

onMounted(loadAll)
</script>
