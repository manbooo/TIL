const fs = require('fs')

fs.readFile('./nodejs/sample.txt', 'utf8', (err, data) => {
    if (err) throw err

    console.log(data)
})