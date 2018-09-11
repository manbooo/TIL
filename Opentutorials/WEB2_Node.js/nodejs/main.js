var http = require('http')
var fs = require('fs')
var url = require('url')
var qs = require('querystring')

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

_renderList = (fileList) => {
    var list = '<ul>'

    fileList.forEach(file =>
        list = list + `<li><a href="/?id=${file}">${file}</a></li>`
    )

    list = list + '</ul>'

    return list
}

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
                <form action="http://localhost:3000/create_process" method="post">
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
    } else if(pathname === '/create_process') {
        var body = ''

        request.on('data', (data) => {
            body = body + data
        })

        request.on('end' , () => {
            const post = qs.parse(body)

            // console.log(post)

            const title = post.title
            const description = post.description

            fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
                if (err) throw err

                console.log('The file has been saved!')

                response.writeHead(302, {
                    Location: `/?id=${title}`
                })
                response.end('success')
            })
        })
    } else {
        response.writeHead(404)
        response.end('Not Found!')
    }
})

app.listen(3000)
