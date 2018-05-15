'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dump_data = require('./dump_data.json');

var _dump_data2 = _interopRequireDefault(_dump_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public', 'index.html'));
});

app.get('/data', function (req, res) {
  res.send(_dump_data2.default);
});

app.get('/recommendations', function (req, res) {
  var id = req.query.id - 1;
  var u = ['Alfred', 'Bob', 'Cold', 'Dumb', 'Elliot', 'Frank', 'Geralt', 'Host'];
  var recommendations = [];
  for (var i = 0; i < 2; i++) {
    var random = Math.floor(Math.random() * 8);
    if (u[id] != u[random] && !recommendations.includes(u[random])) {
      recommendations.push(u[random]);
    }
  }
  var result = {
    "recommendations": recommendations
  };
  var result_json = JSON.stringify(result);
  res.send(result_json);
});

app.listen(3001, function () {
  return console.log('localhost:3001. Check this!');
});