const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mainRoutes = require('./routes/main.js');

const app = express();
var upload = multer();
const PORT = 5000;

const hbs = exphbs.create({
    layoutsDir: 'views',
    defaultLayout: 'MainPage',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'Css')));
app.use(express.static(path.join(__dirname, 'Javascript')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use('/Css', express.static(path.join(__dirname, 'Css')));
app.use('/Javascript', express.static(path.join(__dirname, 'Javascript')));
app.use('/Images', express.static(path.join(__dirname, '/Images')));

app.use(bodyParser.json());
app.use(upload.array());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRoutes)
async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://bekatop1gg:26Jw0H0sCmXpQpvi@souljet.dmfcg.mongodb.net/test',
            {
                useNewUrlParser: true,
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