const express = require("express");
const ServerlessHttp = require("serverless-http")
const cors = require('cors');
const translate = require('google-translate-extended-api');
const Gtts = require('gtts');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5500', 'https://hoctuvung3.vercel.app'],
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


// const handler = ServerlessHttp(app);

// module.exports.handler = async (event, context) => {
//     const result = await handler(event, context);
//     return result;
// }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const serverless = require('serverless-http');
module.exports.handler = serverless(app);


