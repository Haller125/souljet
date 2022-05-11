
import mongodb from 'mongodb';
import { MongoClient } from "mongodb";
import bodyParser from 'body-parser';
import multer from 'multer';
import express from 'express';

import {fileURLToPath} from 'url';
import path from 'path';
const app = express();
var upload = multer();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        let db = mongo.db('test');
        let coll = db.collection('users'); 
        const result = await haiku.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }catch(e){
            console.log(e);
    } finally {
        await client.close();
    }
    }


app.use(bodyParser.json());
app.use(upload.array()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/profile', (req, res) => {
    res.sendFile(`${__dirname}/Html/profile.html`);
});

app.get('/registration', (req, res) => {
    res.sendFile(`${__dirname}/Html/Registration.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/Html/notes.html`);
});

app.post('/profile', (req, res) => {
    console.log(req.body);
   res.send("recieved your request!");
   addToDB(req.body);
});

app.listen(PORT, () => {
    console.log('Application listening on port ' + PORT);
});