$(document).ready(function() {
    $('#username').focus();
  
    $('#submit').click(function() {
  
       event.preventDefault(); // prevent PageReLoad
  
      var ValidEmail = $('#username').val() === $('#username').val(); // User validate
      var ValidPassword = $('#password').val() === $('#password').val(); // Password validate
  
        if (ValidEmail === true && ValidPassword === true) { // if ValidEmail & ValidPassword
            $('.valid').css('display', 'block');
            window.location.href = "/planit"; // go to home.html
        }
        else {
            $('.error').css('display', 'block'); // show error msg
        }
    });
  });