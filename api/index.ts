const Fastify = require('fastify');
const cors = require('@fastify/cors');
const translate = require('google-translate-extended-api');
const gtts = require('node-gtts')('vi');

const fastify = Fastify({ logger: true });

// CORS options
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:5500', 'https://hoctuvung3.vercel.app'],
  methods: ['GET'],
};

// Register CORS plugin
fastify.register(cors, corsOptions);

// Default translation options
const defaultTransOptions = {
  returnRawResponse: false,
  detailedTranslations: true,
  definitionSynonyms: false,
  detailedTranslationsSynonyms: true,
  definitions: false,
  definitionExamples: false,
  examples: false,
  removeStyles: false,
};

// Wakeup route
fastify.get('/wakeup', async (request, reply) => {
  return { res: 'ok' };
});

// Translation route
fastify.get('/trans', async (request, reply) => {
  const { text, from, to } = request.query;

  try {
    const result = await translate(text, from, to, defaultTransOptions);
    return result;
  } catch (err) {
    reply.status(500).send({ error: 'Translation failed', details: err.message });
  }
});

// Speech route
fastify.get('/speech', async (request, reply) => {
  const { text } = request.query;

  reply.header('Content-Type', 'audio/mpeg');

  try {
    const stream = gtts.stream(text);
    return reply.send(stream);
  } catch (err) {
    reply.status(500).send({ error: 'Speech generation failed', details: err.message });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server ready on port 3000.');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = fastify;
