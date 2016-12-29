var config = require('../../config.json');
var validateJwt = require('../../middleware/jwtHandler.js').validate
var url = require('url')
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {

  validateJwt(req, function(err, decoded) {
    if(decoded) global.invalidTokens.push(decoded);
    var refererPath = url.parse(req.headers.referer).path;
    if(refererPath !== '/auth/signin') res.redirect('/auth/signin')
    else res.end()
  });
  
}