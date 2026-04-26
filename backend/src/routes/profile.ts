import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

const fields = ['headline', 'bio', 'status', 'tags', 'techStack', 'socialLinks'] as const

export async function profileRoutes(app: FastifyInstance) {
  app.get('/', async () => prisma.profileConfig.upsert({ where: { id: 1 }, create: {}, update: {} }))
  app.put('/', { preHandler: app.verifyAdmin }, async (request) => {
    const body = request.body as Record<string, unknown>
    const data = Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, String(body[f] ?? '')]))
    return prisma.profileConfig.upsert({ where: { id: 1 }, create: data, update: data })
  })
}
