import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

const allowedFields = [
  'title',
  'subtitle',
  'description',
  'avatarUrl',
  'backgroundType',
  'backgroundValue',
  'customCss',
] as const

export async function siteRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return prisma.siteConfig.upsert({
      where: { id: 1 },
      create: {},
      update: {},
    })
  })

  app.put('/', { preHandler: app.verifyAdmin }, async (request) => {
    const body = request.body as Record<string, unknown>
    const data = Object.fromEntries(
      allowedFields.filter((field) => body[field] !== undefined).map((field) => [field, String(body[field] ?? '')]),
    )

    return prisma.siteConfig.upsert({
      where: { id: 1 },
      create: data,
      update: data,
    })
  })
}
