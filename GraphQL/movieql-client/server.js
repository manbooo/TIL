const next = require('next')
const Hapi = require('hapi')
const Inert = require('inert')

const { pathWrapper, defaultHandlerWrapper, nextHandlerWrapper } = require('./next-wrapper')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = new Hapi.Server()

app.prepare()
    .then(async () => {
        await server.register(pluginOptions)
        await server.register(Inert)

        server.route({
            method: 'GET',
            path: '/',
            handler: function(request, reply) {
                return pathWrapper(app, '/ko-kr')(request, reply)
            },
        })
    }
)
