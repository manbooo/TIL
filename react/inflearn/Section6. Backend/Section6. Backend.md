# Section6. Backend

### 1. 소개

##### 1) Web Server

- 단순히 파일들을 제공하는 웹서버가 아닐 **serverside script언어 사용을 지원**하는 웹서버



##### 2) Database

- 관계형
- 비관계형



##### 3) 어떤걸 사용할까?

- 편한거, 잘하는것으로
- Node.js와 MongoDB

---

### 2. Node.js / Express.js 맛보기 | 라우팅, 모듈화 

- http://slides.com/minjunkim-1/react-codelab-backends#/7

##### 1) Node.js 

- 브라우저가 아닌 환경에서도 js가 돌아갈 수 있게 하는 js 런타임
- web server가 아니다.
  - http 서버를 직접 구현해야 함



##### 2) Express 

- 웹서버에서 필요한 대부분의 기능이 구현된 웹 프레임워크



###### express 설치

```bash
npm install -g npm
mkdir express-tutorial
cd express-tutorial
npm init
npm install --save express
```



###### main.js : Express 서버 만들기

```js
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, function() {
  console.log('Example App listening on port 3000');
});
```

- `var express = require('express')` : express 모듈 불러오기
- `var app = express()` : express app 생성
- `app.get('/', function(req, res) {})`
  - req = request, res = response
- `app.listen(3000, function() {})` : server open



###### express 실행

```bash
node main.js
```

- localhost:3000



###### 기본 라우팅

- `app.METHOD(PATH, HANDLER)`
  - METHOD : HTTP 요청 메소드 (get, post, delete, put ...)
  - PATH : 라우트 경로
  - HANDLER : 실행 될 콜백 함수



###### main.js : 더 많은 라우팅

```js
/* ... */

app.get('/user/:id', function(req, res) {
    res.send('Received a GET request, param:' + req.params.id);
});

app.post('/user', function(req, res) {
    res.json({ success: true })
});

app.put('/user', function(req, res) {
    res.status(400).json({ message: 'Hey, you. Bad Request!' });
});

app.delete('/user', function(req, res) {
    res.send('Received a DELETE request');
});

/* ... */
// server open
```

- `res.json({ success: true })` : json 형태의 응답
- `res.status(400).json({ message: 'Hey, you. Bad Request!' });` : HTTP status 설정



###### API 테스팅 도구

- [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)



###### routes/user.js : user 라우트 모듈화해서 내보내기

```js
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
    res.send('Received a GET request, param:' + req.params.id);
});

router.post('/', function(req, res) {
    res.json({ success: true });
});

router.put('/', function(req, res) {
    res.status(400).json({ message: 'Hey, you. Bad Request!' });
});

router.delete('/', function(req, res) {
    res.send('Received a DELETE request');
});
 
module.exports = router;
```



###### main.js : 불러와서 사용하기

```js
var user = require('./routes/user');

/* ... */

app.use('/user', user);
```

---

### 3. Express | 미들웨어(middleware)

- http://slides.com/minjunkim-1/react-codelab-backends#/17

