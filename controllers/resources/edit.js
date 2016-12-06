var Blog = require(global.base+'/models/blog');
var errorHandler = require(global.base+'/middleware/errorHandler')
var exists = require(global.base+'/middleware/exists')

exports.edit = function(req, res, type) {
  
  var data = res.body.data;
  
  //edit blog post contents

  var exists = exists(res, data, type);

  if(exists && type == 'blogPost') {
    
    Blog.update({ title: data.title }, data, function(err, docs) {
      if(err) return errorHandler.mongo(res, err);

      //update cache
      var editedKeys = Object.keys(data);
      for(var i in editedKeys) {
        global.blogPosts[data.category][data.title][editedKeys[i]] = data[editedKeys[i]];
      }
      return;
      
    });
    
  }
  
  //edit category name
  //data = {oldName: 'asdasd', newName: 'blah'};

  if(exists) return res.error('that category already exists');

  Blog.update({ category: data.oldName }, { category : data.newName }, function(err, docs) {
    if(err) return errorHandler.mongo(res, err);
    
    //update cache
    global.blogPosts[data.newName] = global.blogPosts[data.oldName];
    delete global.blogPosts[data.oldName];    
  });
  
}