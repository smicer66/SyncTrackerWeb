var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mw = require('./middleware/domain.middleware.js');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//app.use(mw({ app: app, option2: '2' }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 60000 }}));

app.use(function(req, res, next) {
	console.log('session id created');
	/*app.use(session(
		{ 
			name:'domain',
			genid: function(req) {
				console.log('session id created');
				return genuuid();
			}, 
			secret: 'Shsh!Secret!',
			resave: true,
			saveUninitialized: true	,
			cookie: { 
				secure: false,
				domain: req.hostname, 
				expires:60000 
			}
		}
	));*/
	if(req.session!=undefined && req.session.domain!=undefined)
	{
		console.log(req.hostname);
	}
	else
	{
		//console.log(req);
		console.log(">>>>");
		req.session.domain = req.hostname;
		req.session.save()
	}
	next();
});

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

module.exports = app;
