
/*
 * GET groups page.
 */


var data = require('../data.json');

exports.view = function(req, res) {
  res.render('eventCreation', data);
};

exports.create = function(req, res, next) {
  var title = req.body.title;
  var groupName = req.body.group;
  var date = new Date(req.body.date);
  var startt = new Date(req.body.date + ' ' + req.body.startt);
  var endt = new Date(req.body.date + ' ' + req.body.endt);
  var description = req.body.description;

  if (title && groupName && date && startt && endt && description) {
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

    // Date
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    startt = startt.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
    endt = endt.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

    var event = {
      'title': title,
      'day': day,
      'month': month,
      'year': year,
      'startt': startt,
      'endt': endt,
      'description': description
    };

    for (var grp in data.groups) {
      if (groupName == data.groups[grp].name) {
        if (data.groups[grp].events) {
          data.groups[grp].events.push(event);
        } else {
          data.groups[grp]['events'] = [event];
        }
        res.redirect('/events');
      }
    }
  }
}