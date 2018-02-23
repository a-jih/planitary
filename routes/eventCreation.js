
/*
 * GET groups page.
 */


var data = require('../data.json');

exports.view = function(req, res){

  

//    /* var titl = document.getElementById("title").value;
//     var groupName = document.getElementById("group").value;
//     var dat = document.getElementById("Day").value;
//     var start = document.getElementById("start").value;
//     var endt = document.getElementById("end").value;
//     var descriptio = document.getElementById("description").value;
// */

//     console.log(titl);
//     console.log(groupName);
//     console.log(start);
//     console.log(end);
//     console.log(descriptio);
//     console.log(dat);

//     var eve = {title:titl, date:dat, startt:start, endt:end, 
//       description:descriptio};

//       data.groups["0"].events.push(eve);

//    // var eve = {title:titl, date:dat, startt:start, endt:end, 
//      //               description:descriptio};
  res.render('eventCreation', data);
};

exports.create = function(req, res) {
  var title = req.query.title;
  var groupName = req.query.group;
  var date = new Date(req.query.date);
  var startt = new Date(req.query.date + ' ' + req.query.startt);
  var endt = new Date(req.query.date + ' ' + req.query.endt);
  var description = req.query.description;

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
      res.render('events', data);
    }
  }

  res.render('eventCreation', data);
}