var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  username : String,
  password : String,
  IP : String,
  posts : []
});

var adminModel = mongoose.model('user', adminSchema);
module.exports = adminModel;