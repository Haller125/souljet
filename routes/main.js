var express = require('express');
const { Router } = require('express')
const users = require('../models/users')
var router = Router()
const passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .has().symbols();


router.get('/', (req, res) => {
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



module.exports = router;