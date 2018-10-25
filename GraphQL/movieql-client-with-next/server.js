const next = require('next')
const Hapi = require('hapi')
const Inert = require('inert')

const { pathWrapper, defaultHandlerWrapper, nextHandlerWrapper } = require('./next-wrapper')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = new Hapi.Server({
    port
})

app.prepare()
    .then(async () => {
        await server.register(Inert)

        server.route({
            method: 'GET',
            path: '/detail/{id}',
            handler: function(request, reply) {
                const options = {
                    query: { id: request.params.id },
                }
                Object.assign(request, options)
                return pathWrapper(app, '/detail')(request, reply)
            },
        })

        server.route({
            method: 'GET',
            path: '/_next/{p*}', /* next specific routes */
            handler: nextHandlerWrapper(app)
        })

        server.route({
            method: 'GET',
            path: '/{p*}', /* catch all route */
            handler: defaultHandlerWrapper(app)
        })

        try {
            await server.start()
            console.log(`> Ready on http://localhost:${port}`)
        } catch (error) {
            console.log('Error starting server')
            console.log(error)
        }
    })
