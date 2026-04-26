import { defineStore } from 'pinia'
import { api, contentApi, type SiteConfig, type NavCategory, type NavLink, type Project, type ProfileConfig } from '../api/client'

export const useSiteStore = defineStore('site', {
  state: () => ({
    siteConfig: null as SiteConfig | null,
    categories: [] as NavCategory[],
    links: [] as NavLink[],
    projects: [] as Project[],
    profile: null as ProfileConfig | null,
    loading: false,
    error: '',
  }),
  getters: {
    visibleLinks: (state) => state.links.filter((link) => link.isVisible),
    linksByCategory: (state) => {
      return state.categories.map((category) => ({
        ...category,
        links: state.links.filter((link) => link.categoryId === category.id && link.isVisible),
      }))
    },
  },
  actions: {
    async loadAll() {
      this.loading = true
      this.error = ''
      try {
        const [siteConfig, categories, links, projects, profile] = await Promise.all([
          api.getSiteConfig(),
          api.getCategories(),
          api.getLinks(),
          contentApi.getProjects(),
          contentApi.getProfile(),
        ])
        this.siteConfig = siteConfig
        this.categories = categories
        this.links = links
        this.projects = projects
        this.profile = profile
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load data'
      } finally {
        this.loading = false
      }
    },
  },
})
