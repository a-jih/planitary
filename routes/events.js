
/*
 * GET events page.
 */

var data = require('../data.json');

exports.view = function(req, res){

  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

  for (let groupid of Object.keys(data.groups))
  {
    for (let event of data.groups[groupid]["events"])
    {
      event["month-string"] = months[Number(event.month)];
    }
  }

  res.render('events', data);
};