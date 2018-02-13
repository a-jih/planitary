
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');

var hdbHelpers = require('./helpers/handlebars.js')(handlebars);

var index    = require('./routes/index');
var plans    = require('./routes/plans');
var events   = require('./routes/events');
var groups   = require('./routes/groups');
var settings = require('./routes/settings');
var addEvent = require('./routes/eventCreation');
var grpInfo  = require('./routes/groupInfo');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views/pages/'));
app.engine('handlebars', hdbHelpers.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/feather-icons/dist/'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Get views
app.get('/', index.view);
app.get('/plans', plans.view);
app.get('/events', events.view);
app.get('/groups', groups.view);
app.get('/settings', settings.view);
app.get('/eventCreation', addEvent.view);
app.get('/groupInfo', grpInfo.view);

// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
