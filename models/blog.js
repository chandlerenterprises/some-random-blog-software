var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title : String,
  body : String,
  date : String,
  code : String,
  category : String,
  links : []
});

var blogModel = mongoose.model('user', blogSchema);
module.exports = blogModel;