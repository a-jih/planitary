'use strict';

var data = require('../data.json');
var utils = require('./utils.js');

exports.suggest = function (group_id) {

  var group = data.groups[group_id];

  // Get all member events, convert start and end times to Dates
  var cur_date = new Date();
  var week_from = new Date(cur_date.getTime() + 8 * 24 * 60 * 60 * 1000);

  var friends_in_group = group.members;

  // Create event list with buffers
  var members_events = add_buffers(cur_date, friends_in_group);

  // Populate event list with members' events
  console.log(group.members);
  for (var i = 0; i < group.members.length; ++i)
  {
    var m_events = data.users[group.members[i]]['ical-events'];

    add_events(members_events, m_events, cur_date, week_from);
  }
  var m_events = data.user['ical-events'];
  add_events(members_events, m_events, cur_date, week_from);

  // Sort all group member events by start time
  members_events.sort(function (a, b) {
    return a.start - b.start;
  });

  console.log("Resulting busy events:")
  console.log(members_events)

  // Find vacant spaces
  var suggestions = suggest_helper(members_events, friends_in_group);

  return suggestions;
}

// Finds vacant spaces in schedule based on start and end times
function suggest_helper (members_events, friends_in_group) {

  const time_options = {hour12: false, hour: '2-digit', minute: '2-digit'};
  const time_options2 = {hour12: true, hour: '2-digit', minute: '2-digit'};

  var suggestions = {};
  var busy_start = members_events[0].start;
  var busy_end   = members_events[0].end;
  for (var i = 1; i < members_events.length; ++i)
  {
    var cur_event = members_events[i];

    if (cur_event.start > busy_end)
    {
      // Opening is across only one day
      var plan = {
        id: utils.gen_id(),
        day: busy_end.getDate(),
        month: busy_end.getMonth(),
        year: busy_end.getFullYear(),
        start: busy_end.toLocaleTimeString('en-US', time_options),
        end: cur_event.start.toLocaleTimeString('en-US', time_options),
        start_string: busy_end.toLocaleTimeString('en-US', time_options2),
        end_string: cur_event.start.toLocaleTimeString('en-US', time_options2),
        friends: friends_in_group
      };

      // Add new plan
      suggestions[plan.id] = plan;

      // Set new busy start and end
      busy_start = cur_event.start;
      busy_end   = cur_event.end;
    }
    else if (cur_event.end > busy_end)
    {
      busy_end = cur_event.end;
    }
  }

  return suggestions;
}

// creates empty events list with buffer events
function add_buffers (cur_date) {

  var event_list = [];

  var day_end = new Date(cur_date.getFullYear(),
                         cur_date.getMonth(),
                         cur_date.getDate(),
                         23,
                         59);
  for (var i = 0; i < 7; i++)
  {
    // Create dividing event between days in a week
    var day_end_event = {
      start: day_end,
      end: new Date(day_end.getTime() + 60 * 1000)
    };
    event_list.push(day_end_event);

    // Get next day
    day_end = new Date(day_end.getTime() + 1 * 24 * 60 * 60 * 1000);
  }

  return event_list;
}

function add_events (members_events, m_events, cur_date, week_from) {

  for (var j = 0; j < m_events.length; j++)
  {
    var event = m_events[j];
    
    // Get ending date
    var end_year   = Number(event.end.year);
    var end_month  = Number(event.end.month);
    var end_day    = Number(event.end.day);
    var end_hour   = Number(event.end.hour);
    var end_minute = Number(event.end.minute);
    var end_second = Number(event.end.second);
    var end_date   = new Date(end_year, 
                              end_month,
                              end_day,
                              end_hour,
                              end_minute,
                              end_second);
    if (end_date < cur_date)
    {
      // Event ends before now, ignore event
      continue;
    }
    
  
    // Get starting date
    var start_year   = Number(event.start.year);
    var start_month  = Number(event.start.month);
    var start_day    = Number(event.start.day);
    var start_hour   = Number(event.start.hour);
    var start_minute = Number(event.start.minute);
    var start_second = Number(event.start.second);
    var start_date   = new Date(start_year, 
                                start_month,
                                start_day,
                                start_hour,
                                start_minute,
                                start_second);

    
    if (week_from < start_date)
    {
      // Stop reading events further from a week from now
      break;
    }
    
    members_events.push({
      start: start_date,
      end: end_date
    });
  }
}