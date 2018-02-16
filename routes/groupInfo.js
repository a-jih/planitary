
/*
 * GET groups page.
 */

var data = require('../data.json');

exports.view = function(req, res) {

  var groupid = String(req.params.groupid);

  console.log(data.groups[groupid]);
  var renderData = {
    "group": data.groups[groupid],
    "friends": data.friends,
    "pages": data.pages
  };

  res.render('groupInfo', renderData);
};