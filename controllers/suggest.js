'use strict';

var data = require('../data.json');
var utils = require('./utils.js');

exports.suggest = function (group_id) {

  var group = data.groups[group_id];

  // Get all member events, convert start and end times to Dates
  var cur_date = Date.now();
  var members_events = [];
  for (var i = 0; i < group.members; ++i)
  {
    var m_events = data.friends[group.members[i]]['ical-events'];
    for (var j = 0; j < m_events.length; ++i)
    {
      var event = m_events[j];
      
      // Get ending date
      var end_year   = event.end.year;
      var end_month  = event.end.month;
      var end_day    = event.end.day;
      var end_hour   = event.end.hour;
      var end_minute = event.end.minute;
      var end_second = event.end.second;
      var end_date   = new Date(end_year, 
                                end_month,
                                end_day,
                                end_hour,
                                end_minute,
                                end_second);

      if (end_date - cur_date < 0)
      {
        // Event ends before now, ignore event
        continue;
      }

      // Get starting date
      var start_year   = event.start.year;
      var start_month  = event.start.month;
      var start_day    = event.start.day;
      var start_hour   = event.start.hour;
      var start_minute = event.start.minute;
      var start_second = event.start.second;
      var start_date   = new Date(start_year, 
                                  start_month,
                                  start_day,
                                  start_hour,
                                  start_minute,
                                  start_second);

      members_events.push({
        start: start_date,
        end: end_date
      });
    }
  }

  // Sort all group member events by start time
  members_events.sort(function (a, b) {
    return a.start - b.start;
  });

  // Find vacant space
  var suggestions = suggest_helper(members_events);

  return suggestions;
}

// Finds vacant spaces in schedule based on 
function suggest_helper (members_events) {

  var busy_start = members_eve
  for (var i = 0; i < members_events.length; ++i)
  {

  }
}