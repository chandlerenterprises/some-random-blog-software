var express = require('express');
var jwt = require('../../middleware/jwtHandler');

var router = express.Router();

/* post */

router.post('/post/new', function(req, res) {
  require('./blog/new')(req, res, 'blogPost');
});

router.post('/post/edit', function(req, res) {
  require('./blog/edit')(req, res, 'blogPost');
});

router.post('/post/delete', function(req, res) {
  require('./blog/delete')(req, res, 'blogPost');
});

router.post('/post/duplicate', function(req, res) {
  require('./blog/duplicate')(req, res);
});

/* posts */

router.post('/search', function(req, res) {
  require('./blog/search')(req, res);
});

router.post('/load', function(req, res) {
  require('./blog/load')(req, res);
});

module.exports = router;