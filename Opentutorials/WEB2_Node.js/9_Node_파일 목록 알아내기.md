## 파일 목록 알아내기

- https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
- https://code-maven.com/list-content-of-directory-with-nodejs



##### nodejs/readdir.js

```js
const dir = './data'
const fs = require('fs')

fs.readdir(dir, (err, datas) => {
    console.log(datas)

    datas.forEach(data => console.log(data))
})
```

