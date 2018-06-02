const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator({
  customValidators: {
    isImage: helpers.imageType
  }
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 86400
  }
}));
app.use(flash());

app.use(express.static(path.join(__dirname, '/public')));

// pass variables to all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.session = req.session;
  next();
});
app.use('/', index);

module.exports = app;
