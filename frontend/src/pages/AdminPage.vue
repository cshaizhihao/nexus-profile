<template>
  <section class="grid gap-6 lg:grid-cols-[280px_1fr]">
    <aside class="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
      <p class="text-sm text-slate-400">CMS</p>
      <h1 class="mt-2 text-2xl font-semibold">后台控制台</h1>
      <div v-if="loggedIn" class="mt-6 grid gap-2 text-sm text-slate-600">
        <button v-for="tab in tabs" :key="tab.key" class="admin-tab" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">{{ tab.label }}</button>
        <button class="admin-tab" @click="logout">退出登录</button>
      </div>
    </aside>

    <div class="rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-sm backdrop-blur-xl">
      <div v-if="!loggedIn" class="mx-auto max-w-md">
        <p class="text-sm text-slate-400">Admin Login</p>
        <h2 class="mt-2 text-3xl font-semibold tracking-tight">登录后台</h2>
        <p class="mt-3 leading-7 text-slate-500">请输入部署时配置的后台密码。未登录状态只能浏览前台，不能修改内容。</p>
        <form class="mt-6 grid gap-4" @submit.prevent="login">
          <label class="field"><span>后台密码</span><input v-model="password" type="password" autocomplete="current-password" /></label>
          <button class="primary-btn">登录</button>
        </form>
      </div>

      <template v-else>
        <div class="mb-6 flex items-center justify-between gap-4">
          <div><p class="text-sm text-slate-400">Nexus CMS</p><h2 class="text-2xl font-semibold tracking-tight">{{ currentTitle }}</h2></div>
          <button class="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5" @click="loadAll">刷新</button>
        </div>

        <p v-if="message" class="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{{ message }}</p>
        <p v-if="store.error" class="mb-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ store.error }}</p>

        <form v-if="activeTab === 'site'" class="grid gap-4" @submit.prevent="saveSite">
          <div class="grid gap-3 md:grid-cols-4">
            <button v-for="theme in themes" :key="theme.name" type="button" class="ghost-btn text-left" @click="applyTheme(theme)">{{ theme.name }}</button>
          </div>
          <label class="field"><span>站点标题</span><input v-model="siteForm.title" /></label>
          <label class="field"><span>副标题</span><input v-model="siteForm.subtitle" /></label>
          <label class="field"><span>简介</span><textarea v-model="siteForm.description" rows="4" /></label>
          <label class="field"><span>头像 URL</span><input v-model="siteForm.avatarUrl" placeholder="https://... 或 /uploads/xxx.png" /></label>
          <label class="field"><span>上传头像/图标</span><input type="file" accept="image/*" @change="uploadSiteAvatar" /></label>
          <label class="field"><span>背景类型</span><select v-model="siteForm.backgroundType"><option value="color">纯色</option><option value="image">图片</option><option value="gradient">渐变</option></select></label>
          <label class="field"><span>背景值</span><input v-model="siteForm.backgroundValue" placeholder="#f8fafc 或图片 URL" /></label>
          <label class="field"><span>自定义 CSS</span><textarea v-model="siteForm.customCss" rows="7" placeholder=".nav-pill { border-radius: 14px; }" /></label>
          <button class="primary-btn">保存主页配置</button>
        </form>

        <div v-else-if="activeTab === 'categories'" class="grid gap-6">
          <form class="grid gap-4 md:grid-cols-[1fr_160px_auto]" @submit.prevent="saveCategory">
            <label class="field"><span>分类名称</span><input v-model="categoryForm.name" placeholder="常用服务" /></label>
            <label class="field"><span>排序</span><input v-model.number="categoryForm.sortOrder" type="number" /></label>
            <button class="primary-btn self-end">{{ editingCategoryId ? '保存分类' : '新增分类' }}</button>
          </form>
          <div class="grid gap-3"><article v-for="category in store.categories" :key="category.id" class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-4"><div><h3 class="font-semibold">{{ category.name }}</h3><p class="text-sm text-slate-400">排序：{{ category.sortOrder }}</p></div><div class="flex gap-2"><button class="ghost-btn" @click="editCategory(category)">编辑</button><button class="danger-btn" @click="removeCategory(category.id)">删除</button></div></article></div>
        </div>

        <div v-else class="grid gap-6">
          <div class="flex flex-wrap gap-3"><button class="primary-btn" @click="checkAllLinks">检测全部链接</button><RouterLink to="/navigation" class="ghost-btn">预览导航页</RouterLink></div>
          <form class="grid gap-4 md:grid-cols-2" @submit.prevent="saveLink">
            <label class="field"><span>所属分类</span><select v-model.number="linkForm.categoryId"><option v-for="category in store.categories" :key="category.id" :value="category.id">{{ category.name }}</option></select></label>
            <label class="field"><span>标题</span><input v-model="linkForm.title" placeholder="GitHub" /></label>
            <label class="field md:col-span-2"><span>URL</span><input v-model="linkForm.url" placeholder="https://github.com" /></label>
            <label class="field md:col-span-2"><span>描述</span><textarea v-model="linkForm.description" rows="3" /></label>
            <label class="field"><span>图标 URL</span><input v-model="linkForm.iconUrl" placeholder="https://... 或 /uploads/xxx.png" /></label>
            <label class="field"><span>上传图标</span><input type="file" accept="image/*" @change="uploadLinkIcon" /></label>
            <label class="field"><span>排序</span><input v-model.number="linkForm.sortOrder" type="number" /></label>
            <label class="flex items-center gap-3 text-sm text-slate-600"><input v-model="linkForm.isVisible" type="checkbox" /> 前台显示</label>
            <button class="primary-btn md:col-span-2">{{ editingLinkId ? '保存链接' : '新增链接' }}</button>
            <button v-if="editingLinkId" type="button" class="ghost-btn md:col-span-2" @click="resetLinkForm">取消编辑</button>
          </form>
          <div class="grid gap-3"><article v-for="link in store.links" :key="link.id" class="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4"><div class="flex items-center gap-3"><img v-if="link.iconUrl" :src="link.iconUrl" class="h-10 w-10 rounded-xl object-cover" /><div><h3 class="font-semibold">{{ link.title }}</h3><p class="break-all text-sm text-slate-400">{{ link.url }}</p><p class="mt-1 text-xs text-slate-400">状态：<span :class="healthClass(link.healthStatus)">{{ healthLabel(link.healthStatus) }}</span><span v-if="link.healthCode"> · {{ link.healthCode }}</span></p></div></div><div class="flex gap-2"><button class="ghost-btn" @click="checkLink(link.id)">检测</button><button class="ghost-btn" @click="editLink(link)">编辑</button><button class="danger-btn" @click="removeLink(link.id)">删除</button></div></article></div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { api, auth, type NavCategory, type NavLink } from '../api/client'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const activeTab = ref<'site' | 'categories' | 'links'>('site')
const message = ref('')
const password = ref('')
const loggedIn = ref(auth.isLoggedIn())
const editingCategoryId = ref<number | null>(null)
const editingLinkId = ref<number | null>(null)
const tabs = [{ key: 'site', label: '主页内容' }, { key: 'categories', label: '导航分类' }, { key: 'links', label: '链接管理' }] as const
const themes = [
  { name: '极简浅色', backgroundType: 'color', backgroundValue: '#f8fafc', customCss: '' },
  { name: '深空暗色', backgroundType: 'gradient', backgroundValue: 'linear-gradient(135deg,#020617,#111827)', customCss: 'body { color-scheme: dark; } .bg-white\\/75,.bg-white\\/70 { background: rgba(15,23,42,.72); color: #e5e7eb; border-color: rgba(148,163,184,.24); } .text-slate-950 { color: #f8fafc; } .text-slate-600,.text-slate-500 { color: #cbd5e1; }' },
  { name: '暖纸质感', backgroundType: 'color', backgroundValue: '#f7f1e8', customCss: '.rounded-\\[2rem\\] { box-shadow: 0 24px 80px rgba(120,83,45,.08); }' },
  { name: 'Mono Dark', backgroundType: 'color', backgroundValue: '#0a0a0a', customCss: ':root { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; } body { color-scheme: dark; } .bg-white\\/75,.bg-white\\/70 { background: rgba(24,24,27,.78); color: #f4f4f5; border-color: rgba(113,113,122,.28); } .text-slate-950 { color: #fafafa; } .text-slate-600,.text-slate-500 { color: #d4d4d8; }' },
]
const currentTitle = computed(() => tabs.find((tab) => tab.key === activeTab.value)?.label || '后台控制台')
const siteForm = reactive({ title: '', subtitle: '', description: '', avatarUrl: '', backgroundType: 'color', backgroundValue: '#f8fafc', customCss: '' })
const categoryForm = reactive({ name: '', sortOrder: 0 })
const linkForm = reactive({ categoryId: 0, title: '', url: '', description: '', iconUrl: '', iconType: 'external', sortOrder: 0, isVisible: true })

watch(() => store.siteConfig, (config) => { if (config) Object.assign(siteForm, { title: config.title, subtitle: config.subtitle, description: config.description, avatarUrl: config.avatarUrl || '', backgroundType: config.backgroundType, backgroundValue: config.backgroundValue, customCss: config.customCss }) }, { immediate: true })
watch(() => store.categories, (categories) => { if (!linkForm.categoryId && categories[0]) linkForm.categoryId = categories[0].id }, { immediate: true })
async function loadAll() { await store.loadAll() }
function flash(text: string) { message.value = text; setTimeout(() => (message.value = ''), 2200) }
async function login() { const res = await api.login(password.value); auth.setToken(res.token); loggedIn.value = true; password.value = ''; await loadAll(); flash('登录成功') }
function logout() { auth.clear(); loggedIn.value = false; flash('已退出登录') }
function applyTheme(theme: { backgroundType: string; backgroundValue: string; customCss: string }) { Object.assign(siteForm, theme); flash('主题已应用，保存后生效') }
async function upload(file: File | undefined) { if (!file) return ''; const asset = await api.uploadIcon(file); return asset.path }
async function uploadSiteAvatar(event: Event) { const path = await upload((event.target as HTMLInputElement).files?.[0]); if (path) { siteForm.avatarUrl = path; flash('头像已上传') } }
async function uploadLinkIcon(event: Event) { const path = await upload((event.target as HTMLInputElement).files?.[0]); if (path) { linkForm.iconUrl = path; flash('图标已上传') } }
async function saveSite() { await api.updateSiteConfig(siteForm); await loadAll(); flash('主页配置已保存') }
function editCategory(category: NavCategory) { editingCategoryId.value = category.id; Object.assign(categoryForm, { name: category.name, sortOrder: category.sortOrder }) }
async function saveCategory() { editingCategoryId.value ? await api.updateCategory(editingCategoryId.value, { ...categoryForm }) : await api.createCategory({ ...categoryForm }); editingCategoryId.value = null; Object.assign(categoryForm, { name: '', sortOrder: 0 }); await loadAll(); flash('导航分类已保存') }
async function removeCategory(id: number) { await api.deleteCategory(id); await loadAll(); flash('导航分类已删除') }
function editLink(link: NavLink) { editingLinkId.value = link.id; Object.assign(linkForm, { categoryId: link.categoryId, title: link.title, url: link.url, description: link.description, iconUrl: link.iconUrl || '', iconType: link.iconType, sortOrder: link.sortOrder, isVisible: link.isVisible }) }
function resetLinkForm() { editingLinkId.value = null; Object.assign(linkForm, { categoryId: store.categories[0]?.id || 0, title: '', url: '', description: '', iconUrl: '', iconType: 'external', sortOrder: 0, isVisible: true }) }
async function saveLink() { editingLinkId.value ? await api.updateLink(editingLinkId.value, { ...linkForm }) : await api.createLink({ ...linkForm }); resetLinkForm(); await loadAll(); flash('导航链接已保存') }
async function checkLink(id: number) { await api.checkLink(id); await loadAll(); flash('链接检测完成') }
async function checkAllLinks() { await api.checkAllLinks(); await loadAll(); flash('全部链接检测完成') }
function healthLabel(status: string) { return { ok: '正常', broken: '失效', timeout: '超时', unknown: '未检测' }[status] || status }
function healthClass(status: string) { return status === 'ok' ? 'text-emerald-600' : status === 'unknown' ? 'text-slate-400' : 'text-rose-600' }
async function removeLink(id: number) { await api.deleteLink(id); await loadAll(); flash('导航链接已删除') }
onMounted(loadAll)
</script>
