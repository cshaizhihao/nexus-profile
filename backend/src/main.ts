import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { siteRoutes } from './routes/site.js'
import { navRoutes } from './routes/nav.js'

const app = Fastify({ logger: true })
const port = Number(process.env.PORT || 10081)

await app.register(cors, { origin: true })
await app.register(multipart)

app.get('/health', async () => ({ ok: true, service: 'nexus-profile-backend' }))
await app.register(siteRoutes, { prefix: '/api/site-config' })
await app.register(navRoutes, { prefix: '/api/nav' })

try {
  await app.listen({ port, host: '0.0.0.0' })
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
