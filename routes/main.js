const { Router } = require('express')
const router = Router()
const passwordValidator = require('password-validator');
const admins = require('../models/admins')
const users = require('../models/users');
const todo = require('../models/todo');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    } else{
        res.redirect('/login')
    }
}

const isNotAuth = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect('/profile')
    } else {
        next()
    }
}

const adminIsAuth = (req, res, next) => {
    if(req.session.IsAuth){
        next()
    } else{
        res.redirect('/logInAdmin')
    }
}

const adminIsNotAuth = (req, res, next) => {
    if(!req.session.IsAuth){
        next()
    } else {
        res.redirect('/adminPage')
    }
}

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

router.get('/notes', isAuth, async (req, res) => {

      const category = await todo.distinct('category', {user_id: req.session.user_id});
      res.render(`notes`, {categories: category});
  });

router.get('/notes/:category', isAuth, async (req, res) => {
    let category = req.params.category;
    const todos = await todo.find({"category": category});

    res.render(`InsideNoteExample`, {todos: todos, title: category});
});

router.post('/notes/:category/add', isAuth, async (req, res) => {
  let category = req.params.category;
  let todos = new todo({
    title: req.body.newTodo,
    category: category,
    user_id: req.session.user_id,
  });
  await todos.save();

  res.redirect('back');
});

router.get('/notes/:category/delete/:id', isAuth, async (req, res) => {
  let category = req.params.category;
  let id = req.params.id;
  
  await todo.deleteOne({_id: id});

  res.redirect('back');
});

router.get('/notes/:category/delete', isAuth, async (req, res) => {
  let category = req.params.category;
  
  await todo.deleteMany({"category": category});

  res.redirect('/notes');
});


router.post('/notes/add', async (req, res) => {
  res.redirect('/notes/' + req.body.category);
});

router.get('/registration', (req, res) => {
    res.render(`Registration`);
});

router.get('/login', adminIsNotAuth, (req, res) => {
      res.render(`LogIn`);
  });

router.get('/logInAdmin', isNotAuth, (req, res) => {
      res.render(`logInAdmin`);
  });

router.post('/adminPage', async (req, res) => {
        let user = await users.find({});
        let adminDB = await admins.findOne({'AdminName': req.body.name});
        if(req.body.password == adminDB.toObject().PasswordAdmin){
          req.session.IsAuth = true;
          res.render(`info`, {user: user});
        }
        else{
            res.send("invalid");
        }
  });

router.get('/adminPage', adminIsAuth, async (req, res) => {
  let user = await users.find({});
  res.render(`info`, {user: user});
});

router.get('/contactus', (req, res) => {
      res.render('ContactUs');
  });

router.post('/registration', async (req, res) => {
    const { username, email, password} = req.body;
    let userExist = await users.findOne({email});

    if(schema.validate(password) && !userExist){
        user = new users({
            username,
            email,
            password,
        });
        await user.save();

        res.render(`ConfirmPage`);
    } else{
        res.redirect('/register');
    };
});

router.get('/contact', (req, res) => {
      res.render(`ContactUs`);
  });

router.post('/login', adminIsNotAuth, async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if(!user){
        return res.redirect("/login");
    }
    if(!req.body.password == user.password){
        return res.redirect("/login");
    }
    req.session.isAuth = true;
    req.session.email = email;
    req.session.name = user.username;
    req.session.user_id = user._id;
    res.redirect("/profile");
    /*
    if(user && req.body.password == user.password){
          req.session.isAuth = true;
          res.redirect("/profile");
          /*, {
              username: user.username,
              email: user.email,
              time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          } * /
      } else if(!user){
          res.send('No user in DB with such email');
      } else res.send('invalid Password')*/
  }); 

router.get('/profile', isAuth, async (req,res) => {
    res.render("profile", {
        username: req.session.name,
        email: req.session.email
    });
});

router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
    });
});

router.post('/logoutAdmin', async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
})

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