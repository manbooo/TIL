## URL로 입력된 값 사용하기

### URL의 이해

```url
http://opentutorials.org:3000/main?id=HTML&page=12
```

- `http` : protocol(통신 규약)
  - 사용자가 서버에 접속할 때 어떤 방식으로 통신할 것인가
- `opentutorials.org` : host(domain)
  - 인터넷에 접속되어 있는 각각 컴퓨터
  - 특정한 인터넷에 연결되어 있는 컴퓨터를 가르키는 주소
- `3000` : port
  - 한 개의 컴퓨터 안에 여러 대의 서버가 존재 할 수 있다. 클라이언트가 접속했을 때 그 중에 어떤 서버와 통신할 지
  - 3000번 포트에 연결된 서버와 통신
  - 웹 서버는 80번 포트를 사용(포트 번호를 생략하면 80번 포트로 자동 연결)
- ` main` : path
  - 그 컴퓨터 안의 어떤 디렉토리의 어떤 파일인지
- `id=HTML&page=12` : query string
  - 퀴리 스트링의 값을 변경하면 웹서버에 데이터를 전달 가능
  - `?`로 시작
  - 값과 값은 `&`로 연결
  - `[VALUE_NAME]=value`



### Node.js에서 URL을 통해서 입력된 값을 사용하는 방법

```
http://localhost/?id=HTML
```

- id 값에 따라 사용자에게 적당한 컨텐츠를 보여준다.
- Query string에 따라 다른 정보를 보여준다.



##### main.js

```js
var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(url)
    
    var queryData = url.parse(_url, true).query
    console.log(queryData.id)
    
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(queryData.id);
 
});
app.listen(3000);
```

- `require(MODULE_NAME)`
  - 모듈을 불러오는 것
- `console.log(url)`
  - http://localhost:3000/?id=HTML 를 입력했을 시 `/?id=HTML`가 출력
  - `url`의 값이 `/?id=HTML` 
- `url` 데이터를 분석하여 원하는 값을 추출
  - https://nodejs.org/docs/latest/api/url.html
  - https://stackoverflow.com/questions/8590042/parsing-query-string-in-node-js
  - https://stackoverflow.com/questions/8590042/parsing-query-string-in-node-js

- `var queryData = url.parse(_url, true).query`
  - `queryData` 안에는 객체가 들어 있다.
  - 그 안에서 필요한 키 값을 추출