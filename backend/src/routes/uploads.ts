import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import type { FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'
import { prisma } from '../services/prisma.js'

const uploadDir = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), '..', 'uploads'))

export async function uploadRoutes(app: FastifyInstance) {
  await fs.promises.mkdir(uploadDir, { recursive: true })

  await app.register(fastifyStatic, {
    root: uploadDir,
    prefix: '/uploads/',
    decorateReply: false,
  })

  app.post('/api/uploads/icon', { preHandler: app.verifyAdmin }, async (request, reply) => {
    const file = await request.file()
    if (!file) return reply.code(400).send({ message: 'No file uploaded' })
    if (!file.mimetype.startsWith('image/')) return reply.code(400).send({ message: 'Only image files are allowed' })

    const ext = path.extname(file.filename).toLowerCase() || '.png'
    const safeName = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`
    const target = path.join(uploadDir, safeName)
    await pipeline(file.file, fs.createWriteStream(target))
    const stat = await fs.promises.stat(target)
    const asset = await prisma.asset.create({
      data: {
        filename: file.filename,
        path: `/uploads/${safeName}`,
        mimeType: file.mimetype,
        size: stat.size,
      },
    })
    return asset
  })
}
