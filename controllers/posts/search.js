var exists = require(global.base+'/middleware/exists')

module.exports = function(req, res) {
  
  var regex = {'$regex': /^.*\b(req.body.keyword)\b.*$/};
  var data = req.body.data;
  var titles = [];
  var blogPosts;

  if(data.category) {
    if(exists(res, data, 'category')) {
      var category = global.blogPosts[data.category];
      titles = Object.keys(category);
      if(!titles[0]) return res.error('category empty');
      blogPosts = category;
    }
  } else {
    blogPosts = global.blogPosts;
    var categories = Object.keys(blogPosts);
    if(!categories[0]) return res.error('no categories');
    for(var i in categories) {
      titles.concat(Object.keys(blogPosts[category[i]]));
    } 
  }
  
  var matches = {};
  
  for(var i in titles) {
    var post = blogPosts[titles[i]];
    var postKeys = Object.keys(post);
    
    for(var a in postKeys) {
      if(data.keyword && post[postKeys[a]].indexOf(data.keyword) >= 0) {
        var currentMatchedTitles = Object.keys(matches)
        
        for(var b in currentMatchedTitles) {
          if(currentMatchedTitles[b] == titles[i]) {
            continue;
          }
        }
        
        matches[titles[i]] = post;
      }
    /* by date   
      if(post[postKeys[a]] >= data.date.from && post[postKeys[a]] <= data.date.to) {
        
      }
    */      
    }

  }
  
  var searchQuery = {
    sort: 'ascending/descending',
    keyword: 'anything',
    category: 'a cat',
    date: 'a month, day or year => 2016'
  }

}