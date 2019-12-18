var express = require('express');
var authMiddleware = require('../middlewares/auth');
var router = express.Router();

router.get('/name', authMiddleware.jwtAuth, function(req, res){
  res.status(200).send('ITSC');
});

module.exports = router;
