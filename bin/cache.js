var Blog = require(global.base+'/models/blog');
var errorHandler = require(global.base+'/middleware/errorHandler')
var moment = require('moment');

exports.assign = function(res) {
  
  global['posts'] = {};

  Blog.find({}, function(err, docs) {
    if(err) return errorHandler.mongo(res, err);
    
    for(var i in docs) {
      var blog = docs[i];
      
      if(!global.blogPosts[blog.category]) {
        global.blogPosts[blog.category] = {};
      }
      
      var title = blog.title;
      var category = blog.category;
      
      delete blog.title
      delete blog.category
      
      global.blogPosts[category][title] = blog;

    }
    console.log(global.posts)
  });
  
}