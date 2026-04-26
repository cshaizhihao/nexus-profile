import { defineStore } from 'pinia'
import { api, type SiteConfig, type NavCategory, type NavLink } from '../api/client'

export const useSiteStore = defineStore('site', {
  state: () => ({
    siteConfig: null as SiteConfig | null,
    categories: [] as NavCategory[],
    links: [] as NavLink[],
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
        const [siteConfig, categories, links] = await Promise.all([
          api.getSiteConfig(),
          api.getCategories(),
          api.getLinks(),
        ])
        this.siteConfig = siteConfig
        this.categories = categories
        this.links = links
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load data'
      } finally {
        this.loading = false
      }
    },
  },
})
