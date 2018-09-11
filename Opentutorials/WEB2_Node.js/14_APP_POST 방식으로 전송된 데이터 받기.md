## POST 방식으로 전송된 데이터 받기

### 폼데이터 처리

- https://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js

```js
var qs = require('querystring')

...

else if(pathname === '/create_process') {
    var body = ''

    request.on('data', (data) => {
        body = body + data
    })

    request.on('end' , () => {
        const post = qs.parse(body)

        // console.log(post)

        const title = post.title
        const data = post.description
        })

    response.writeHead(200)
    response.end('success')
}

...
```

- `request` : createServer에 전달된 callback함수에서 전달
  - 요청할 때 웹 브라우저가 보낼 정보들
- `request.on('data', (data) => { ... })`
  - 웹 브라우저가 post방식으로 전송할 때 데이터가 엄청나게 많으면 그 데이터를 한번에 처리하기 힘들다.
  - nodejs에서 post 방식으로 전송되는 데이터가 많을 경우를 대비하여 사용
  - 조각조각난 데이터를 서버에서 수신할 때 마다 서버에서 callback함수를 호출
  - callback 함수의 인자로 수신한 데이터를 넘겨준다
- `request.on('end', () => { ... })`
  - 더 이상 수신할 데이터가 없으면 callback 함수 호출

