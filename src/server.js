import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// 1. CRITICAL: Export the app instance for Vercel
module.exports = fastify

// 2. CRITICAL: Prevent local server from blocking Vercel build
if (require.main === module) {
  fastify.listen({ port: 3000 }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}