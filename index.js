const mongodb = require('mongodb');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const {fileURLToPath} = require('url');
const path = require('path');

const mainRoutes = require('./routes/main.js')

const app = express();
var upload = multer();
const PORT = 5000;
var hbs = require('express-hbs');

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('views', 'views');

let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

app.use(express.static(path.join(__dirname, 'Html')));
app.use(express.static(path.join(__dirname, 'Css')));
app.use(express.static(path.join(__dirname, 'Javascript')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use('/Css', express.static(path.join(__dirname, 'Css')));
app.use('/Javascript', express.static(path.join(__dirname, 'Javascript')));
app.use('/Images', express.static(path.join(__dirname, '/Images')));
app.use(mainRoutes);

const passwordValidator = require('password-validator');

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
        console.error(err);
    }});  

async function addToDB(doc) {
    try {
        await client.connect();
        const database = client.db("test");
        const test = database.collection("users");
        const result = await test.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }catch(e){
            console.log(e);
    } finally {
        await client.close();
    }
}

async function checkPassword(doc) {
    let res;
    try {
        await client.connect();
        const database = client.db("test");
        const test = database.collection("users");
        let user = await test.findOne({'email': doc.email});
        res = doc.password == user.password;
    }catch(e){
            console.log(e);
    } finally {
        await client.close();
    }

    return res;
}


app.use(bodyParser.json());
app.use(upload.array()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 



app.listen(PORT, () => {
    console.log('Application listening on port ' + PORT);
});