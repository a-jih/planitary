
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var fs = require('fs');

var hdbHelpers = require('./helpers/handlebars.js')(handlebars);

var index    = require('./routes/index');
var planit   = require('./routes/planit');
var events   = require('./routes/events');
var groups   = require('./routes/groups');
var settings = require('./routes/settings');
var addEvent = require('./routes/eventCreation');
var grpInfo  = require('./routes/groupInfo');
var signup   = require('./routes/signup');

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
app.get('/planit', planit.view);
app.get('/events', events.view);
app.get('/groups', groups.view);
app.get('/groups/:groupid', grpInfo.view);
app.get('/groups/:groupid/:viewAlt', grpInfo.viewAlt);
app.get('/settings', settings.view);
app.get('/eventCreation', addEvent.view);
app.get('/joingroup/:groupid', grpInfo.join);
app.get('/signup',signup.view);
app.post('/create', addEvent.create);
app.get('/eventCreation/:gid/:pid', addEvent.view);

// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
