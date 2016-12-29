var getBloggers = require('../bloggers/load').service;

module.exports = function(req, res) {
  var categories = Object.keys(GLOBAL.posts);
  console.log(categories)
  if(!categories[0]) return res.error('this blog has no categories');
  if(req.params.id == 'all') return res.success(false, categories);
  else {
    var categoryFound;
    var category = [];

    for(var i in categories) {
      if(categories[i] == req.params.type) categoryFound = true;
    }

    if(!categoryFound) return res.error('category not found');

    getBloggers(function(bloggers) {
      
      for(var i in categories) {
        for(var a in bloggers) {
          var post = GLOBAL.posts[categories[i]][bloggers[a]];
          category.push(post);
        }
      }
      
      if(!category[0]) return res.error('this category is empty');

      res.success(false, category)
    });
  }
}