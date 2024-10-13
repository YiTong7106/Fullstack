process.env.GOOGLE_APPLICATION_CREDENTIALS = './serviceAccountKey.json';
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const express = require("express");
const session = require('express-session');
module.exports = db;
const mongoose = require("mongoose");
const PORT_NUMBER = 8080;
const cors = require("cors")
const http = require('http');
const socketIo = require('socket.io');
const { translate } = require('@vitalets/google-translate-api');
const textToSpeech = require('@google-cloud/text-to-speech');

const app = express();

app.use(session({
    secret: 'fit2095AAA',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4200", 
        methods: "*",
        allowedHeaders: "*",
    }
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("images"));
app.use(express.json());



app.set('view engine', 'html');
const apiRouter = require('./routes/api');
app.use(cors({
    origin: 'http://localhost:4200',
    methods: '*',
    allowedHeaders: '*'
}));
app.use('/32119887/Yi', apiRouter);
const url = "mongodb://127.0.0.1:27017/week9"
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('translateDescription', async (data) => {
        const { description, language } = data;
        try {
            const result = await translate(description, { to: language });
            socket.emit('translationResult', { translatedText: result.text });
        } catch (error) {
            socket.emit('error', { message: 'Translation failed' });
            console.log(error);
        }
    });

    socket.on('textToSpeech', async (data) => {
        const { text } = data;
        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        try {
            const [response] = await client.synthesizeSpeech(request);
            const audioFileName = `audio-${Date.now()}.mp3`;
            const writeFile = util.promisify(fs.writeFile);
            await writeFile(`./audio/${audioFileName}`, response.audioContent, 'binary');
            console.log('Audio content written to file:', audioFileName);
            socket.emit('speechResult', { audioUrl: `http://localhost:8080/audio/${audioFileName}` });
        } catch (error) {
            socket.emit('error', { message: 'Text-to-speech failed' });
            console.log('Text-to-speech error:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
app.use('/audio', express.static('audio'));
async function connect() {
    await mongoose.connect(url);
    return "Connected Successfully";
}
connect(url)
    .then(console.log)
    .catch((err) => console.log(err));

app.get("/*", function (request, response) {
    response.status(404).send('404 not found');
});
server.listen(PORT_NUMBER, () => {
    console.log(`Server running on port ${PORT_NUMBER}`);
});

