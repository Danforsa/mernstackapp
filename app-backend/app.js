var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // We will use this to parse the HTTP request body so that we can retrieve data to post to the database

var index = require('./routes/index');
var test = require('./routes/test');
var mongoose = require('mongoose');
var task = require('./routes/task');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/test/', test);
require('./routes/task.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//At the time of writing, the connectionstring provided byt Atlas
//for connecting your application with a driver 3.4 or earlier
//had to be used to allow your MongoDB database to be manipulated
//using Mongoose.

//const uri=' mongodb://user:Password@test-shard-00-00-yhfbd.mongodb.net:27017,test-shard-00-01-yhfbd.mongodb.net:27017,test-shard-00-02-yhfbd.mongodb.net:27017/test?ssl=true&replicaSet=test-shard-0&authSource=admin';

mongoose.Promise = global.Promise;

mongoose.connect(uri);

mongoose.connection.on('error', function(err) {
    console.log('Could not connect to the database. Exiting now...');
    console.log(err); 
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

// define a simple route
app.get('/', function(req, res){
	req.body.title = 'Testing';
	req.body.content = 'Let us see if this works';
});

module.exports = app;
