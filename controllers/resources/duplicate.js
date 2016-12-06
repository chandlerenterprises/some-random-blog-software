var Blog = require(global.base+'/models/blog');
var errorHandler = require(global.base+'/middleware/errorHandler')
var exists = require(global.base+'/middleware/exists')

exports.duplicateBlogPost = function(req, res) {
  //duplicate = {category: 'asdasd', title: 'blsah'};
  
  var data = req.body.data, duplicate = data.duplicate, blogPost = data.blogPost

  if(exists(res, blogPost, 'blogPost')) {
    
    var cachedDup = global.blogPosts[duplicate.category][duplicate.title];
    Object.assign(cachedDup, duplicate);
    
    Blog.insert(cachedDup, function(err, docs) {
      if(err) return errorHandler.mongo(res, err);
      
      //update cache
      global.blogPosts[blogPost.category][blogPost.title] = duplicate
    });
    
  }

}