var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/posts', require('./posts'));
router.use('/category', require('./categories'));

module.exports = router;
