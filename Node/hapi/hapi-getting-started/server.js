'use strict'

const Hapi = require('hapi')
const inert = require('inert')

const server = new Hapi.Server({ port: 3000, host: 'localhost'})

server.connection

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello World'
    }
})

server.route({
    method: 'GET',
    path: '/{name}',
    handler: {
        file: './public/hello.html'
    }
})

// server.route({
//     method: 'GET',
//     path: '/hello',
//     handler: {
//         file: './public/hello.html'
//     }
// })

server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Server running at: ${server.info.uri}`)
})
