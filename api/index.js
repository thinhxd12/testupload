const translate = require("google-translate-extended-api");
const gtts = require("node-gtts");
const app = require("fastify")({
  logger: true,
});

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

app.get("/", async (req, reply) => {
  return reply.status(200).type("application/json").send({ hello: "world" });
});

app.get("/trans", async (req, reply) => {
  const { text, from, to } = req.query;
  try {
    const result = await translate(text, from, to, defaultTransOptions);
    return reply.status(200).type("application/json").send(result);
  } catch (err) {
    reply.status(500).send({ error: "Failed", details: err.message });
  }
});

app.get("/speech", async (req, reply) => {
  const { text, lang = "en" } = req.query;
  try {
    const stream = gtts(lang).stream(text);
    return reply.send(stream);
  } catch (err) {
    reply.status(500).send({ error: "Failed", details: err.message });
  }
});

export default async function handler(req, reply) {
  await app.ready();
  app.server.emit("request", req, reply);
}
