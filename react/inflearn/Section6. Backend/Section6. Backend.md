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

---

### 4. MongoDB

- https://velopert.com/mongodb-tutorial-list

##### 1) MongoDB 소개

- NoSQL
  - Not Only SQL(SQL 뿐만 아니다)
  - 관계형 데이터베이스의 특성 뿐만 아니라 다른 특성들도 제공한다.
- JSON 형태로 데이터를 저장
- Document oriented : 문서 지향적 데이터베이스
  - 문서란 key, value 쌍의 집합
  - JSON 객체가 하나의 문서
- Collection : 여러 개의 Document를 한 그룹에 모은 것
  - Collection에 있는 Document는 똑같은 구조를 가지지 않아도 된다

![MongoDB Structure](https://poiemaweb.com/img/mongodb-structure.png)



##### 2) Data Modelling

###### 블로그 데이터베이스

- 요구 사항
  - 게시글에는 **작성자 이름, 제목, 내용, 작성시간**이 담겨져있다.
  - 각 게시글은 0개 이상의 **태그**를 가지고 있을 수 있다.
  - 게시글엔 **덧글**을 달 수 있다.
  - 덧글은 **작성자 이름, 내용, 작성시간**을 담고있다.
- RDBMS

![RDBMS](https://velopert.com/wp-content/uploads/2016/02/d.png)

- NoSQL DBMS

```json
{
     _id: POST_ID,
     title: POST_TITLE,
     content: POST_CONTENT,
     username: POST_WRITER,
     tags: [ TAG1, TAG2, TAG3 ],
     time: POST_TIME
     comments: [
         { 
             username: COMMENT_WRITER,
             mesage: COMMENT_MESSAGE,
             time: COMMENT_TIME
         },
         { 
             username: COMMENT_WRITER,
             mesage: COMMENT_MESSAGE,
             time: COMMENT_TIME
         }
     ]
}
```



##### 3) MongoDB 설치

- https://www.mongodb.com/download-center?jmp=homepage#atlas
- 설명 : <https://velopert.com/436> 



##### 4) 기본 명령어

- http://slides.com/minjunkim-1/react-codelab-backends#/40

```bash
# 서버 실행
mongod

# 클라이언트로 접속
mongo
```



###### 생성 및 제거

- 데이터 베이스 선택 : `use db_name`

```bash
# 사용 할 데이터베이스 선택
> use mongodb_tutorial
switched to db mongodb_tutorial

# 데이터베이스 목록 보기
> show dbs 
codelab  0.000GB
local    0.000GB
test     0.000GB
# 데이터베이스가 비어있으면 안나옵니다

# document 를 sample 컬렉션에 삽입
> db.sample.insert({"name": "sample"})
WriteResult({ "nInserted" : 1 })   

> show dbs                             
codelab           0.000GB              
local             0.000GB              
mongodb_tutorial  0.000GB              
test              0.000GB
```



- 데이터베이스 제거 : `db.dropDatabase()`
  - 제거하기전에 선택이 되어있어야함

```bash
> use mongodb_tutorial
switched to db mongodb_tutorial

> db.dropDatabase()
{ "dropped" : "mongodb_tutorial", "ok" : 1 }

> show dbs
codelab  0.000GB
local    0.000GB
test     0.000GB
```



- 컬렉션 생성 : `db.createCollection(name, [options])`
  - https://docs.mongodb.com/manual/reference/method/db.createCollection/

```bash
> use mongodb_tutorial
switched to db mongodb_tutorial

> db.createCollection("books")
{ "ok" : 1 }

# 따로 메소드를 사용하지 않아도 document 를 추가하면 자동으로 컬렉션 생성
> db.people.insert({"name": "velopert"}) 
WriteResult({ "nInserted" : 1 })

# 컬렉션 목록 보기
> show collections
books
people
```



- 컬렉션 제거 : `db.collection_name.drop();`

```bash
> db.people.drop()
true

> show collections
books
```



- Document 삽입 : `db.collection_name.insert(document);`

```bash
> db.books.insert({"name": "NodeJS Guide", "author": "Velopert"})
WriteResult({ "nInserted" : 1 })

# 배열 형태로 전달해주면 여러개 삽입 가능
> db.books.insert([                           
    { "name": "Book1", author: "Velopert" },  
    { "name": "Book2", author: "Velopert" }   
    ])                                        
BulkWriteResult({                             
        "writeErrors" : [ ],                  
        "writeConcernErrors" : [ ],           
        "nInserted" : 2,                      
        "nUpserted" : 0,                      
        "nMatched" : 0,                       
        "nModified" : 0,                      
        "nRemoved" : 0,                       
        "upserted" : [ ]                      
})

# 조회
db.books.find()
```



- Document 제거 : `db.collection_name.remove(criteria, [justOne]);`

```bash
> db.books.remove({ "name": "NodeJS Guide" })
WriteResult({ "nRemoved" : 1 })

> db.books.find()
{ "_id" : ObjectId("57d97facb27d7d46a3403f4c"), "name" : "Book2", "author" : "Velopert" }
{ "_id" : ObjectId("57d98054b27d7d46a3403f4d"), "name" : "Book1", "author" : "Velopert" }

# justOne 의 기본값은 false
> db.books.remove({ "author": "Velopert" }, true) 
WriteResult({ "nRemoved" : 1 })

> db.books.find()
{ "_id" : ObjectId("57d98054b27d7d46a3403f4d"), "name" : "Book1", "author" : "Velopert" }
```



###### find()

- Document 조회 : `db.collection_name.find([query], [projection])`
  - https://docs.mongodb.com/manual/reference/operator/query/
- 반환값 : cursor
  - criteria에 해당하는 Document들을 선택하여 cursor를 반환
  - cursor 는 query 요청의 결과값을 가르키는 pointer 
  -  cursor 객체를 통하여 보이는 데이터의 수를 제한 할 수 있고, 데이터를 sort 할 수 도 있다
  - 10분동안 사용되지 않으면 만료 
| parameter  | type     | 설명                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| query      | document | - Optional<br />- 다큐먼트를 조회할 때 기준<br />- 기준이 없이 컬렉션에 있는 모든 다큐먼트를 조회 할때 이 매개변수를 비우거나 비어있는 다큐먼트 { } 를 전달 |
| projection | document | - Optional<br />- 다큐먼트를 조회할 때 보여질 field          |


```bash
# mock data 추가
> db.numbers.insert([
    { value: 1 }, { value: 5 }, { value: 12 },
    { value: 12 }, { value: 6 }, { value: 643 },
    { value: 144 }, { value: 32 }, { value: 56 },
    { value: 23 }, { value: 33 }, { value: 56 }
]);

#  모든 document 조회
> db.numbers.find()

# numbers 는 key 가 하나밖에 없어서 pretty() 해도 똑같습니다
> db.books.find().pretty() // 깔끔한 형식으로 조회

# value 가 56 인 document를 조회
> db.numbers.find({ "value": 56  })

# value 가 100 이상인 document 를 조회
# $gt : 쿼리 연산자
> db.numbers.find({ "value": { $gt: 100 } })
```



###### query 연산자

- 비교(Comparison) 연산자
| operator | 설명                                                   |
| -------- | ------------------------------------------------------ |
| $eq      | (equals) 주어진 값과 일치하는 값                       |
| $gt      | (greater than) 주어진 값보다 큰 값                     |
| $gte     | (greather than or equals) 주어진 값보다 크거나 같은 값 |
| $lt      | (less than) 주어진 값보다 작은 값                      |
| $lte     | (less than or equals) 주어진 값보다 작거나 같은 값     |
| $ne      | (not equal) 주어진 값과 일치하지 않는 값               |
| $in      | 주어진 배열 안에 속하는 값                             |
| $nin     | 주어빈 배열 안에 속하지 않는 값                        |

```bash
# 0~100 사이의 document 조회
> db.numbers.find({"value": { $gt: 0, $lt: 100 } })

# 0~100 사이이고, 12, 33 이 아닌
> db.numbers.find({"value": { $gt: 0, $lt: 100, $nin: [12, 33] } })
```



- 논리 연산자


| operator | 설명                                   |
| -------- | -------------------------------------- |
| $or      | 주어진 조건중 하나라도 true 일 때 true |
| $and     | 주어진 모든 조건이 true 일 때 true     |
| $not     | 주어진 조건이 false 일 때 true         |
| $nor     | 주어진 모든 조건이 false 일때 true     |

```bash
# mock data 추가
> db.articles.insert([
    {
        "title" : "article01",
        "content" : "content01",
        "writer" : "Velopert",
        "likes" : 0,
        "comments" : [ ]
    },
    {
        "title" : "article02",
        "content" : "content02",
        "writer" : "Alpha",
        "likes" : 23,
        "comments" : [
                {
                        "name" : "Bravo",
                        "message" : "Hey Man!"
                }
        ]
    },
    {
        "title" : "article03",
        "content" : "content03",
        "writer" : "Bravo",
        "likes" : 40,
        "comments" : [
                {
                        "name" : "Charlie",
                        "message" : "Hey Man!"
                },
                {
                        "name" : "Delta",
                        "message" : "Hey Man!"
                }
        ]
    }
])

> db.articles.find({ $or: [ { "title": "article01" }, { "writer": "Alpha" } ] })

> db.articles.find( { $and: [ { "writer": "Velopert" }, { "likes": { $lt: 10 } } ] } )

# and 의 경우엔 이렇게도 가능합니다.
> db.articles.find( { "writer": "Velopert", "likes": { $lt: 10 } } )
```



- `$regex` 연산자
  - Document를 정규식을 통해 찾을 수 있다.

| option | 설명                                                        |
| ------ | ----------------------------------------------------------- |
| i      | 대소문자 무시                                               |
| m      | 정규식에서 anchor(^) 를 사용 할 때 값에 \n 이 있다면 무력화 |
| x      | 정규식 안에있는 whitespace를 모두 무시                      |
| s      | dot (.) 사용 할 떄 \n 을 포함해서 매치                      |

```bash
{ <field>: { $regex: /pattern/, $options: '<options>' } }
{ <field>: { $regex: 'pattern', $options: '<options>' } }
{ <field>: { $regex: /pattern/<options> } }
{ <field>: /pattern/<options> }

# 예제
> db.articles.find( { "title" : /article0[1-2]/ } )
> db.articles.find( { "writer": /velopert/i } )
```



- `$where` 연산자
  - javascript expression 을 사용 할 수 있다.

```bash
> db.articles.find( { $where: "this.comments.length == 0" } ).pretty() 
{                                                                      
        "_id" : ObjectId("57d98f44c7746792605a1ea1"),                  
        "title" : "article01",                                         
        "content" : "content01",                                       
        "writer" : "Velopert",                                         
        "likes" : 0,                                                   
        "comments" : [ ]                                               
}                                                                      
```



- $elemMatch 연산자
	- subdocument (embedded document) 배열을 쿼리할때 사용

```bash
# comments 중 “Charlie” 가 작성한 덧글이 있는 Document 조회
> db.articles.find( { "comments": { $elemMatch: { "name": "Charlie" } } } )

> db.users.insert(  {
    "username": "velopert",
    "name": { "first": "M.J.", "last": "K."},
    "language": ["korean", "english", "chinese"]
  })
  
# Embedded Document 배열이 아니라 아래 Document의 “name” 처럼 한개의 Embedded Document 일 때
> db.users.find({ "name.first": "M.J."})

# Document 가 아닌 배열을 쿼리 할 때
> db.users.find({ "language": "korean"})
```



###### projection

- 쿼리의 결과값에서 보여질 field 

```bash
# article의 title과 content 만 조회
> db.articles.find( { } , { "_id": false, "title": true, "content": true } )
{ "title" : "article01", "content" : "content01" }
{ "title" : "article02", "content" : "content02" }
{ "title" : "article03", "content" : "content03" }
```



- `$slice` 연산자
  -  Embedded Document 배열을 읽을때 limit 설정 

```bash
# title 값이 article03 인 Document 에서 덧글은 하나만 보이게 출력
> db.articles.find({"title": "article03"}, {comments: {$slice: 1}}).pretty()
{
        "_id" : ObjectId("56c0ab6c639be5292edab0c6"),
        "title" : "article03",
        "content" : "content03",
        "writer" : "Bravo",
        "likes" : 40,
        "comments" : [
                {
                        "name" : "Charlie",
                        "message" : "Hey Man!"
                }
        ]
}
```



- `$elemMatch` 연산자
  - query 에서 사용 할 때랑 역할이 좀 다르다
  - 배열 중, 특정 subdocument 만 출력

```bash
# Charlie 가 작성한 덧글이 있는 Document 조회 (projection 설정 안함)
> db.articles.find(
    {
        "comments": {
            $elemMatch: { "name": "Charlie" }
        }
    },
    {
        "title": true,
        "comments.name": true,
        "comments.message": true
    }
)
# 결과: Charlie 유저 말고도 다른 유저들의 덧글도 출력합니다

# comments 중 “Charlie” 가 작성한 덧글이 있는 Document 중 제목, 그리고 Charlie의 덧글만 조회
>  db.articles.find(
     {
         "comments": {
             $elemMatch: { "name": "Charlie" }
         }
     },
     {
         "title": true,
         "comments": {
             $elemMatch: { "name": "Charlie" }
         },
         "comments.name": true,
         "comments.message": true
     }
 )
```



###### sort, limit, skip

- `cursor.sort( DOCUMENT )`

  - **데이터를 정렬**
  - 어떤 KEY 를 사용하여 정렬 할 지 알려주는 document 를 전달 
  - 여러 KEY를 입력 할 수 있고 먼저 입력한 KEY가 우선권을 가진다.

| 변수  | 설명                                                         |
| ----- | ------------------------------------------------------------ |
| KEY   | 데이터의 field 이름                                          |
| value | 1 혹은 -1 <br />1 로 설정하면 오름차순<br />1로 하면 내림차순으로 정렬 |

```bash
# 오름차순으로 정렬
> db.numbers.find().sort({"value": 1})
{ "_id" : ObjectId("57d9825bc7746792605a1e92"), "value" : 1 }
# ..... 
{ "_id" : ObjectId("57d9825bc7746792605a1e97"), "value" : 643 }

# 내림차순으로 정렬
> db.numbers.find().sort({"value": -1})
{ "_id" : ObjectId("57d9825bc7746792605a1e97"), "value" : 643 }
# ..... 
{ "_id" : ObjectId("57d9825bc7746792605a1e92"), "value" : 1 }
```



- `cursor.limit( value )`
  - 출력할 **데이터 갯수**를 제한
  - `value` : 출력할 갯수

```bash
> db.numbers.find().limit(3)
{ "_id" : ObjectId("57d9825bc7746792605a1e92"), "value" : 1 }
{ "_id" : ObjectId("57d9825bc7746792605a1e93"), "value" : 5 }
{ "_id" : ObjectId("57d9825bc7746792605a1e94"), "value" : 12 }
```



- `cursor.skip( value )`
  - 출력 할 데이터의 **시작부분을 설정** 
  - `value` 값 갯수의 데이터를 생략하고 그 다음부터 출력 

```bash
# 2개는 생략하고 그 다음부터 출력합니다.
> db.numbers.find().skip(2)
{ "_id" : ObjectId("57d9825bc7746792605a1e94"), "value" : 12 }
{ "_id" : ObjectId("57d9825bc7746792605a1e95"), "value" : 12 }
{ "_id" : ObjectId("57d9825bc7746792605a1e96"), "value" : 6 }
{ "_id" : ObjectId("57d9825bc7746792605a1e97"), "value" : 643 }
{ "_id" : ObjectId("57d9825bc7746792605a1e98"), "value" : 144 }
{ "_id" : ObjectId("57d9825bc7746792605a1e99"), "value" : 32 }
{ "_id" : ObjectId("57d9825bc7746792605a1e9a"), "value" : 56 }
{ "_id" : ObjectId("57d9825bc7746792605a1e9b"), "value" : 23 }
{ "_id" : ObjectId("57d9825bc7746792605a1e9c"), "value" : 33 }
{ "_id" : ObjectId("57d9825bc7746792605a1e9d"), "value" : 56 }
```



- 응용

```bash
# 방금 배운 메소드들을 중첩해서 사용 가능
> db.numbers.find().sort({"value": 1}).skip(2).limit(2);
{ "_id" : ObjectId("57d9825bc7746792605a1e96"), "value" : 6 }
{ "_id" : ObjectId("57d9825bc7746792605a1e94"), "value" : 12 }

# MongoDB 클라이언트는 자바스크립트 기반이라, 이 안에서 함수를 만들 수도 있습니다.
# 페이징 함수
> var showPage = function(page){ return db.numbers.find().sort( { "value": 1 } ).skip((page-1)*2).limit(2) }

> showPage(1)
{ "_id" : ObjectId("57d9825bc7746792605a1e92"), "value" : 1 }
{ "_id" : ObjectId("57d9825bc7746792605a1e93"), "value" : 5 }
> showPage(2)
{ "_id" : ObjectId("57d9825bc7746792605a1e96"), "value" : 6 }
{ "_id" : ObjectId("57d9825bc7746792605a1e94"), "value" : 12 }
> showPage(3)
{ "_id" : ObjectId("57d9825bc7746792605a1e95"), "value" : 12 }
{ "_id" : ObjectId("57d9825bc7746792605a1e9b"), "value" : 23 }
```



###### update

- 메소드 구조

```bash
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```



- Collection 안의 document(들)을 수정 
- 특정 field 를 수정 또는 이미 존재하는 document를 대체(replace) 
- update() 메소드의 기본 옵션으로는 **단 하나**의 document를 수정 

| Parameter    | Type     | 설명                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| *query       | document | 업데이트 할 document의 criteria 를 정한다.<br /> [find() 메소드](https://velopert.com/479) 에서 사용하는 query 와 같다 |
| *update      | document | document에 적용할 변동사항                                   |
| upsert       | boolean  | Optional (기본값: false)<br />이 값이 true 로 설정되면 query한 document가 없을 경우, 새로운 document를 추가합니다. |
| multi        | boolean  | Optional (기본값: false) <br />이 값이 true 로 설정되면, 여러개의 document 를 수정 |
| writeConcern | document | Optional. <br />wtimeout 등 document 업데이트 할 때 필요한 설정값<br />기본 writeConcern을 사용하려면 이 파라미터를 생략<br />자세한 내용은 [매뉴얼](https://docs.mongodb.org/v3.2/reference/write-concern/)을 참조 |



```bash
# sample 데이터
> db.people.insert( [
    { name: "Abet", age: 19 },
    { name: "Betty", age: 20 },
    { name: "Charlie", age: 23, skills: [ "mongodb", "nodejs"] },
    { name: "David", age: 23, score: 20 }
])
```



- 특정 field 업데이트
  - 특정 field의 값을 수정할 땐 `$set` 연산자를 사용 

```bash
# Abet document 의 age를 20으로 변경
> db.people.update( { name: "Abet" }, { $set: { age: 20 } } )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```



- document replace
  - 새로운 document 로 replace 할 때, _id는 바뀌지 않는다

```bash
# Betty document를 새로운 document로 대체
> db.people.update( { name: "Betty" }, { "name": "Betty 2nd", age: 1 })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```



- 특정 field 제거

```bash
# David document의 score field를 제거
> db.people.update( { name: "David" }, { $unset: { score: 1 } } )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
# score: 1 의 1 은 true 의 의미
```



- 존재하지 않는다면 새로 추가 

```bash
# upsert 옵션을 설정하여 Elly document가 존재하지 않으면 새로 추가
> db.people.update( { name: "Elly" }, { name: "Elly", age: 17 }, { upsert: true } )
WriteResult({
        "nMatched" : 0,
        "nUpserted" : 1,
        "nModified" : 0,
        "_id" : ObjectId("56c893ffc694e4e7c8594240")
})
```



- 여러 document의 특정 field를 수정하기

```bash
# age가 20 보다 낮거나 같은 document의 score를 10으로 설정
> db.people.update(
    { age: { $lte: 20 } },
    { $set: { score: 10 } },
    { multi: true }
    )
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 0 })
```



- 배열에 값 추가

```bash
# Charlie document의 skills 배열에 "angularjs" 추가
> db.people.update(
    { name: "Charlie" },
    { $push: { skills: "angularjs" } }
    )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```



- 배열에 값 추가 + 오름차순으로 정렬

```bash
# Charlie document의 skills에 "c++" 와 "java" 를 추가하고 알파벳순으로 정렬
> db.people.update(
    { name: "Charlie" },
    { $push: {
        skills: {
            $each: [ "c++", "java" ],
            $sort: 1
        }
      }
    }
    )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```



- 배열에 값 제거

```bash
# Charlie document에서 skills 값의 mongodb 제거
> db.people.update(
    { name: "Charlie" },
    { $pull: { skills: "mongodb" } }
 )
```



- 배열에서 값 여러개 제거 

```bash
# Charlie document에서 skills 배열 중 "angularjs" 와 "java" 제거
> db.people.update(
    { name: "Charlie" },
    { $pull: { skills: { $in: ["angularjs", "java" ] } } }
)
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

