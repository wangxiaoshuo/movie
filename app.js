var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exhbs = require("express3-handlebars");
var mongoose = require("mongoose");
var multer = require("multer");
var session = require("express-session");
var moment = require("moment");

var index = require('./routes/index');
var users = require('./routes/users');
global.funs = require("./funs/funs");
global.dbHandle = require("./database/dbHandle");
global.db = mongoose.connect("mongodb://localhost:27017/test");
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
var hbs = exhbs.create({
  partialsDir:"view/partials",
    layoutsDir:"views/layouts/",
    defaultLayout:"main",
    extname:".hbs"
});
app.engine("hbs",hbs.engine);
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer());
app.use(session({
    secret:"secret",
    cookie:{
        maxAge:1000*60*60*24
    }
}));


app.use(function(req,res,next){
    res.locals.user = req.session.user;
    res.locals.movie = req.session.movie;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = "";
    if(err){
        res.locals.message = err;
    }
    next()
});


app.use('/', index);
app.use("/test",index);
app.use('/users', users);
app.use("/register",index);
app.use("/login",index);
app.use("/admin",index);
app.use("/tvupdate",index);
app.use("/user",index);
app.use("/play/mv/:id",index);
app.use("/user/:id",index);
app.use("/tv/detail/:id",index);
app.use("/movie/session",index);
app.use("/mv",index);
app.use("/tv",index);
app.use("ac",index);
app.use("gm",index);
app.use("/play",index);


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

module.exports = app;
