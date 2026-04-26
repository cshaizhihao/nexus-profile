import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { siteRoutes } from './routes/site.js'
import { navRoutes } from './routes/nav.js'
import { uploadRoutes } from './routes/uploads.js'

const app = Fastify({ logger: true })
const port = Number(process.env.PORT || 10081)

await app.register(cors, { origin: true })
await app.register(multipart, { limits: { fileSize: 2 * 1024 * 1024 } })

app.decorate('verifyAdmin', async (request: any, reply: any) => {
  const expected = process.env.ADMIN_TOKEN || process.env.ADMIN_PASSWORD || 'change-me-now'
  const auth = request.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token || token !== expected) return reply.code(401).send({ message: 'Unauthorized' })
})

app.get('/health', async () => ({ ok: true, service: 'nexus-profile-backend' }))
app.post('/api/auth/login', async (request, reply) => {
  const body = request.body as { password?: string }
  const password = process.env.ADMIN_PASSWORD || 'change-me-now'
  const token = process.env.ADMIN_TOKEN || password
  if (!body?.password || body.password !== password) return reply.code(401).send({ message: 'Invalid password' })
  return { token }
})
await app.register(siteRoutes, { prefix: '/api/site-config' })
await app.register(navRoutes, { prefix: '/api/nav' })
await app.register(uploadRoutes)

try {
  await app.listen({ port, host: '0.0.0.0' })
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
