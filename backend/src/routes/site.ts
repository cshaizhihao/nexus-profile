import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

export async function siteRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return prisma.siteConfig.upsert({
      where: { id: 1 },
      create: {},
      update: {},
    })
  })

  app.put('/', async (request) => {
    const body = request.body as Record<string, unknown>
    return prisma.siteConfig.upsert({
      where: { id: 1 },
      create: body,
      update: body,
    })
  })
}
