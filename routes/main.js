const { Router } = require('express')
const router = Router()
const mongodb = require('mongodb');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const multer = require('multer');

const passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .has().symbols();

let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

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
        user = this.user;
        res = doc.password == user.password;
    }catch(e){
            console.log(e);
    } finally {
        await client.close();
    }

    return res;
}

async function infoAboutPerson(doc) {
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

let user;

router.get('/', async (req, res) => {
  res.render('MainPage');
});

router.get('/profile', (req, res) => {
    res.render(`profile`, {
        username: user.name,
        email: user.email,
      });

});

router.get('/registration', (req, res) => {
    res.render(`Registration`);
});

router.get('/notes', (req, res) => {
    res.render(`notes`);
});

router.get('/login', (req, res) => {
    res.render(`LogIn`);
});

router.get('/logInAdmin', (req, res) => {
    res.render(`logInAdmin`);
});
router.get('/adminPage', (req, res) => {
    res.render(`adminPage`);
});
router.get('/contactus', (req, res) => {
    res.render('ContactUs');
});

router.post('/profile', (req, res) => {
    console.log(req.body);
    if(schema.validate(req.body.password)){
        res.render(`ConfirmPage`);
        addToDB(req.body);
    }else{
        res.send("Invalid password");
    };
});

router.get('/contact', (req, res) => {
    res.render(`ContactUs`);
});

router.post('/login', (req, res) => {
    console.log(req.body);
    if(checkPassword(req.body) ){
        res.render(`profile`);
    }else{
        res.send('invalid');
    };
    });

module.exports = router;