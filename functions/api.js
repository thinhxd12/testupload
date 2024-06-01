const express = require("express");
const serverless = require("serverless-http")
const cors = require('cors');
const translate = require('google-translate-extended-api');
const Gtts = require('gtts');

// const app = express();
const api = express();
const app = Router();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://hoctuvung3.vercel.app'],
    optionsSuccessStatus: 200
}

app.get('/api/wakeup', (req, res) => {
    res.json({ res: 'it worked!' });
})

const defaultTransOptions = {
    returnRawResponse: false,
    detailedTranslations: true,
    definitionSynonyms: false,
    detailedTranslationsSynonyms: true,
    definitions: false,
    definitionExamples: false,
    examples: false,
    removeStyles: false
}

app.get('/api/trans', cors(corsOptions), async (req, res) => {
    const { text, from, to } = req.query;
    const result = await translate(text, from, to, defaultTransOptions);
    return res.json(result)
})

app.get('/api/hear', cors(corsOptions), async (req, res) => {
    const gtts = new Gtts(req.query.text, req.query.lang);
    gtts.stream().pipe(res);
})

api.use("/api/", app);
export const handler = serverless(api);

// const handler = ServerlessHttp(app);

// module.exports.handler = async (event, context) => {
//     const result = await handler(event, context);
//     return result;
// }

