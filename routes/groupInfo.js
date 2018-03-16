
/*
 * GET groups page.
 */

var planit = require('../controllers/suggest.js');
var data = require('../data.json');
const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

exports.view = function(req, res) {


  var groupid = String(req.params.groupid);
  var groupdata = data.groups[groupid];
  var cur_user = data.users[data.current_user];

  groupdata['viewAlt']=false;
  
  groupdata["memberinfo"] = {}

  groupdata.members.forEach(function(element) {
    groupdata.memberinfo[element] = (data.users[element]);
  });

  // Get suggestions if member
  if (cur_user.groups.indexOf(groupid) > -1)
  {
    data.groups[groupid].plans = planit.suggest(groupid);

    for (let planid of Object.keys(data.groups[groupid].plans))
    {
      var plan = data.groups[groupid].plans[planid];
      plan["month-string"] = months[Number(plan.month)];
    }
  }

  // Store plans
  for (let planid of Object.keys(groupdata.plans))
  {
    var plan = groupdata.plans[planid];
    plan["month-string"] = months[Number(plan.month) - 1];
  }

  groupdata["pages"] = data.pages;
  //groupdata["user"] = data.user;
  groupdata["user"] = data.users[data.current_user];

  console.log(groupdata);

  res.render('groupInfo', groupdata);
};

exports.viewAlt = function(req, res) {

  var groupid = String(req.params.groupid);
  var groupdata = data.groups[groupid];

  groupdata['viewAlt']=true;

  groupdata["memberinfo"] = {}

  groupdata.members.forEach(function(element) {
    groupdata.memberinfo[element] = (data.users[element]);
  });

  // Get suggestions if member
  if (cur_user.groups.indexOf(groupid) > -1)
  {
    data.groups[groupid].plans = planit.suggest(groupid);

    for (let planid of Object.keys(data.groups[groupid].plans))
    {
      var plan = data.groups[groupid].plans[planid];
      plan["month-string"] = months[Number(plan.month)];
    }
  }

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

  var cur_user = data.users[data.current_user];

  if (cur_user.groups.includes(groupid))
  {
    var i = cur_user.groups.indexOf(groupid);
    var m = data.groups[groupid].members.indexOf(data.current_user);

    if (i > -1)
    {
      cur_user.groups.splice(i, 1);
    }

    if (m > -1)
    {
      data.groups[groupid].members.splice(m, 1);
    }
  }
  else
  {
    cur_user.groups.push(groupid);

    data.groups[groupid].members.push(data.current_user);
  }

  res.redirect('/groups');
}