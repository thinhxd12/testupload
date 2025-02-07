const cors = require('@fastify/cors');

const fastify = require('fastify')({
  logger: true
})

const corsOptions = {
  origin: (origin, callback) => {
    console.log('Request Origin:', origin); // Debug log
    if (!origin || origin === 'https://vocabs1.vercel.app') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET']
};

fastify.register(cors, corsOptions);

// Register your main app after CORS is set up
fastify.register(require('./app'));

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
