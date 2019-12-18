var mongoose = require('mongoose');
var config = require('../config/database');
var express = require('express');

var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
var userManager = require('../models/userManager');

var router = express.Router();

var User = require("../models/user");


router.post('/signup', function (req, res) {
  userManager.registerUser(req.body,
    function () {
      res.json({ success: true, msg: 'Successful created new user.' });
    },
    function () {
      res.json({ success: false, msg: 'Username already exists.' });
    }
  );
});

router.post('/adminsignup', function (req, res) {
  userManager.registerAdmin(req.body,
    function () {
      res.json({ success: true, msg: 'Successful created new user.' });
    },
    function () {
      res.json({ success: false, msg: 'Username already exists.' });
    }
  );
});


router.post('/signin', function (req, res) {
  userManager.findUser(
    req.body,
    function (token) {
      res.json({ success: true, token: 'JWT ' + token });
    },
    function () {
      res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
    }
  )
});


router.post('/adminsignin', function (req, res) {
  userManager.findAdmin(
    req.body,
    function (token) {
      res.json({ success: true, token: 'JWT ' + token });
    },
    function () {
      res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
    }
  )
});


router.get('/users', function (req, res) {
  res.status(200).send(userManager.getUsers());
});

module.exports = router;