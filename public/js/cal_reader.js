var ICAL = require('ical.js');
var merge = require('./node_modules/@jacobmischka/ical-merger');
var fs = require('fs');


icals = [
    fs.readFileSync('nathan.ics', 'utf8'),
    fs.readFileSync('dev.ics', 'utf8')
];
var test = merge(icals, {
	calname: "Merged Calendar",
	timezone: "America/Chicago",
	caldesc: "Two calendars put together"
})

var jcalData = ICAL.parse(test);

var vcalendar = new ICAL.Component(jcalData);

var vevent = vcalendar.getAllSubcomponents('vevent');
//console.log(vevent);

vevent.sort(function(a,b) {
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

vevent.sort(function(a,b) {
	var a_year = a.getFirstPropertyValue('dtend')._time.year;
	var b_year = b.getFirstPropertyValue('dtend')._time.year;

	var a_month = a.getFirstPropertyValue('dtend')._time.month;
	var b_month = b.getFirstPropertyValue('dtend')._time.month;

	var a_day = a.getFirstPropertyValue('dtend')._time.day;
	var b_day = b.getFirstPropertyValue('dtend')._time.day;

	var a_hour = a.getFirstPropertyValue('dtend')._time.hour;
	var b_hour = b.getFirstPropertyValue('dtend')._time.hour;

	var a_minute = a.getFirstPropertyValue('dtend')._time.minute;
	var b_minute = b.getFirstPropertyValue('dtend')._time.minute;

	var a_second = a.getFirstPropertyValue('dtend')._time.second;
	var b_second = b.getFirstPropertyValue('dtend')._time.second;

	var a_date = new Date(a_year, a_month, a_day, a_hour, a_minute, a_second);
	var b_date = new Date(b_year, b_month, b_day, b_hour, b_minute, b_second);

	return a_date - b_date;
});


var startTimes = []
var endTimes = []

for (var i = 0; i < vevent.length; ++i)
{
	startTimes.push(vevent[i].getFirstPropertyValue('dtstart'));

}

//console.log(startTimes);

for (var i = 0; i < vevent.length; ++i)
{
	endTimes.push(vevent[i].getFirstPropertyValue('dtend'));
}

