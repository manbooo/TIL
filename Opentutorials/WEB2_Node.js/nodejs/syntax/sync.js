const fs = require('fs')

// readFile Synchronous
console.log('A')

const data = fs.readFileSync('./syntax/sample.txt', 'utf8')
console.log(data)

console.log('C')

console.log('-----')

// readFile Asynchronous
console.log('A')

fs.readFile('./syntax/sample.txt', 'utf8', (err, data) => {
    console.log(data)
})

console.log('C')