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
- http://expressjs.com/ko/guide/routing.html



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



##### 1) 미들웨어

![middleware](C:\Users\JJu_Park\Desktop\TIL\react\inflearn\Section6. Backend\middleware.PNG)

- 미들웨어 함수는 `요청 오브젝트(req)`, `응답 오브젝트(res)` 그리고 애플리케이션의 요청- 응답 주기 중 그 다음의 미들웨어 함수에 대한 액세스 권한을 갖는 함수
- Express 자체에 있지 않은 기능을 미들웨어를 통해 구현
- 이미 다른 사람들이 만든 미들웨어 사용 가능
- 일종의 plug-in과 비슷



##### 2) 미들웨어 직접 만들어보기

###### main.js

```react
var myLogger = function(req, res, next) {
  console.log(req.url);
  next();
}

app.use(myLogger);
```

- `next()` : 작업 후 다음으로 넘기는 콜백 함수
- `app.use(myLogger);` : app에서 myLogger 함수를 사용하도록 함



##### 3) 기존의 미들웨어 사용

##### NPM으로 미들웨어 설치

```bash
npm install --save morgan body-parser
```

- `morgan` : 로깅 미들웨어
- `body-parser` : JSON 형태 데이터 파싱



###### main.js : morgan 미들웨어 설정

- github 페이지 오픈

```bash
npm repo morgan
```

- app에 적용

```react
var morgan = require('morgan');

app.use(morgan('dev'));
```



###### main.js : body-parser 미들웨어 설정

```react
var bodyParser = require('body-parser');

app.use(bodyParser.json());
```



###### routes/user.js : JSON 파싱하기

```react
router.post('/', function(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  res.json({
    success : true,
    user : req.body.username
  });
});
```



###### main.js : static 미들웨어

- 정적파일 제공

```react
app.use('/', express.static('public'));
```



###### public/index.html

```html
<!DOCTYPE>
<html>
<head>
    <title>HI</title>
</head>
<body>
    Hello WOOOOOOOOOOOOOOOOOOOOOOOOOOOOLD!!!!!
</body>
</html>
```



##### 4) nodemon

- 서버 재시작의 번거로움을 줄여준다

```bash
npm install -g nodemon
nodemon main.js
```

