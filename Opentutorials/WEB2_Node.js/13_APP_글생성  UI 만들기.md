## 글생성 UI 만들기

### 글생성 링크 연결 버튼 생성

##### main.js

```js
...

_renderHTML = (title, data, list) => {
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
          
          <a href="/create">Create</a>
          <h2>${title}</h2>
          <p>${data}</p>
        </body>
        </html>
        `

    return (template)
}

...
```



### 폼 생성

##### main.js

```js
...

if (pathname === '/') {
    if (queryData.id === undefined) {
        fs.readdir('./data', (err, fileList) => {
            const title = 'Welcome'
            const data = 'Hello Node.js'
            const list = _renderList(fileList)

            response.writeHead(200)
            response.end(_renderHTML(title, data, list))
        })
    } else {
        fs.readdir('./data', (err, fileList) => {
            const title = queryData.id
            const list = _renderList(fileList)

            fs.readFile(`data/${queryData.id}`, 'utf8', (err, data) => {
                response.writeHead(200)
                response.end(_renderHTML(title, data, list))
            })
        })
    }
} else if (pathname === '/create') {
    fs.readdir('./data', (err, fileList) => {
        const title = 'Web - create'
        const list = _renderList(fileList)
        const data = `
<form action="http://localhost:3000/process_create" method="post">
<p>
<input type="text" name="title" placeholder="title"/>
</p>
<p>
<textarea name="description" placeholder="description"></textarea>
</p>
<p>
<button type="submit">Submit</button>
</p>
</form>
`

        response.writeHead(200)
        response.end(_renderHTML(title, data, list))
    })
}
    else {
        response.writeHead(404)
        response.end('Not Found!')
    }

...    
```

