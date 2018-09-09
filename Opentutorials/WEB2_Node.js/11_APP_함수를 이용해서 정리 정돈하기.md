## 함수를 이용해서 정리 정돈하기

##### main.js

- _renderTemplate

  ```js
  ...
  
  _renderTemplate = (title, data, list) => {
      const template = `
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
  
      return (template)
  }
  
  ...
  ```

- _renderLiat

  ```js
  ...
  
  _renderList = (fileList) => {
      var list = '<ul>'
  
      fileList.forEach(file =>
          list = list + `<li><a href="/?id=${file}">${file}</a></li>`
      )
  
      list = list + '</ul>'
  
      return list
  }
  
  ...
  ```



- 함수 호출

  ```js
  ...
  
  var app = http.createServer(function(request,response){
      var _url = request.url
      // console.log(_url)
  
      var queryData = url.parse(_url, true).query
      // console.log(queryData.id)
  
      const pathname = url.parse(_url, true).pathname
      // console.log(url.parse(_url, true).pathname)
  
  
      if (pathname === '/') {
          if (queryData.id === undefined) {
              fs.readdir('./data', (err, fileList) => {
                  const title = 'Welcome'
                  const data = 'Hello Node.js'
                  const list = _renderList(fileList)
  
                  response.writeHead(200)
                  response.end(_renderTemplate(title, data, list))
              })
          } else {
              fs.readdir('./data', (err, fileList) => {
                  const title = queryData.id
                  const list = _renderList(fileList)
  
                  fs.readFile(`data/${queryData.id}`, 'utf8', (err, data) => {
                      response.writeHead(200)
                      response.end(_renderTemplate(title, data, list))
                  })
              })
          }
      } else {
          response.writeHead(404)
          response.end('Not Found!')
      }
  })
  
  ...
  ```