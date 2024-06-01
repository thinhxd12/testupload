import express from "express";
import ServerlessHttp from "serverless-http";
import Gtts from "gtts"
import translate from "google-translate-extended-api"

const app = express();

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

app.get('/api/trans', async (req, res) => {
    const { text, from, to } = req.query;
    const result = await translate(text, from, to, defaultTransOptions);
    return res.json(result)
})

app.get('/api/hear', async (req, res) => {
    const gtts = new Gtts(req.query.text, req.query.lang);
    gtts.stream().pipe(res);
})

const cors = require('cors');

app.use(cors({
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE', 'OPTIONS'],
    origin: true
}));

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
}

