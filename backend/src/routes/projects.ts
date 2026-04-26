import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

type ProjectBody = {
  title: string
  type?: string
  description?: string
  url?: string | null
  imageUrl?: string | null
  sortOrder?: number
  isFeatured?: boolean
}

export async function projectRoutes(app: FastifyInstance) {
  app.get('/', async () => prisma.project.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'desc' }] }))

  app.post('/', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const body = request.body as ProjectBody
    if (!body?.title?.trim()) return reply.code(400).send({ message: 'Project title is required' })
    return prisma.project.create({ data: { title: body.title.trim(), type: body.type || 'Project', description: body.description || '', url: body.url || null, imageUrl: body.imageUrl || null, sortOrder: body.sortOrder || 0, isFeatured: body.isFeatured ?? true } })
  })

  app.put('/:id', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as Partial<ProjectBody>
    if (body.title !== undefined && !body.title.trim()) return reply.code(400).send({ message: 'Project title cannot be empty' })
    return prisma.project.update({ where: { id: Number(id) }, data: { ...body, title: body.title?.trim() } })
  })

  app.delete('/:id', { preHandler: app.verifyAdmin }, async (request) => {
    const { id } = request.params as { id: string }
    await prisma.project.delete({ where: { id: Number(id) } })
    return { ok: true }
  })
}
