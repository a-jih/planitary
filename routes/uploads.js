/**
 * Uploading iCal logic
 */


var ICAL  = require('ical.js');
var merge = require('@jacobmischka/ical-merger');
var fs    = require('fs');

var data = require('../data.json');

exports.addCal = function (req, res) {

  var ical_file = req.file.path;

  // Parse iCal file
  var icals = [
    fs.readFileSync(ical_file, 'utf8')
    //fs.readFileSync('dev.ics', 'utf8')
  ];
  var test = merge(icals, {
    calname: "Merged Calendar",
    timezone: "America/Chicago",
    caldesc: "Two calendars put together"
  })

  var jcalData  = ICAL.parse(test);
  var vcalendar = new ICAL.Component(jcalData);
  
  // Sort event data
  var vevent = vcalendar.getAllSubcomponents('vevent');

  // Sort by start times
  var sorted_events = [];
  vevent.sort(function (a, b) {
    var a_year = a.getFirstPropertyValue('dtstart')._time.year;
    var b_year = b.getFirstPropertyValue('dtstart')._time.year;

    var a_month = a.getFirstPropertyValue('dtstart')._time.month;
    var b_month = b.getFirstPropertyValue('dtstart')._time.month;

    var a_day = a.getFirstPropertyValue('dtstart')._time.day;
    var b_day = b.getFirstPropertyValue('dtstart')._time.day;

    var a_hour = a.getFirstPropertyValue('dtstart')._time.hour;
    var b_hour = b.getFirstPropertyValue('dtstart')._time.hour;

    var a_minute = a.getFirstPropertyValue('dtstart')._time.minute;
    var b_minute = b.getFirstPropertyValue('dtstart')._time.minute;

    var a_second = a.getFirstPropertyValue('dtstart')._time.second;
    var b_second = b.getFirstPropertyValue('dtstart')._time.second;

    var a_date = new Date(a_year, a_month, a_day, a_hour, a_minute, a_second);
    var b_date = new Date(b_year, b_month, b_day, b_hour, b_minute, b_second);

    return a_date - b_date;
  });

  for (var i = 0; i < vevent.length; ++i) {
    var start_time = vevent[i].getFirstPropertyValue('dtstart')._time;
    var end_time = vevent[i].getFirstPropertyValue('dtend')._time;

    var event = {
      start: start_time,
      end: end_time
    };

    sorted_events.push(event);
  }

  // Check events created in order
  console.log(sorted_events);

  data.user.uploaded = true;
  data.user['ical-events'] = sorted_events;
  data.user['ical-filename'] = req.file.originalname;

  res.redirect('/settings');
};