var Blog = require(global.base+'/models/blog.js');
var config = require(global.base+'/config.json');
var errorHandler = require(global.base+'/middleware/errorHandler');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(req, res) {
  
  console.log(config)
  if(config.username !== req.body.username) return res.error('failed username');
  if(config.password !== req.body.password) return res.error('wrong password');

  var token = jwt.encode({
    iss: config.username,
    ip: 'something',
    exp: moment().add(7 ,'days').valueOf()
  }, config.secret);
  
  res.success()
  
}