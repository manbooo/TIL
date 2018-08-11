// express 모듈 불러오기
var express = require('express');

// express app 생성
var app = express();

// user router 불러오기
var user = require('./routes/user');

// middleware 구현
// var myLogger = function(req, res, next) {
//   console.log(req.url);
//   next();
// }

// app.use(myLogger);

// morgan 미들웨어
var morgan = require('morgan');

app.use(morgan('dev'));

//body-parser 미들웨어
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// static 미들웨어
app.use('/', express.static('public'));

// 라우팅
// req = request, res = response
// app.get('/', function(req, res) {
//   res.send('Hello World');
// });

app.use('/user', user);

// server open
app.listen(3000, function() {
  console.log('Example App listening on port 3000');
});
