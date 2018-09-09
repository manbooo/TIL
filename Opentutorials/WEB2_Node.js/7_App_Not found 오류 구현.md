## Not found 오류 구현

##### main.js

```
var http = require('http')
var fs = require('fs')
var url = require('url')
var app = http.createServer(function(request,response){
    var _url = request.url
    console.log(_url)

    var queryData = url.parse(_url, true).query

    console.log(queryData.id)

    var title = queryData.id

    console.log(url.parse(_url, true))

...
```

- `console.log(url.parse(_url, true))`
  - 주어진 URL의 정보
  - `path` : query string이 포함
  - `pathname` : query string을 제외한 경로



```js
var http = require('http')
var fs = require('fs')
var url = require('url')

var app = http.createServer(function(request,response){
    var _url = request.url
    console.log(_url)

    var queryData = url.parse(_url, true).query

    console.log(queryData.id)

    var title = queryData.id

    console.log(url.parse(_url, true).pathname)

    const pathname = url.parse(_url, true).pathname

    if (pathname === '/') {
        fs.readFile(`data/${queryData.id}`, 'utf8', (err, data) => {
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ol>
              <h2>${title}</h2>
              <p>${data}</p>
            </body>
            </html>
            `
            response.writeHead(200)
            response.end(template)
        })
    } else {
        response.writeHead(404)
        response.end('Not Found!')
    }



})

app.listen(3000)
```

