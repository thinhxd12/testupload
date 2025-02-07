const cors = require('@fastify/cors');

// CORS options
const corsOptions = {
  origin: 'https://vocabs1.vercel.app'
  methods: ['GET'],
};

const fastify = require('fastify')({
  logger: true
})

// fastify.register(require('./app'))
fastify.register(cors, corsOptions, require('./app'));

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
