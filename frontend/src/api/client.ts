export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

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
  category?: NavCategory
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  })
  if (!response.ok) throw new Error(await response.text())
  return response.json() as Promise<T>
}

export const api = {
  getSiteConfig: () => request<SiteConfig>('/api/site-config'),
  updateSiteConfig: (payload: Partial<SiteConfig>) =>
    request<SiteConfig>('/api/site-config', { method: 'PUT', body: JSON.stringify(payload) }),
  getCategories: () => request<NavCategory[]>('/api/nav/categories'),
  createCategory: (payload: Partial<NavCategory>) =>
    request<NavCategory>('/api/nav/categories', { method: 'POST', body: JSON.stringify(payload) }),
  updateCategory: (id: number, payload: Partial<NavCategory>) =>
    request<NavCategory>(`/api/nav/categories/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCategory: (id: number) => request<{ ok: true }>(`/api/nav/categories/${id}`, { method: 'DELETE' }),
  getLinks: () => request<NavLink[]>('/api/nav/links'),
  createLink: (payload: Partial<NavLink>) =>
    request<NavLink>('/api/nav/links', { method: 'POST', body: JSON.stringify(payload) }),
  updateLink: (id: number, payload: Partial<NavLink>) =>
    request<NavLink>(`/api/nav/links/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteLink: (id: number) => request<{ ok: true }>(`/api/nav/links/${id}`, { method: 'DELETE' }),
  uploadIcon: async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const response = await fetch(`${API_BASE_URL}/api/uploads/icon`, { method: 'POST', body: form })
    if (!response.ok) throw new Error(await response.text())
    return response.json() as Promise<Asset>
  },
}
