var config = require('../config.json')
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  var decoded = jwt.decode(req.body.token, config.secret);
  if(decoded.exp <= Date.now() || decoded.iss !== config.admin) {
    return res.error('invalid token');
  }
  next();
};
