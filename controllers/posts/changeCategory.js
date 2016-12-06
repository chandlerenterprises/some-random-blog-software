var Blog = require(global.base+'/models/blog');
var errorHandler = require(global.base+'/middleware/errorHandler')
var exists = require(global.base+'/middleware/exists')

module.exports = function(req, res) {
  
  var data = req.body.data, blogPost = data.blogPost, newCategory = data.newCategory
  
  if(exists(res, data, 'category')) {
    if(exists(res, blogPost, 'blogPost')) {
      
      //if new cat or blog title doesnt exist, respond with the
      //corresponding error using the data that gets sent with res.error in "exists"
      
      Blog.update({ title: blogPost.title }, { category: newCategory }, function(err, docs) {
        if(err) return errorHandler.mongo(res, err);
        
        //update cache
        delete global.blogPosts[blogPost.category][blogPost.title];
        global.blogPosts[newCategory][blogPost.title] = blogPost
      });
      
    }
  }

}