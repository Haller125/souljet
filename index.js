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

<<<<<<< HEAD
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('views', 'views');

let mongoClient = new mongodb.MongoClient('mongodb+srv://bekatop1gg:26Jw0H0sCmXpQpvi@souljet.dmfcg.mongodb.net/test', {
    useUnifiedTopology: true
});

const url = "mongodb+srv://bekatop1gg:26Jw0H0sCmXpQpvi@souljet.dmfcg.mongodb.net/test";
const client = new MongoClient(url);

app.use(express.static(path.join(__dirname, 'Html')));
=======
>>>>>>> e7e844f028aff9ab2ff7cd133eef40766c4865fa
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

<<<<<<< HEAD
var schema = new passwordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .has().symbols();

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/Html/MainPage.html`);
});

mongoClient.connect(async function(error, mongo) {
    if (!error) {
    let db = mongo.db('test');
    let coll = db.collection('users');
    } else {
        console.log(error);
    }});

async function addToDB(doc) {
=======
async function start() {
>>>>>>> e7e844f028aff9ab2ff7cd133eef40766c4865fa
    try {
      await mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.jwl8u.mongodb.net/?retryWrites=true&w=majority',
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


