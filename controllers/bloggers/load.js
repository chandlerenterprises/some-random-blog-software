exports.route = function(req, res) {
  
  exports.service(function(bloggers) {
    if(!bloggers[0]) return res.error('this blog has no bloggers');
    
    var id = req.params.id, load;
    if(id == 'all') load = bloggers;
    else {
      var found, load = {}, postsByBlogger = [];
      for(var i in bloggers) {
        if(bloggers[i] == id) found = true;
      }
      
      if(!found) return res.error('this blogger doesnt exist');
      for(var i in GLOBAL.categories) {
        var postsInCategory = GLOBAL.posts[GLOBAL.categories[i]][id];
        if(postsInCategory) {
          var titles = Object.keys(postsInCategory);
          for(var a in titles) {
            postsByBlogger.push(postsInCategory[titles[a]])
          }
        }
      }
      
      if(!postsByBlogger[0]) return res.error('this blogger has no posts!');
      
      load = { 
        posts : postsByBlogger,
        profileImg : 'do something here',
        activity : '?'
      }
    }

    res.success(false, load);
  });
      
}

exports.service = function(cb) {
  var bloggers = [];
  for(var i in GLOBAL.categories) {
    var bloggersInCat = Object.keys(GLOBAL.posts[GLOBAL.categories[i]]);
    if(!bloggers[0]) {
      if(bloggersInCat[0]) bloggers = bloggersInCat;
    } else {
      for(var a in bloggers) {
        for(var b in bloggersInCat) {
          if(bloggersInCat[b] == bloggers[a]) bloggersInCat.splice(b, 1);
        }
      }
      bloggers.concat(bloggersInCat);
    };
  };

  cb(bloggers);
  
}