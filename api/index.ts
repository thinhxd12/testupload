const express = require("express");
const cors = require('cors');
const translate = require('google-translate-extended-api');
const Gtts = require('gtts');
const googleTTS = require('google-tts-api');
const gtts = require('node-gtts')('vi')
// var router = express.Router();



const app = express();

app.get('/speech', function (req, res) {
    res.set({ 'Content-Type': 'audio/mpeg' });
    gtts.stream(req.query.text).pipe(res);
})

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5500', 'https://hoctuvung3.vercel.app'],
    optionsSuccessStatus: 200
}

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


app.get('/hear', cors(corsOptions), function (req, res) {
    const gtts = new Gtts(req.query.text, req.query.lang);
    gtts.stream().pipe(res);
});

app.get('/wakeup', cors(corsOptions), function (req, res) {
    res.json({ res: "ok" });
});

app.get('/getsound', cors(corsOptions), function (req, res) {
    const { text } = req.query;
    const url = googleTTS.getAudioUrl(text, {
        lang: 'vi',
        slow: false,
        host: 'https://translate.google.com',
    });
    res.json({ res: url });
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;