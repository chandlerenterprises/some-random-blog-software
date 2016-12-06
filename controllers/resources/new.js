var Blog = require(global.base+'/models/blog');
var errorHandler = require(global.base+'/middleware/errorHandler')
var exists = require(global.base+'/middleware/exists')

module.exports = function(req, res, type) {
  
  var data = req.body.data;
  
  //data = full blog post // category name;
  
  if(exists(res, data, type)) return res.error('that '+type+' already exists');
  
  if(type == 'blogPost') {
    
    if(data.title.length > 15) return res.error('title greater than 15 char');
    
    Blog.insert(data, function(err, docs) {
      if(err) return errorHandler.mongo(res, err);
      
      //update cache
      return global.blogPosts[data.category].push(data);        
    });

  }
  
  Blog.insert({ category : data.category, title : 'empty category' }, function(err, docs) {
    if(err) return errorHandler.mongo(res, err);
    
    //update cache
    global.blogPosts[data] = {};
  })
  
}