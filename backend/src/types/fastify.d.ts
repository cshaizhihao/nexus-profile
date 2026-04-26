import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    verifyAdmin: (request: any, reply: any) => Promise<void>
  }
}
