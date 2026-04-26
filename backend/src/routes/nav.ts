import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

export async function navRoutes(app: FastifyInstance) {
  app.get('/categories', async () => {
    return prisma.navCategory.findMany({ orderBy: { sortOrder: 'asc' }, include: { children: true } })
  })

  app.post('/categories', async (request) => {
    const body = request.body as { name: string; parentId?: number; sortOrder?: number }
    return prisma.navCategory.create({ data: body })
  })

  app.get('/links', async () => {
    return prisma.navLink.findMany({ orderBy: { sortOrder: 'asc' }, include: { category: true } })
  })

  app.post('/links', async (request) => {
    const body = request.body as { categoryId: number; title: string; url: string; description?: string; iconUrl?: string; iconType?: string; sortOrder?: number; isVisible?: boolean }
    return prisma.navLink.create({ data: body })
  })
}
