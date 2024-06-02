const express = require("express");
const cors = require('cors');
const translate = require('google-translate-extended-api');
const gtts = require('node-gtts')('vi')


const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5500', 'https://hoctuvung3.vercel.app'],
    optionsSuccessStatus: 200
}


app.get('/wakeup', cors(corsOptions), function (req, res) {
    res.json({ res: "ok" });
});

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

app.get('/trans', cors(corsOptions), async (req, res) => {
    const { text, from, to } = req.query;
    const result = await translate(text, from, to, defaultTransOptions);
    return res.json(result)
});

app.get('/speech', cors(corsOptions), async (req, res) => {
    res.set({ 'Content-Type': 'audio/mpeg' });
    gtts.stream(req.query.text).pipe(res);
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;