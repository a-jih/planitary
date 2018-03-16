
var data = require('../data.json');

exports.login = function(req, res) {
  var log_username = req.body.username;
  var log_password = req.body.password;

  console.log('Provided username and password: ' + log_username + "," + log_password);
  for (let username of Object.keys(data.users))
  {
    console.log(username);
    console.log(data.users[username].password);
    if (log_username == username && log_password == data.users[username].password)
    {
      // Found user
      data.current_user = username;
      res.redirect('/planit');
    }
  }

  // User not found
  console.log('No user found');
  res.redirect('/');
}