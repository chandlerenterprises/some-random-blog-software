var blogger = require(GLOBAL.base+'/models/blogger');
var config = require(GLOBAL.base+'/config.json');
var errorHandler = require(GLOBAL.base+'/middleware/errorHandler');
var jwt = require('jwt-simple');
var moment = require('moment');
var Bcrypt = require('bcryptjs');

module.exports = function(req, res) {
  if(GLOBAL.adminSetup) return res.error('admin already configured');
  
  var salt = Bcrypt.genSaltSync(10);
  var hash = Bcrypt.hashSync(req.body.password, salt);
  var admin = { 
    username : req.body.username,
    password : hash,
    lastIp : req.headers['x-real-ip'] || req.connection.remoteAddress,
    permissions : {
      admin : true
    }
  }
  //could add some sort of preliminary step of themeing, db hook up, & broader settings
  
  blogger.create(admin, function(err, docs) {
    if(err) return errorHandler.mongo(res, err);
    
    var expires = moment().add(7 ,'days').valueOf()
    var token = jwt.encode({
      iss: req.body.username,
      ip: 'something',
      exp: expires,
      serverSessionId : GLOBAL.serverSessionId
    }, config.secret);
    
    GLOBAL.adminSetup = true;
    
    res.success(false, { token: token, expires: 1/6, username: req.body.username });
  });
  
}