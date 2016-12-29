var bloggers = require(GLOBAL.base+'/models/blogger');
var config = require(GLOBAL.base+'/config.json');
var errorHandler = require(GLOBAL.base+'/middleware/errorHandler');
var jwt = require('jwt-simple');
var moment = require('moment');
var Bcrypt = require('bcryptjs');

module.exports = function(req, res) {
  var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  var username = req.body.username;
  var password = req.body.password;

  bloggers.find({ username : username }, function(err, docs) {
    if(err) return errorHandler.mongo(res, err);
    
    if(!docs[0]) return res.error('user doesnt exist');
    if(!Bcrypt.compareSync(password, docs[0].password) == true) {
      return res.error('wrong password');
    }
    
    var token = jwt.encode({
      iss: username,
      ip: 'something',
      exp: moment().add(2, 'hours').valueOf(),
      serverSessionId : GLOBAL.serverSessionId
    }, config.secret);
    
    bloggers.update({ lastIp : ip }, function(err, results) {
      if(err) return errorHandler.mongo(res, err);
      res.success(false, { token: token, expires: 1/6, username: username });
    });
  });

}