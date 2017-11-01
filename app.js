var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/users');
var poll = require('./routes/polls');
var config = require('./config');

// connect to mongoDB with mongoose
var promise = mongoose.connect(config.uri, {useMongoClient: true},function(err){
	  if(err){
        console.log('Could not connect to mongo db');
    }
    else {
        console.log('Successfully connected to mongo db');
    }
});


var app = express();

// Use the cors module before the routes
app.use(cors());

// view engine setup
app.set('superSecret', config.secret); 
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
app.use('/users', users);
app.use('/polls', poll);// poll route

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

app.listen(8888);
console.log("app running on port 8888")

module.exports = app;
