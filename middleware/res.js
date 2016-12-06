module.exports = function(req, res, next) {

  res.error = function(msg, data) {
    this.send({
      success: false,
      msg: msg,
      data: data
    });
  }
  
  res.success = function(msg, data) {
    this.send({
      success: true,
      msg: msg,
      data: data
    });
  }
  
  next();
  
}