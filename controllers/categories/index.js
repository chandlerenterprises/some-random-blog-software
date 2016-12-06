var express = require('express');
var jwt = require('../../middleware/jwtHandler');

var router = express.Router();

/* categories */

router.post('/new', function(req, res) {
  require('./blog/new')(req, res, 'category');
});

router.post('/edit', function(req, res) {
  require('./blog/edit')(req, res, 'category');
});

router.post('/delete', function(req, res) {
  require('./blog/delete')(req, res, 'category');
});

module.exports = router;