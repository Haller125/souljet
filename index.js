const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mainRoutes = require('./routes/main');


const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const app = express();
var upload = multer();
const PORT = process.env.PORT || 5000;
const mongoURI = "mongodb+srv://bekatop1gg:26Jw0H0sCmXpQpvi@souljet.dmfcg.mongodb.net/test"

app.set('view engine', 'ejs');

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions'
});

app.use(session({
    secret: 'key that will sign coolie',
    resave: false,
    saveUninitialized: false,
    store: store,
})
);

app.use(express.static(path.join(__dirname, 'Css')));
app.use(express.static(path.join(__dirname, 'Javascript')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json());
app.use(upload.array());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRoutes);

async function start() {
    try {
        await mongoose.connect(mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()