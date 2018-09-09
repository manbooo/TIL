## 글 목록 출력하기

##### main.js

```ja
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
            fs.readdir('./data', (err, fileList) => {
                const title = 'Welcome'
                const data = 'Hello Node.js'

                var list = '<ul>'

                fileList.forEach(file =>
                    list = list + `<li><a href="/?id=${file}">${file}</a></li>`
                )

                list = list + '</ul>'

                var template = `
                <!doctype html>
                <html>
                <head>
                  <title>WEB1 - ${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  ${list}
                  <h2>${title}</h2>
                  <p>${data}</p>
                </body>
                </html>
                `
                response.writeHead(200)
                response.end(template)
            })
        } else {
            fs.readdir('./data', (err, fileList) => {
                const title = queryData.id

                var list = '<ul>'

                fileList.forEach(file =>
                    list = list + `<li><a href="/?id=${file}">${file}</a></li>`
                )


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
                      ${list}
                      <h2>${title}</h2>
                      <p>${data}</p>
                    </body>
                    </html>
                    `
                    response.writeHead(200)
                    response.end(template)
                })
            })
        }
    } else {
        response.writeHead(404)
        response.end('Not Found!')
    }



})

app.listen(3000)
```

