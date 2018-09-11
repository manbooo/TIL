## Ω파일 생성과 리다이렉션

### 파일 생성

- https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback



##### main.js

```js
...

request.on('end' , () => {
    const post = qs.parse(body)

    // console.log(post)

    const title = post.title
    const description = post.description

    fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
        if (err) throw err

        console.log('The file has been saved!')

        response.writeHead(200)
        response.end('success')
    })
})

...
```



### 리다이렉션

- https://stackoverflow.com/questions/4062260/nodejs-redirect-url

```js
...
ß
response.writeHead(302, {
    Location: `/?id=${title}`
})
response.end('success')

...
```

