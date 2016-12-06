/*
  "exists" searches cache for blog title & category keys
    - If supplied key doesn't exist, error is sent to client.
    - Continues flow.
*/

module.exports = function(res, searchFor, type, handleErr) {
  var cached;
  var keys;
  var category;

  if(type == 'blogPost') {
    category = searchFor.category;
    cached = global.blogPosts[category];
    searchFor = searchFor.title;
  } else {
    category = searchFor.category;
    cached = global.blogPosts;
  }

  keys = Object.keys(cached);

  var error = {}
  var exists;

  if(!keys) error['msg'] = 'category', error['data'] = category;
  else {
    for(var i in keys) {
      if(keys[i] == searchFor) return exists = true;
    }
    if(!exists) error['msg'] = type, error['data'] = category;
  }

  if(error.msg) res.error(error.msg + ' doesnt exist', error.data);
  return exists;
}