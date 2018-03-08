
/*
 * GET plans page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

  for (let groupid of Object.keys(data.groups))
  {
    for (let planid of Object.keys(data.groups[groupid].plans))
    {
      var plan = data.groups[groupid].plans[planid];
      plan["month-string"] = months[Number(plan.month) - 1];
    }
  }

  res.render('planb', data);
};