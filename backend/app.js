var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const express = require("express");
const session = require('express-session');
module.exports = db;

const ejs = require("ejs");
const mongoose = require("mongoose");
const PORT_NUMBER = 8080;
const cors = require("cors")
const app = express();
app.use(session({
    secret: 'fit2095AAA',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
const ensureAuthenticated = require('./middlewares/authMiddleware');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("images"));
app.use(express.json());
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
const apiRouter = require('./routes/api');
app.use(cors({
    origin: 'http://localhost:4200',
    methods: '*',
    allowedHeaders: '*'
}));
app.use('/32119887/Yi', apiRouter);
const url = "mongodb://127.0.0.1:27017/week9"

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
app.listen(PORT_NUMBER, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`listening on port ${PORT_NUMBER}`);
});
