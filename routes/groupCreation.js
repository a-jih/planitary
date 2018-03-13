
/*
 * GET groups page.
 */


var data = require('../data.json');
var utils = require('../controllers/utils.js');

exports.view = function(req, res) {
  res.render('groupCreation', data);
};

exports.create = function(req, res) {
  var groupName = req.body.groupname;
  var groupId = utils.gen_id();

  if (groupName) {

    var group = {
      id: groupId,
      name: groupName,
      joined: true,
      members: [],
      events: [],
      plans: {}
    };

    // Add group
    data.groups[groupId] = group;

    res.redirect('/groups/' + groupId);
  }
}