
/*
 * GET groups page.
 */

var data = require('../data.json');

exports.view = function(req, res) {

  var groupid = String(req.params.groupid);
  var groupdata = data.groups[groupid];

  groupdata["memberinfo"] = {}

  groupdata.members.forEach(function(element) {
    groupdata.memberinfo[element] = (data.friends[element]);
  });

  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

  for (let planid of Object.keys(groupdata.plans))
  {
    var plan = groupdata.plans[planid];
    plan["month-string"] = months[Number(plan.month) - 1];
  }

  groupdata["pages"] = data.pages;
  groupdata["user"] = data.user;

  //groupdata["id"] = groupid;

  console.log(groupdata);

  res.render('groupInfo', groupdata);
};

exports.join = function(req, res) {
  
  var groupid = String(req.params.groupid);

  if (data.groups[groupid].joined)
  {
    data.groups[groupid].joined = false;
  }
  else
  {
    data.groups[groupid].joined = true;
  }

  var groupdata = data.groups[groupid];

  groupdata["memberinfo"] = {}

  groupdata.members.forEach(function(element) {
    groupdata.memberinfo[element] = (data.friends[element]);
  });

  groupdata["pages"] = data.pages;

  groupdata["id"] = groupid;

  console.log(groupdata);

  res.render('groupInfo', groupdata);
}