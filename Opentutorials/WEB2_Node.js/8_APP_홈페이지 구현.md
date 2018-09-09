## 홈페이지 구현

- `pathname`으로는 홈과 다른 페이지의 구별 불가능



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

    const pathname = url.parse(_url, true).pathname
    console.log(url.parse(_url, true).pathname)



    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readFile(`data/${queryData.id}`, 'utf8', (err, data) => {
                const title = 'Welcome'
                data = 'Hello Node.js'

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
            const title = queryData.id

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
        }
    } else {
        response.writeHead(404)
        response.end('Not Found!')
    }



})

app.listen(3000)
```

