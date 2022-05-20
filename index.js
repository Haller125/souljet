const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');
const express = require('express');
const path = require('path');
<<<<<<< HEAD
const exphbs = require('express-handlebars');
const mainRoutes = require('./routes/main.js');
const hbs = require("hbs");
=======
const ejs = require('ejs');
const mainRoutes = require('./routes/main');
>>>>>>> 816086b9fb9376564bd133d8e26ace8ea1bc5fcf

const app = express();
var upload = multer();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.engine("hbs", exphbs.engine({
    layoutsDir: "views/layouts",
    defaultLayout: 'MainPage',
    extname: 'hbs'
    })
)

app.set('view engine', 'hbs')
=======
app.set('view engine', 'ejs');
>>>>>>> 816086b9fb9376564bd133d8e26ace8ea1bc5fcf

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