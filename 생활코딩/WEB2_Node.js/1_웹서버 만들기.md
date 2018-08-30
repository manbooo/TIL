## 웹서버 만들기

- Node.js를 웹서버로 구동하는 방법



### 실습 준비

- [web1_html_internet](https://github.com/web-n/web1_html_internet) 다운로드

  - 실습 디렉토리에 복사 붙여넣기

- main.js 생성

  ```js
  var http = require('http');
  var fs = require('fs');
  var app = http.createServer(function(request,response){
      var url = request.url;
      if(request.url == '/'){
        url = '/index.html';
      }
      if(request.url == '/favicon.ico'){
        return response.writeHead(404);
      }
      response.writeHead(200);
      response.end(fs.readFileSync(__dirname + url));
   
  });
  app.listen(3000);
  ```

- 웹서버 실행

  ```bash
  node main.js
  ```

  - http://localhost:3000/

- 웹서버 중지

  ```bash
  ctrl + c
  ```

  - 새로고침 후 접속하면 화면이 뜨지 않는다.
  - Node는 웹서버로서 동작



### 실습

#### main.js

```js
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    
    console.log(__dirname + url);
    
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);
```

- `console.log(__dirname + url);`

  - cmd 창에 결과 출력
  - 현재 main.js가 위치한 directory와 사용자가 요청한 사이트
- `response.end(fs.readFileSync(__dirname + url));`
  - 사용자가 요청(접근)할 때마다 JavaScript를 통해서 읽어들여할 파일을 만든다.
  - 그리고 그 파일을 읽어서 나타낸다.



##### main.js

```js
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    
    console.log(__dirname + url);
    
    response.end('jjuya : ' + url);
 
});
app.listen(3000);
```

- `response.end('jjuya : ' + url);`을 통해서 사용자에게 전송하는 데이터가 변경
  - 사용자에게 전송할 데이터를 생성한다.