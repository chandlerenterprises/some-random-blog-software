var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name : String,
  permissions : {
    admins : Array,
    moderators : Array
  },
  settings : {
    private : Boolean,
    allowed : Array,
    restrictedBloggers : [{
      blogger : String,
      banned : Boolean,
      tempBan : Date,
      muted : Boolean
    }],
    comments : Boolean
  },
  creator : String,
  posts : Array
});

var categoryModel = mongoose.model('blogPosts', categorySchema);
module.exports = categoryModel;