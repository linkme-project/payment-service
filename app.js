var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let dateFormat = require('dateformat');

var paymentsRouter = require('./routes/payments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res, next) => {
  console.log(dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss') + ' ' + req.method + ' ' + decodeURIComponent(req.originalUrl)+ ' ' + JSON.stringify(req.body));
  next();
});

app.use('/payments', paymentsRouter);
app.use('/healthy', (req, res, next) => {
  res.status(200).json();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
