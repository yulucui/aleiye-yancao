//设置全局变量
require('./com/aleiye/service/system/GlobalSet')();
//系统初始化
require('./com/aleiye/service/system/SystemInit')();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/console.log'));
// var URL = require('url');

var logout = require('./com/aleiye/routes/logout');
var index = require('./com/aleiye/routes/index');
var chart = require('./com/aleiye/routes/chart');
var report = require('./com/aleiye/routes/report');
var user = require('./com/aleiye/routes/user');
var justwatch = require('./com/aleiye/routes/justwatch');
// var users = require('./com/aleiye/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common',{stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'recommand 128 bytes random string',
  cookie: { maxAge: 60 * 1000 * 60 * 24},
  resave: true,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/logout', logout);
app.use(function(req, res, next) {
  // var url = URL.parse(req.url).host;
  if(!req.session.User){
    res.render('server/user/login');
  }else{
    res.locals.User = req.session.User;
    next();
  }
});
app.use('/chart', chart);
app.use('/report', report);
app.use('/user', user);
app.use('/watch', justwatch);

// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
