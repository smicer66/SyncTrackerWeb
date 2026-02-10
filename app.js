var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mw = require('./middleware/domain.middleware.js');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var SessionService = require("./services/session.service");
const moment = require('moment');

var app = express();
//var hbs = expressHbs.create({});

/*hbs.handlebars.registerHelper('formatDate', function(datetime, format) {

	// Use UI.registerHelper..
	UI.registerHelper("formatDate", function(datetime, format) {
		  if (moment) {
			// can use other formats like 'lll' too
			format = DateFormats[format] || format;
			return moment(datetime).format(format);
		  }
		  else {
			return datetime;
		  }
		}
	);
})*/

hbs.registerHelper('formatDate', function (datetime, format) { 
	//UI.registerHelper("formatDate", function(datetime, format) {
	var DateFormats = {
		short: "DD MMMM YYYY",
		long: "dddd DD.MM.YYYY HH:mm"
	};
	
		  if (moment) {
			// can use other formats like 'lll' too
			var format = DateFormats[format] || format;
			return moment(datetime).format(format);
		  }
		  else {
			return datetime;
		  }
		//}
	//);
});


hbs.registerHelper('ifEq', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});


hbs.registerHelper('compare', function (a, operator, b, options) {
  switch (operator) {
    case '==': return a == b ? options.fn(this) : options.inverse(this);
    case '===': return a === b ? options.fn(this) : options.inverse(this);
    case '!=': return a != b ? options.fn(this) : options.inverse(this);
    case '>': return a > b ? options.fn(this) : options.inverse(this);
    case '<': return a < b ? options.fn(this) : options.inverse(this);
    default: return options.inverse(this);
  }
});

//app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:true, cookie: { maxAge: 60000 }}));
var session = session({
    secret: 'keyboard cat',resave:false,saveUninitialized:true, cookie: { maxAge: 60000 }
});
app.use(session);
console.log(">>>>>>>>>>>>");
app.use(mw({ app: app, option2: '2' }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', indexRouter);
app.use('/users', usersRouter);

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

/**/


//app.use(mw({ app: app, option2: '2' }))

module.exports = app;
