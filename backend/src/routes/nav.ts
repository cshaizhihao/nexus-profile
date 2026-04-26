import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/prisma.js'

type CategoryBody = { name: string; parentId?: number | null; sortOrder?: number }
type LinkBody = {
  categoryId: number
  title: string
  url: string
  description?: string
  iconUrl?: string | null
  iconType?: string
  sortOrder?: number
  isVisible?: boolean
}

export async function navRoutes(app: FastifyInstance) {
  app.get('/categories', async () => {
    return prisma.navCategory.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      include: { children: { orderBy: { sortOrder: 'asc' } }, links: { orderBy: { sortOrder: 'asc' } } },
    })
  })

  app.post('/categories', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const body = request.body as CategoryBody
    if (!body?.name?.trim()) return reply.code(400).send({ message: 'Category name is required' })
    return prisma.navCategory.create({
      data: { name: body.name.trim(), parentId: body.parentId ?? null, sortOrder: body.sortOrder ?? 0 },
    })
  })

  app.put('/categories/:id', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as Partial<CategoryBody>
    if (body.name !== undefined && !body.name.trim()) return reply.code(400).send({ message: 'Category name cannot be empty' })
    return prisma.navCategory.update({
      where: { id: Number(id) },
      data: {
        ...(body.name !== undefined ? { name: body.name.trim() } : {}),
        ...(body.parentId !== undefined ? { parentId: body.parentId } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
      },
    })
  })

  app.delete('/categories/:id', { preHandler: app.verifyAdmin }, async (request) => {
    const { id } = request.params as { id: string }
    await prisma.navCategory.delete({ where: { id: Number(id) } })
    return { ok: true }
  })

  app.get('/links', async () => {
    return prisma.navLink.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }], include: { category: true } })
  })

  app.post('/links', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const body = request.body as LinkBody
    if (!body?.title?.trim()) return reply.code(400).send({ message: 'Link title is required' })
    if (!body?.url?.trim()) return reply.code(400).send({ message: 'Link URL is required' })
    return prisma.navLink.create({
      data: {
        categoryId: Number(body.categoryId),
        title: body.title.trim(),
        url: body.url.trim(),
        description: body.description ?? '',
        iconUrl: body.iconUrl ?? null,
        iconType: body.iconType ?? 'external',
        sortOrder: body.sortOrder ?? 0,
        isVisible: body.isVisible ?? true,
      },
    })
  })

  app.put('/links/:id', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as Partial<LinkBody>
    if (body.title !== undefined && !body.title.trim()) return reply.code(400).send({ message: 'Link title cannot be empty' })
    if (body.url !== undefined && !body.url.trim()) return reply.code(400).send({ message: 'Link URL cannot be empty' })
    return prisma.navLink.update({
      where: { id: Number(id) },
      data: {
        ...(body.categoryId !== undefined ? { categoryId: Number(body.categoryId) } : {}),
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(body.url !== undefined ? { url: body.url.trim() } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.iconUrl !== undefined ? { iconUrl: body.iconUrl } : {}),
        ...(body.iconType !== undefined ? { iconType: body.iconType } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
        ...(body.isVisible !== undefined ? { isVisible: body.isVisible } : {}),
      },
    })
  })

  app.delete('/links/:id', { preHandler: app.verifyAdmin }, async (request) => {
    const { id } = request.params as { id: string }
    await prisma.navLink.delete({ where: { id: Number(id) } })
    return { ok: true }
  })
}
