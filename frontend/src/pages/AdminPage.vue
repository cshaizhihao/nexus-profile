<template>
  <section class="grid gap-6 lg:grid-cols-[280px_1fr]">
    <aside class="admin-side rounded-[2rem] p-6">
      <p class="kicker">CMS</p>
      <h1 class="mt-3 text-3xl font-medium tracking-[-0.05em]">后台控制台</h1>
      <div v-if="loggedIn" class="mt-6 grid gap-2 text-sm text-slate-600">
        <button v-for="tab in tabs" :key="tab.key" class="admin-tab" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">{{ tab.label }}</button>
        <button class="admin-tab" @click="logout">退出登录</button>
      </div>
    </aside>

    <div class="admin-shell-card rounded-[2rem] p-8">
      <div v-if="!loggedIn" class="mx-auto max-w-md">
        <p class="kicker">Admin Login</p>
        <h2 class="mt-3 text-5xl font-medium tracking-[-0.06em]">登录后台</h2>
        <p class="mt-3 leading-7 text-slate-500">请输入部署时配置的后台密码。未登录状态只能浏览前台，不能修改内容。</p>
        <form class="mt-6 grid gap-4" @submit.prevent="login">
          <label class="field"><span>后台密码</span><input v-model="password" type="password" autocomplete="current-password" /></label>
          <button class="primary-btn">登录</button>
        </form>
      </div>

      <template v-else>
        <div class="mb-6 flex items-center justify-between gap-4">
          <div><p class="kicker">Nexus CMS</p><h2 class="mt-2 text-4xl font-medium tracking-[-0.05em]">{{ currentTitle }}</h2></div>
          <button class="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5" @click="loadAll">刷新</button>
        </div>

        <p v-if="message" class="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{{ message }}</p>
        <p v-if="store.error" class="mb-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ store.error }}</p>

        <div v-if="activeTab === 'overview'" class="grid gap-6">
          <div class="grid gap-4 md:grid-cols-3">
            <AdminStatCard label="导航分类" :value="store.categories.length" hint="当前已配置分类" />
            <AdminStatCard label="导航链接" :value="store.links.length" hint="包含隐藏链接" />
            <AdminStatCard label="可见链接" :value="store.visibleLinks.length" hint="前台展示数量" />
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <button class="primary-btn" @click="activeTab = 'site'">编辑主页内容</button>
            <button class="primary-btn" @click="activeTab = 'links'">管理导航链接</button>
            <RouterLink to="/" class="ghost-btn text-center">预览前台首页</RouterLink>
          </div>
          <div class="archive-card p-6">
            <h3 class="text-lg font-semibold">产品完整度提醒</h3>
            <ul class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
              <li>· 首页已完成产品化叙事入口，下一步补真实内容模块。</li>
              <li>· 后台已具备登录保护，生产环境请定期更换密码。</li>
              <li>· 开源文档已补齐基础文件，下一步补截图与 Release。</li>
            </ul>
          </div>
        </div>

        <form v-else-if="activeTab === 'site'" class="grid gap-4" @submit.prevent="saveSite">
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
          <div class="grid gap-3"><article v-for="category in store.categories" :key="category.id" class="flex items-center justify-between rounded-2xl border border-stone-950/10 bg-white/25 p-4"><div><h3 class="font-semibold">{{ category.name }}</h3><p class="text-sm text-slate-400">排序：{{ category.sortOrder }}</p></div><div class="flex gap-2"><button class="ghost-btn" @click="editCategory(category)">编辑</button><button class="danger-btn" @click="removeCategory(category.id)">删除</button></div></article></div>
        </div>

        <div v-else-if="activeTab === 'links'" class="grid gap-6">
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
          <div class="grid gap-3"><article v-for="link in store.links" :key="link.id" class="flex items-center justify-between gap-4 rounded-2xl border border-stone-950/10 bg-white/25 p-4"><div class="flex items-center gap-3"><img v-if="link.iconUrl" :src="link.iconUrl" class="h-10 w-10 rounded-xl object-cover" /><div><h3 class="font-semibold">{{ link.title }}</h3><p class="break-all text-sm text-slate-400">{{ link.url }}</p><p class="mt-1 text-xs text-slate-400">状态：<span :class="healthClass(link.healthStatus)">{{ healthLabel(link.healthStatus) }}</span><span v-if="link.healthCode"> · {{ link.healthCode }}</span></p></div></div><div class="flex gap-2"><button class="ghost-btn" @click="checkLink(link.id)">检测</button><button class="ghost-btn" @click="editLink(link)">编辑</button><button class="danger-btn" @click="removeLink(link.id)">删除</button></div></article></div>
        </div>

        <form v-else-if="activeTab === 'profile'" class="grid gap-5" @submit.prevent="saveProfile">
          <label class="field"><span>档案标题</span><input v-model="profileForm.headline" /></label>
          <label class="field"><span>个人简介</span><textarea v-model="profileForm.bio" rows="4" /></label>
          <label class="field"><span>当前状态</span><input v-model="profileForm.status" /></label>
          <label class="field"><span>身份标签，逗号分隔</span><input v-model="profileForm.tags" /></label>
          <label class="field"><span>技术栈，逗号分隔</span><input v-model="profileForm.techStack" /></label>

          <section class="archive-card p-5">
            <div class="mb-4 flex items-center justify-between"><div><p class="kicker">Social links</p><h3 class="mt-2 text-2xl tracking-[-0.04em]">社交入口</h3></div><button type="button" class="ghost-btn" @click="addSocial">新增</button></div>
            <div class="grid gap-3">
              <div v-for="(item, index) in socialItems" :key="index" class="grid gap-3 rounded-2xl border border-stone-950/10 bg-white/20 p-4 md:grid-cols-[110px_1fr_1fr_auto]">
                <input v-model="item.type" class="rounded-xl border border-stone-950/10 bg-white/50 px-3 py-2" placeholder="类型" />
                <input v-model="item.label" class="rounded-xl border border-stone-950/10 bg-white/50 px-3 py-2" placeholder="名称" />
                <input v-model="item.href" class="rounded-xl border border-stone-950/10 bg-white/50 px-3 py-2" placeholder="链接" />
                <div class="flex flex-wrap gap-2">
                  <label class="flex items-center gap-2 text-xs text-stone-500"><input v-model="item.enabled" type="checkbox" />显示</label>
                  <button type="button" class="ghost-btn" @click="moveSocial(index, -1)">上移</button>
                  <button type="button" class="ghost-btn" @click="moveSocial(index, 1)">下移</button>
                  <button type="button" class="danger-btn" @click="removeSocial(index)">删除</button>
                </div>
              </div>
            </div>
          </section>

          <section class="archive-card p-5">
            <div class="mb-4 flex items-center justify-between"><div><p class="kicker">Now board</p><h3 class="mt-2 text-2xl tracking-[-0.04em]">当前关注</h3></div><button type="button" class="ghost-btn" @click="addNow">新增</button></div>
            <div class="grid gap-3">
              <div v-for="(item, index) in nowBlocks" :key="index" class="grid gap-3 rounded-2xl border border-stone-950/10 bg-white/20 p-4">
                <div class="grid gap-3 md:grid-cols-2">
                  <input v-model="item.kicker" class="rounded-xl border border-stone-950/10 bg-white/50 px-3 py-2" placeholder="Kicker" />
                  <input v-model="item.title" class="rounded-xl border border-stone-950/10 bg-white/50 px-3 py-2" placeholder="标题" />
                </div>
                <textarea v-model="item.desc" class="rounded-xl border border-stone-950/10 bg-white/50 px-3 py-2" rows="3" placeholder="描述" />
                <div class="flex flex-wrap gap-2">
                  <label class="flex items-center gap-2 text-xs text-stone-500"><input v-model="item.enabled" type="checkbox" />显示</label>
                  <button type="button" class="ghost-btn" @click="moveNow(index, -1)">上移</button>
                  <button type="button" class="ghost-btn" @click="moveNow(index, 1)">下移</button>
                  <button type="button" class="danger-btn" @click="removeNow(index)">删除</button>
                </div>
              </div>
            </div>
          </section>

          <section class="archive-card p-5">
            <div class="mb-4 flex items-center justify-between"><div><p class="kicker">Live preview</p><h3 class="mt-2 text-2xl tracking-[-0.04em]">首页预览</h3></div></div>
            <div class="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
              <div class="rounded-[1.75rem] border border-stone-950/10 bg-white/20 p-5">
                <p class="kicker">Hero</p>
                <h4 class="mt-4 text-4xl tracking-[-0.05em]">{{ siteForm.title || "Zaki Archive" }}</h4>
                <p class="mt-3 text-stone-600">{{ profileForm.bio || "个人数字档案主页" }}</p>
                <div class="mt-5 grid gap-3 md:grid-cols-3">
                  <div v-for="(item, index) in nowBlocks.filter(i => i.enabled !== false).slice(0,3)" :key="index" class="rounded-2xl border border-stone-950/10 bg-white/20 p-3">
                    <p class="mono text-[10px] uppercase tracking-[.2em] text-stone-500">{{ item.kicker }}</p>
                    <p class="mt-2 text-lg tracking-[-0.03em]">{{ item.title }}</p>
                  </div>
                </div>
              </div>
              <div class="rounded-[1.75rem] border border-stone-950/10 bg-white/20 p-5">
                <p class="kicker">Social</p>
                <div class="mt-4 grid gap-3">
                  <div v-for="(item, index) in socialItems.filter(i => i.enabled !== false).slice(0,4)" :key="index" class="rounded-2xl border border-stone-950/10 bg-white/20 p-3">
                    <p class="mono text-[10px] uppercase tracking-[.2em] text-stone-500">{{ item.type }}</p>
                    <p class="mt-2 text-lg tracking-[-0.03em]">{{ item.label }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <button class="primary-btn">保存个人档案</button>
        </form>

        <div v-else-if="activeTab === 'projects'" class="grid gap-6">
          <form class="grid gap-4 md:grid-cols-2" @submit.prevent="saveProject">
            <label class="field"><span>项目标题</span><input v-model="projectForm.title" /></label>
            <label class="field"><span>类型</span><input v-model="projectForm.type" /></label>
            <label class="field md:col-span-2"><span>描述</span><textarea v-model="projectForm.description" rows="3" /></label>
            <label class="field"><span>链接</span><input v-model="projectForm.url" /></label>
            <label class="field"><span>封面图</span><input v-model="projectForm.imageUrl" /></label>
            <label class="field"><span>排序</span><input v-model.number="projectForm.sortOrder" type="number" /></label>
            <label class="flex items-center gap-3 text-sm text-slate-600"><input v-model="projectForm.isFeatured" type="checkbox" /> 精选展示</label>
            <button class="primary-btn md:col-span-2">{{ editingProjectId ? '保存项目' : '新增项目' }}</button>
          </form>
          <article v-for="project in store.projects" :key="project.id" class="flex items-center justify-between rounded-2xl border border-stone-950/10 bg-white/25 p-4">
            <div><h3 class="font-semibold">{{ project.title }}</h3><p class="text-sm text-slate-400">{{ project.type }}</p></div>
            <div class="flex gap-2"><button class="ghost-btn" @click="editProject(project)">编辑</button><button class="danger-btn" @click="removeProject(project.id)">删除</button></div>
          </article>
        </div>

        <div v-else-if="activeTab === 'data'" class="grid gap-4">
          <p class="leading-7 text-slate-600">导出当前站点配置、个人档案、导航与项目数据，用于备份或迁移。</p>
          <button class="primary-btn" @click="exportData">导出 JSON</button>
          <textarea v-if="exportText" class="min-h-80 rounded-2xl border border-stone-950/10 bg-white/25 p-4 font-mono text-xs" :value="exportText" readonly />
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import AdminStatCard from '../components/AdminStatCard.vue'
import { api, auth, contentApi, type NavCategory, type NavLink, type Project } from '../api/client'
import { useSiteStore } from '../stores/site'

const store = useSiteStore()
const activeTab = ref<'overview' | 'site' | 'categories' | 'links' | 'profile' | 'projects' | 'data'>('overview')
const message = ref('')
const password = ref('')
const loggedIn = ref(auth.isLoggedIn())
const editingCategoryId = ref<number | null>(null)
const editingLinkId = ref<number | null>(null)
const editingProjectId = ref<number | null>(null)
const exportText = ref('')
const socialItems = ref<Array<{ type: string; label: string; href: string; enabled?: boolean }>>([])
const nowBlocks = ref<Array<{ kicker: string; title: string; desc: string; enabled?: boolean }>>([])
const tabs = [{ key: 'overview', label: '概览' }, { key: 'site', label: '主页内容' }, { key: 'categories', label: '导航分类' }, { key: 'links', label: '链接管理' }, { key: 'profile', label: '个人档案' }, { key: 'projects', label: '项目作品' }, { key: 'data', label: '数据导出' }] as const
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
const profileForm = reactive({
  headline: '',
  bio: '',
  status: '',
  tags: '',
  techStack: '',
  socialLinks: '[{"type":"Code","label":"GitHub","href":"https://github.com/cshaizhihao"}]',
  nowItems: '[{"kicker":"Focus","title":"整理入口","desc":"把真正高频使用的服务放到清晰位置。"}]',
})
const projectForm = reactive({ title: '', type: 'Project', description: '', url: '', imageUrl: '', sortOrder: 0, isFeatured: true })

watch(() => store.siteConfig, (config) => { if (config) Object.assign(siteForm, { title: config.title, subtitle: config.subtitle, description: config.description, avatarUrl: config.avatarUrl || '', backgroundType: config.backgroundType, backgroundValue: config.backgroundValue, customCss: config.customCss }) }, { immediate: true })
watch(() => store.profile, (profile) => {
  if (profile) {
    Object.assign(profileForm, profile)
    try { socialItems.value = JSON.parse(profile.socialLinks || '[]').map((item: any) => ({ enabled: true, ...item })) } catch { socialItems.value = [] }
    try { nowBlocks.value = JSON.parse(profile.nowItems || '[]').map((item: any) => ({ enabled: true, ...item })) } catch { nowBlocks.value = [] }
  }
}, { immediate: true })
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
async function saveProfile() {
  profileForm.socialLinks = JSON.stringify(socialItems.value, null, 2)
  profileForm.nowItems = JSON.stringify(nowBlocks.value, null, 2)
  await contentApi.updateProfile(profileForm)
  await loadAll()
  flash('个人档案已保存')
}
function addSocial() { socialItems.value.push({ type: 'Social', label: '', href: '', enabled: true }) }
function moveSocial(index: number, delta: number) { const target = index + delta; if (target < 0 || target >= socialItems.value.length) return; const [item] = socialItems.value.splice(index, 1); socialItems.value.splice(target, 0, item) }
function removeSocial(index: number) { socialItems.value.splice(index, 1) }
function addNow() { nowBlocks.value.push({ kicker: 'Focus', title: '', desc: '', enabled: true }) }
function moveNow(index: number, delta: number) { const target = index + delta; if (target < 0 || target >= nowBlocks.value.length) return; const [item] = nowBlocks.value.splice(index, 1); nowBlocks.value.splice(target, 0, item) }
function removeNow(index: number) { nowBlocks.value.splice(index, 1) }
function editProject(project: Project) { editingProjectId.value = project.id; Object.assign(projectForm, project) }
function resetProjectForm() { editingProjectId.value = null; Object.assign(projectForm, { title: '', type: 'Project', description: '', url: '', imageUrl: '', sortOrder: 0, isFeatured: true }) }
async function saveProject() { editingProjectId.value ? await contentApi.updateProject(editingProjectId.value, projectForm) : await contentApi.createProject(projectForm); resetProjectForm(); await loadAll(); flash('项目已保存') }
async function removeProject(id: number) { await contentApi.deleteProject(id); await loadAll(); flash('项目已删除') }
async function exportData() { exportText.value = JSON.stringify(await contentApi.exportData(), null, 2); flash('数据已导出') }
onMounted(loadAll)
</script>
