
module.exports = function(req, res) {
  
  var regex = {'$regex': /^.*\b(req.body.keyword)\b.*$/};
  
  var searchQuery = {
    sort: 'ascending/descending',
    keyword: 'anything',
    category: 'a cat',
    dayPosted: 'a month, day or year => 2016'
  }

}