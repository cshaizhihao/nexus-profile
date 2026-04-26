import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

export async function exportRoutes(app: FastifyInstance) {
  app.get('/api/export', { preHandler: app.verifyAdmin }, async () => {
    const [siteConfig, profileConfig, categories, links, projects] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { id: 1 } }),
      prisma.profileConfig.findUnique({ where: { id: 1 } }),
      prisma.navCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.navLink.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.project.findMany({ orderBy: { sortOrder: 'asc' } }),
    ])
    return { exportedAt: new Date().toISOString(), siteConfig, profileConfig, categories, links, projects }
  })
}
