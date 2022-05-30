const { Router } = require('express')
const admins = require('../models/admins')
const router = Router()
const passwordValidator = require('password-validator');
const users = require('../models/users');
const todo = require('../models/todo');



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

router.get('/notes',async (req, res) => {

      const category = await todo.distinct('category');
      res.render(`notes`, {categories: category});
  });

router.get('/notes/:category',async (req, res) => {
    let category = req.params.category;
    const todos = await todo.find({"category": category});

    res.render(`InsideNoteExample`, {todos: todos, title: category});
});

router.post('/notes/:category/add', async (req, res) => {
  let category = req.params.category;
  let todos = new todo({
    title: req.body.newTodo,
    category: category
  });
  await todos.save();
  res.redirect('back');
});

router.post('/notes/add', async (req, res) => {
  res.redirect('/notes/' + req.body.category);
});

router.get('/login', (req, res) => {
      res.render(`LogIn`);
  });



router.get('/logInAdmin', (req, res) => {
      res.render(`logInAdmin`);
  });

router.post('/adminPage', async (req, res) => {
        let user = await users.find({});
        let adminDB = await admins.findOne({'AdminName': req.body.name});
        if(req.body.password == adminDB.toObject().PasswordAdmin){
          res.render(`info`, {user: user});
        }
        else{
            res.send("invalid");
        }
  });


/// Плохая идея
router.get('/adminPage', async (req, res) => {
  let user = await users.find({});
  res.render(`info`, {user: user});
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
              username: user.username,
              email: user.email,
              time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          });
      }else{
          res.send('invalid');
      }
  }); 

router.get('/user/sortEmail', async function(req, res) {
    let user = await users.find().sort({'email': 1});
    res.render('info', {user: user});
});

router.get('/user/sortName', async function(req, res) {
    let user = await users.find().sort({'name': 1});
    res.render('info', {user: user});
});

router.get('/user/delete/:id', async function(req, res) {
    let id = req.params.id;
    await users.deleteOne({_id: id});
    res.redirect('/adminPage');
});

router.get('/note/insideNoteExample', async function(req, res){
    res.render('insideNoteExample');
})

router.get('/user/show/:id', async function(req, res) {
    let id = req.params.id;
    let user = await users.findOne({_id: id});
    res.render('show', {user: user});
});

router.post('/user/edit/:id', async function(req, res) {
    let user = req.params.id;
    await users.updateOne({_id: user}, {$set: req.body});
    res.redirect('/adminPage');
});

router.post('/user/add', async function(req, res) {
    const user = new users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.redirect('/adminPage');
});

router.get('/adding', async function(req,res){
    res.render('adding');
});

router.get('/test', async function(req,res){
  let todos = await todo.find();
  console.log(todos);
  res.render('test');
});

router.post('/test/insertTodo', async function(req,res){
  const todoN = new todo({
    title: req.body.title,
    category: req.body.category,

  })

  await todoN.save();
  res.redirect('/test');
})

module.exports = router;