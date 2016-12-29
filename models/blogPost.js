var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title : String,
  body : String,
  date : String,
  code : String,
  links : [],
  blogger : String
});

var blogModel = mongoose.model('blogPosts', blogSchema);
module.exports = blogModel;