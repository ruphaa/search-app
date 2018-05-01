const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const accessHeader = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../', 'build')));
app.use(accessHeader);
app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(config.dbURL, function(){
     console.log('MongoDB connection is established');
 });

module.exports = app;
