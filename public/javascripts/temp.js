/*global $ */
$(document).ready(function() {
   $('#signin button').click(function() {
     
      $.ajax({
        type : 'POST',
        url : 'https://themet.ethanchandler.net/admin/signin',
        data: {
          username: $('#signin input.username').val(),
          password: $('#signin input.password').val()
        },
        success: function(res) {
          if(res.success) {
            alert('success!')
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('username', res.username);
          } else {
            alert(res.msg +' '+ JSON.stringify(res.data))
          }
        }
      }); 
   })
});