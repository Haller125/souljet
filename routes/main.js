const { Router } = require('express')
const users = require('../models/users')
const router = Router()
const passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .has().symbols();


router.get('/', async (req, res) => {
    res.render('MainPage');
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

router.post('/adminPage', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("test");
        const test = database.collection("users");
        let user = await test.find().toArray();
        const collA = database.collection("admins");
        let admin = await collA.findOne({'AdminName': req.body.name});
        if(req.body.password == admin.PasswordAdmin){
          res.render(`info`, {user: user});
        }
        else{
            res.send("invalid");
        }
    }catch(e){
        console.log(e);
    } finally {
        await client.close();
    }
  });
router.get('/contactus', (req, res) => {
      res.render('ContactUs');
  });

router.post('/profile', (req, res) => {
      if(schema.validate(req.body.password)){
          res.render(`ConfirmPage`);
          req.body.time = new Date().toISOString().slice(0, 19).replace('T', ' ');
          addToDB(req.body);
      }else{
          res.send("Invalid password");
      };
  });

router.get('/contact', (req, res) => {
      res.render(`ContactUs`);
  });

router.post('/login', async (req, res) => {
      try {
          await client.connect();
          const database = client.db("test");
          const test = database.collection("users");
          let user = await test.findOne({'email': req.body.email});
          if(req.body.password === user.password){
              res.render(`profile`, {
                  username: user.name,
                  email: user.email,
                  time: new Date().toISOString().slice(0, 19).replace('T', ' '),
              });
          }else{
              res.send('invalid');
          };
      }catch(e){
          console.log(e);
      } finally {
          await client.close();
      }
  }); 

router.get('/user/sortEmail', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    //let email = req.params.email;
    let user = await coll.find().sort({'email': 1}).toArray();
    res.render('info', {user: user});
});

router.get('/user/sortName', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let user = await coll.find().sort({'name': 1}).toArray();
    res.render('info', {user: user});
    client.close();
});


router.get('/user/delete:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let name = req.params.name;
    let user = await coll.deleteOne({name: name});
    let users = await coll.find().toArray();
    res.render('info', {user:users});
    client.close();
});
///user/show/{{name}}
router.get('/user/show:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let name = req.params.name;
    let user = await coll.findOne({name: name});
    res.render('show', {user: user});
    client.close();
});

router.get('/user/edit:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let name = req.params.name;
    let user = await coll.findOne({name: name});
    res.render('edit', user);
    client.close();
});

router.post('/user/edit:name', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let user = req.body;
    await coll.updateOne({name: user.name}, {$set: user});
    let users = await coll.find().toArray();
    res.render('info', {user: users});
    client.close();
});

router.post('/user/add', async function(req, res) {
    await client.connect();
    const database = client.db("test");
    const coll = database.collection("users");
    let user = req.body;
    user.time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await coll.insertOne(user);
    let users = await coll.find().toArray();
    res.render('info', {user: users});
    client.close();
});

router.get('/adding', async function(req,res){
    res.render('adding');
});

module.exports = router