const Hapi = require('hapi')
const Inert = require('inert')
const Path = require('path')

const server = new Hapi.Server({ port })

server.register(Inert, (err) => {
    if (err) {
        throw err
    }

    server.connection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8080
    })

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'build'),
                listing: false,
                index: true
            }
        }
    })

    server.start(err => {
        if (err) {
            throw err
        }

        console.log(`Server running at ${server.info.uri}`)
    })
})
