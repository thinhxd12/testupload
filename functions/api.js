import express from "express";
import ServerlessHttp from "serverless-http";

const app = express();
const cors = require('cors');
const Gtts = require('gtts');

const corsOptions = {
    origin: ['http://localhost:3000', 'https://hoctuvung3.vercel.app/'],
    optionsSuccessStatus: 200
}



// app.get('/.netlify/functions/api', (req, res) => {
//     return res.json({
//         messages: "hello world!"
//     })
// })


const translate = require('google-translate-extended-api');
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

const getExampleTransOptions = {
    returnRawResponse: false,
    detailedTranslations: false,
    definitionSynonyms: false,
    detailedTranslationsSynonyms: false,
    definitions: false,
    definitionExamples: false,
    examples: true,
    removeStyles: false
}

app.get('/trans', cors(corsOptions), async (req, res) => {
    const { text, from, to } = req.query;

    const result = await translate(text, from, to, defaultTransOptions);
    return res.json(result)
});

app.get('/hear', cors(corsOptions), function (req, res) {
    const gtts = new Gtts(req.query.text, req.query.lang);
    gtts.stream().pipe(res);
});

app.get('/wakeup', cors(corsOptions), function (req, res) {
    res.json({ res: 'it worked!' });
});


const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
}