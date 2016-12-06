var Blog = require(global.base+'/models/blog');
var errorHandler = require(global.base+'/middleware/errorHandler')
var exists = require(global.base+'/middleware/exists')

module.exports = function(req, res, type) {
  
  var data = req.body.data;
  
  //data = title or category name;

  if(exists(res, data, type)) {

    Blog.find({ $or : [ { category : data.category }, { title : data.title } ] }).remove(function(err, results) {
      if(err) return errorHandler.mongo(res, err);
      
      //update cache
      if(type == 'blogPost') return delete global.blogPosts[data.category][data];
      delete global.blogPosts[data];
    });

  }
  
}