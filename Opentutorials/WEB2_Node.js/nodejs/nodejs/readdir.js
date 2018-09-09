const dir = './data'
const fs = require('fs')

fs.readdir(dir, (err, datas) => {
    console.log(datas)

    datas.forEach(data => console.log(data))
})