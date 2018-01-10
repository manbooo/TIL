// express 모듈 불러오기
var express = require('express');

// express app 생성
var app = express();

// user router 불러오기
var user = require('./routes/user');

// 라우팅
// req = request, res = response
app.get('/', function(req, res) {
  res.send('Hello World');
});

app.use('/user', user);

// server open
app.listen(3000, function() {
  console.log('Example App listening on port 3000');
});
