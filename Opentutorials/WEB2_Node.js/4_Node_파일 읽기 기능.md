## 파일 읽기

- https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfile_file_options_callback



##### nodejs/fileread.js

```js
const fs = require('fs')

fs.readFile('./nodejs/sample.txt', 'utf-8', (err, data) => {
    if (err) throw err

    console.log(data)
})
```

