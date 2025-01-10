const translate = require('google-translate-extended-api');
const gtts = require('node-gtts')('vi');

async function routes(fastify, options) {
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
}

module.exports = routes