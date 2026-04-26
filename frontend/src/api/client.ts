export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const TOKEN_KEY = 'nexus_profile_admin_token'
export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY) || '',
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  isLoggedIn: () => Boolean(localStorage.getItem(TOKEN_KEY)),
}

export type SiteConfig = {
  id: number
  title: string
  subtitle: string
  description: string
  avatarUrl?: string | null
  backgroundType: string
  backgroundValue: string
  customCss: string
}

export type NavCategory = {
  id: number
  name: string
  parentId?: number | null
  sortOrder: number
}

export type Asset = {
  id: number
  filename: string
  path: string
  mimeType: string
  size: number
}

export type NavLink = {
  id: number
  categoryId: number
  title: string
  url: string
  description: string
  iconUrl?: string | null
  iconType: string
  sortOrder: number
  isVisible: boolean
  healthStatus: string
  healthCode?: number | null
  healthCheckedAt?: string | null
  category?: NavCategory
}

function authHeaders(): Record<string, string> {
  const token = auth.getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(path: string, options?: RequestInit, protectedRequest = false): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(protectedRequest ? authHeaders() : {}),
      ...((options?.headers as Record<string, string> | undefined) || {}),
    },
    ...options,
  })
  if (!response.ok) throw new Error(await response.text())
  return response.json() as Promise<T>
}

export const api = {
  login: (password: string) => request<{ token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  getSiteConfig: () => request<SiteConfig>('/api/site-config'),
  updateSiteConfig: (payload: Partial<SiteConfig>) =>
    request<SiteConfig>('/api/site-config', { method: 'PUT', body: JSON.stringify(payload) }, true),
  getCategories: () => request<NavCategory[]>('/api/nav/categories'),
  createCategory: (payload: Partial<NavCategory>) =>
    request<NavCategory>('/api/nav/categories', { method: 'POST', body: JSON.stringify(payload) }, true),
  updateCategory: (id: number, payload: Partial<NavCategory>) =>
    request<NavCategory>(`/api/nav/categories/${id}`, { method: 'PUT', body: JSON.stringify(payload) }, true),
  deleteCategory: (id: number) => request<{ ok: true }>(`/api/nav/categories/${id}`, { method: 'DELETE' }, true),
  getLinks: () => request<NavLink[]>('/api/nav/links'),
  createLink: (payload: Partial<NavLink>) =>
    request<NavLink>('/api/nav/links', { method: 'POST', body: JSON.stringify(payload) }, true),
  updateLink: (id: number, payload: Partial<NavLink>) =>
    request<NavLink>(`/api/nav/links/${id}`, { method: 'PUT', body: JSON.stringify(payload) }, true),
  checkLink: (id: number) => request<NavLink>(`/api/nav/links/${id}/check`, { method: 'POST' }, true),
  checkAllLinks: () => request<NavLink[]>('/api/nav/links/check-all', { method: 'POST' }, true),
  deleteLink: (id: number) => request<{ ok: true }>(`/api/nav/links/${id}`, { method: 'DELETE' }, true),
  uploadIcon: async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const response = await fetch(`${API_BASE_URL}/api/uploads/icon`, { method: 'POST', headers: authHeaders(), body: form })
    if (!response.ok) throw new Error(await response.text())
    return response.json() as Promise<Asset>
  },
}

export type Project = {
  id: number
  title: string
  type: string
  description: string
  url?: string | null
  imageUrl?: string | null
  sortOrder: number
  isFeatured: boolean
}

export type ProfileConfig = {
  id: number
  headline: string
  bio: string
  status: string
  tags: string
  techStack: string
  socialLinks: string
  nowItems: string
  homepageLayout: string
}

export const contentApi = {
  getProjects: () => request<Project[]>('/api/projects'),
  createProject: (payload: Partial<Project>) => request<Project>('/api/projects', { method: 'POST', body: JSON.stringify(payload) }, true),
  updateProject: (id: number, payload: Partial<Project>) => request<Project>(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }, true),
  deleteProject: (id: number) => request<{ ok: true }>(`/api/projects/${id}`, { method: 'DELETE' }, true),
  getProfile: () => request<ProfileConfig>('/api/profile'),
  updateProfile: (payload: Partial<ProfileConfig>) => request<ProfileConfig>('/api/profile', { method: 'PUT', body: JSON.stringify(payload) }, true),
  exportData: () => request<Record<string, unknown>>('/api/export', { method: 'GET' }, true),
}
