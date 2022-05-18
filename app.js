var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://localhost:27017/dodleme" , function(err,response) {
    if (err){console.log("Une erreur est survenue avec MongoDB");}
    else {console.log("Connexion a mongoDB : OK ! (" + db, " + ", response);}
});

