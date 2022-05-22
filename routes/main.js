const { Router } = require('express')
const admins = require('../models/admins')
const router = Router()
const passwordValidator = require('password-validator');
const users = require('../models/users');

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
        let users1 = await users.find({});
        let admin = await admins.findOne({'AdminName': req.body.name});
        if(req.body.password == admin.PasswordAdmin){
          res.render(`info`, {user: users1});
        }
        else{
            res.send("invalid");
        }
  });
router.get('/contactus', (req, res) => {
      res.render('ContactUs');
  });

router.post('/registration', async (req, res) => {
      if(schema.validate(req.body.password)){
          res.render(`ConfirmPage`);
          const user = new users( {
            username: req.body.name ,
            email: req.body.email,
            password: req.body.password,
          });
          await user.save();
      }else{
          res.send("Invalid password");
      };
  });

router.get('/contact', (req, res) => {
      res.render(`ContactUs`);
  });

router.post('/login', async (req, res) => {
      let user = await users.findOne({'email': req.body.email});
      if(req.body.password === user.password){
          res.render(`profile`, {
              username: user.name,
              email: user.email,
              time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          });
      }else{
          res.send('invalid');
      }
  }); 

router.get('/user/sortEmail', async function(req, res) {
    const coll = users.collection("users");
    //let email = req.params.email;
    let user = await coll.find().sort({'email': 1});
    res.render('info', {user: user});
});

router.get('/user/sortName', async function(req, res) {
    const coll = users.collection("users");
    let user = await coll.find().sort({'name': 1});
    res.render('info', {user: user});
});


router.get('/user/delete/:name', async function(req, res) {
    let name = req.params.name;
    await users.deleteOne({name: name});
    let user1 = await users.find();
    res.redirect('/adminPage');
});
///user/show/{{name}}
router.get('/user/show/:name', async function(req, res) {
    let name = req.params.name;
    let user = await users.findOne({name: name});
    res.render('show', {user: user});
});

router.get('/user/edit/:name', async function(req, res) {
    let name = req.params.name;
    let user = await users.findOne({name: name});
    res.render('edit', user);
});

router.post('/user/edit/:name', async function(req, res) {
    await users.updateOne({name: user.name}, {$set: user});
    res.redirect('/adminPage');
});

router.post('/user/add', async function(req, res) {
    const user = new users({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.redirect('/adminPage');
});

router.get('/adding', async function(req,res){
    res.render('adding');
});

module.exports = router;