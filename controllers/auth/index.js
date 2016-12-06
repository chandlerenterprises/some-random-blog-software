var express = require('express');
var jwt = require('../../middleware/jwtHandler');

var router = express.Router();

/* signin */

router.post('/auth', function(req, res) {
  console.log(req.connection)
  require('./auth')(req, res);
});

/* GET admin page. */

router.get('/', function(req, res, next) {
  res.render('auth');
});

module.exports = router;