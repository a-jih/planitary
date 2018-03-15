
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var handlebars     = require('express-handlebars');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var methodOverride = require('method-override');
var session        = require('express-session');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var errorHandler   = require('errorhandler');
var multer         = require('multer');

var up = multer({
  dest: 'public/uploads',
  limits: {fileSize: 1000000, files:1}
});

var hdbHelpers = require('./helpers/handlebars.js')(handlebars);

var index    = require('./routes/index');
var planit   = require('./routes/planit');
var events   = require('./routes/events');
var groups   = require('./routes/groups');
var settings = require('./routes/settings');
var addEvent = require('./routes/eventCreation');
var addGroup = require('./routes/groupCreation');
var grpInfo  = require('./routes/groupInfo');
var signup   = require('./routes/signup');
var planB    = require('./routes/planb');
var uploads  = require('./routes/uploads');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views/pages/'));
app.set('view engine', 'handlebars');
app.engine('handlebars', hdbHelpers.engine);
//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser('IxD secret key'));
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'IxD secret key' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/feather-icons/dist/'));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
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
app.get('/groupCreation', addGroup.view);
app.get('/joingroup/:groupid', grpInfo.join);
app.get('/signup',signup.view);
app.get('/planB', planB.view);
app.get('/eventCreation/:gid/:pid', addEvent.view);
app.post('/create', addEvent.create);
app.post('/createGroup', addGroup.create);
app.post('/upload', up.single('calendar'), uploads.uploadSettings);
app.post('/upload-signup', up.single('calendar'), uploads.uploadSignup);

// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
