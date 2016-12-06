module.exports = function(req, res) {
  
  if(Object.keys(global.posts)[0]) {
    res.success(false, global.posts);
  } else {
    res.error('no blog posts');
  }

}