
/*
 * GET groups page.
 */


var data = require('../data.json');

exports.view = function(req, res){

   var titl = req.query.title;
   var groupName = req.query.group;
   var dat = req.query.Day;
   var start = req.query.start;
   var end = req.query.end;
   var descriptio = req.query.description;
   /* var titl = document.getElementById("title").value;
    var groupName = document.getElementById("group").value;
    var dat = document.getElementById("Day").value;
    var start = document.getElementById("start").value;
    var endt = document.getElementById("end").value;
    var descriptio = document.getElementById("description").value;
*/

    console.log(titl);
    console.log(groupName);
    console.log(start);
    console.log(end);
    console.log(descriptio);
    console.log(dat);

    var eve = {title:titl, date:dat, startt:start, endt:end, 
      description:descriptio};

      data.groups["0"].events.push(eve);

   // var eve = {title:titl, date:dat, startt:start, endt:end, 
     //               description:descriptio};
  res.render('eventCreation', data);
};