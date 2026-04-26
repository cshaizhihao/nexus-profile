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
  healthStatus?: string
  healthCode?: number | null
}

async function checkUrl(url: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)
  try {
    const started = Date.now()
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal })
    const durationMs = Date.now() - started
    const status = response.status >= 200 && response.status < 400 ? 'ok' : response.status >= 400 ? 'broken' : 'unknown'
    return { status, code: response.status, durationMs }
  } catch {
    return { status: 'timeout', code: null, durationMs: 6000 }
  } finally {
    clearTimeout(timeout)
  }
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

  app.post('/links/:id/check', { preHandler: app.verifyAdmin }, async (request) => {
    const { id } = request.params as { id: string }
    const link = await prisma.navLink.findUniqueOrThrow({ where: { id: Number(id) } })
    const result = await checkUrl(link.url)
    return prisma.navLink.update({
      where: { id: link.id },
      data: { healthStatus: result.status, healthCode: result.code, healthCheckedAt: new Date() },
    })
  })

  app.post('/links/check-all', { preHandler: app.verifyAdmin }, async () => {
    const links = await prisma.navLink.findMany({ orderBy: { id: 'asc' } })
    const results = []
    for (const link of links) {
      const result = await checkUrl(link.url)
      const updated = await prisma.navLink.update({
        where: { id: link.id },
        data: { healthStatus: result.status, healthCode: result.code, healthCheckedAt: new Date() },
      })
      results.push(updated)
    }
    return results
  })

  app.delete('/links/:id', { preHandler: app.verifyAdmin }, async (request) => {
    const { id } = request.params as { id: string }
    await prisma.navLink.delete({ where: { id: Number(id) } })
    return { ok: true }
  })
}
