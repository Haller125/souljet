const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  res.render('MainPage');
});

router.get('/profile', (req, res) => {
    res.render(`profile`);
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