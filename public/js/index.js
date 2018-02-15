$(document).ready(function() {
    $('#username').focus();
  
    $('#submit').click(function() {
  
       event.preventDefault(); // prevent PageReLoad
  
      var ValidEmail = $('#username').val() === 'cogs120'; // User validate
      var ValidPassword = $('#password').val() === 'planitary'; // Password validate
  
        if (ValidEmail === true && ValidPassword === true) { // if ValidEmail & ValidPassword
            $('.valid').css('display', 'block');
            window.location.href = "/plans"; // go to home.html
        }
        else {
            $('.error').css('display', 'block'); // show error msg
        }
    });
  });