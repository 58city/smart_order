var path = require('path');
var _ = require('lodash');
var express = require('express');

var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('./lib/logger.lib');

var bodyParser = require('body-parser');
var validator = require('./lib/validator.lib');

var cookieParser = require('cookie-parser');
var session = require('./lib/session.lib');

var router = require('./lib/route-map.lib');
var errors = require('./core/controllers/errors.controller').error;

var app = express();
/**
 * 设置模板解析
 */
app.set('view engine', 'ejs');
app.set('views', './view/frontend');
/**
 * 中间件
 */
app.use(compression());
app.use(favicon(__dirname + '/view/favicon.ico'));
app.use(logger.access());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(cookieParser());
app.use(session.check(), session.init());

app.use(express.static(path.join(__dirname, './view')));
/**
 * 转给 Roter 处理路由
 * if(req.origin=="taobao.com"){ * * * }
 */
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method == 'OPTIONS') {
    res.end('OK');
  }else {
    next();
  }
});
app.use(router);
/**
 * 错误处理程序
 */
app.use(errors);
/**
 * 导出 APP
 */
module.exports = app;