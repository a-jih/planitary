
/*
 * GET settings page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  res.render('settings', data);
};