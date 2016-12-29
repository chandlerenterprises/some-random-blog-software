var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  username : String,
  password : String,
  lastIp : String,
  posts : [], //titles
  permissions : {
    admin : Boolean,
    moderator : Boolean
  }
});

var adminModel = mongoose.model('bloggers', adminSchema);
module.exports = adminModel;