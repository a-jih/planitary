
/*
 * GET plans page.
 */

var data = require('../data.json');
var planit = require('../controllers/suggest.js');

exports.view = function(req, res){
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

  for (let groupid of Object.keys(data.groups))
  {
    // Get suggestions if member
    if (data.users[data.current_user].groups.indexOf(groupid) > -1)
    {
      data.groups[groupid].plans = planit.suggest(groupid);

      for (let planid of Object.keys(data.groups[groupid].plans))
      {
        var plan = data.groups[groupid].plans[planid];
        plan["month-string"] = months[Number(plan.month)];
      }
    }
  }

  res.render('plans', data);
};