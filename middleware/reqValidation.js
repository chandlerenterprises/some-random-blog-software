module.exports = function(req, res, next) {

  var failed = [];
  var reqKeys = Object.keys(req.body);
  for(var i = 0; i < reqKeys.length; i++) {
    var bodyVal = req.body[reqKeys[i]];
    console.log(req.body['password'])
    if(!bodyVal || bodyVal == '' || bodyVal == ' ') {
      failed.push(reqKeys[i]);
    }
  }
  if(failed[0]) return res.error('empty values', failed);
  
  next();

}