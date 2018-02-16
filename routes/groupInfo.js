
/*
 * GET groups page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  var groupname = req.params.groupname;

  var groupinfo = data.groups.find(function(group) {
    return group.name == groupname;
  });

  res.render('groupInfo', groupinfo);
};