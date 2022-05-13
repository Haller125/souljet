const mongodb = require('mongodb');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const {fileURLToPath} = require('url');
const path = require('path');

const app = express();
var upload = multer();
const PORT = 5000;
var hbs = require('express-hbs');

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('views', 'views');

let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

app.use(express.static(path.join(__dirname, 'Html')));
app.use(express.static(path.join(__dirname, 'Css')));
app.use(express.static(path.join(__dirname, 'Javascript')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use('/Css', express.static(path.join(__dirname, 'Css')));
app.use('/Javascript', express.static(path.join(__dirname, 'Javascript')));
app.use('/Images', express.static(path.join(__dirname, '/Images')));

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


app.get('/', async (req, res) => {
    res.render('MainPage');
  });

 /* app.get('/profile', (req, res) => {
      res.render(`profile`, {
          username: currentUser.name,
          email: currentUser.email,
          time: '500'
      });
  });
  */
  app.get('/registration', (req, res) => {
      res.render(`Registration`);
  });
  
  app.get('/notes', (req, res) => {
      res.render(`notes`);
  });
  
  app.get('/login', (req, res) => {
      res.render(`LogIn`);
  });
  
  app.get('/logInAdmin', (req, res) => {
      res.render(`logInAdmin`);
  });
  app.post('/adminPage', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("test");
        const test = database.collection("users");
        let user = await test.find().toArray();
        if(req.body.name == "admin" && req.body.password == "admin"){
          res.render(`info`, {user: user});
        }
    }catch(e){
        console.log(e);
    } finally {
        await client.close();
    }
  });
  app.get('/contactus', (req, res) => {
      res.render('ContactUs');
  });
  
  app.post('/profile', (req, res) => {
      if(schema.validate(req.body.password)){
          res.render(`ConfirmPage`);
          req.body.time = Date.now();
          addToDB(req.body);
      }else{
          res.send("Invalid password");
      };
  });
  
  app.get('/contact', (req, res) => {
      res.render(`ContactUs`);
  });
  
  app.post('/login', async (req, res) => {
      try {
          await client.connect();
          const database = client.db("test");
          const test = database.collection("users");
          let user = await test.findOne({'email': req.body.email});
          if(req.body.password === user.password){
              res.render(`profile`, {
                  username: user.name,
                  email: user.email,
                  time: (Date.now() - user.time) / 1000,
              });
              user.time = Date.now();
          }else{
              res.send('invalid');
          };
      }catch(e){
          console.log(e);
      } finally {
          await client.close();
      }
      /*let currentUser = takeUser(req.body);
      console.log("PROMISE PENDING");
      console.log(currentUser);
      currentUser.then(function (result) {
          console.log("CORRECT");
          let currentUserName = result.name;
          let currentUserEmail = result.email;
          console.log(currentUserName)
      })
      console.log("NAME")
      console.log(currentUserName) */
      });
  


app.listen(PORT, () => {
    console.log('Application listening on port ' + PORT);
});

app.get('/user/delete/:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let name = req.params.name;
    let user = await coll.deleteOne({name: name});
    let users = await coll.find().toArray();
    res.render('info', {user:users});
});

app.get('/user/sortEmail/', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    //let email = req.params.email;
    let user = await coll.find().sort({'email':1}).toArray();
    res.render(`info`, {user: user});
});

app.get('/user/sortName/', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    //let email = req.params.email;
    let user = await coll.find().sort({'name':1}).toArray();
    res.render(`info`, {user: user});
    client.close();
});

///user/show/{{name}}
app.get('/user/show/:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let name = req.params.name;
    let user = await coll.findOne({name: name});
    res.render('show', {user: user});
    client.close();
});

app.get('/user/edit/:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let user = await coll.findOne({name: name});
    res.render('edit', user);
    client.close();
});

app.post('/user/edit/:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let user = req.body;
    await coll.updateOne({name: user.name}, {$set: user});
    let users = await coll.find().toArray();
    res.render('info', {user: users});
    client.close();
});

app.post('/user/add', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let user = req.body;
    user.time = Date.now();
    await coll.insertOne(user);
    let users = await coll.find().toArray();
    res.render('info', {user: users});
    client.close();
});

app.get('/user/adding/', async function(req,res){
res.render('adding');
});