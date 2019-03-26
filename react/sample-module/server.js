const express = require('express')
const next = require('next')
const compression = require('compression')

const port = parseInt(process.env['PORT'], 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, dir: process.cwd() })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  if (!dev) {
    server.use(compression())
  }

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
