var fs = require('fs')
exports.mongo = function(res, mongoError) {
  if(mongoError) {
    fs.appendFile('message.txt', mongoError, function(err) {
      if (err) console.log('mongo error failed to save'), process.exit(1);
      else console.log(mongoError);
      res.error('unexpected error');
    });
  }
}