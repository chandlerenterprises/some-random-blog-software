var express = require('express');
var required = require('../../middleware/reqValidation').checkRequired
var router = express.Router();

/*
 
 BLOGGERS CONTROLLER

*/

router.get('/', function(req, res, next) {
  //res.Render('signin');
});

router.get('/load/:id', function(req, res) {
  require('./load').route(req, res)
});

module.exports = router;

//....
