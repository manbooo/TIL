## 파일을 이용해 본문 구현

##### data

본문 내용을 가지고 파일 생성

- HTML
- CSS
- JavaScript



##### main.js

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

    if(_url == '/'){
        title = 'Welcome'
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404)
        response.end()
        return
    }
    response.writeHead(200)

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

        response.end(template)
    })

})

app.listen(3000)
```

