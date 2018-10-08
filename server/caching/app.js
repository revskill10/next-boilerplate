const { renderAndCache } = require('./renderAndCache')

function cacheApp(app, server) {
  server.get('/', (req, res) => {
    renderAndCache(app, req, res, '/')
  })

  server.get('/dashboard', (req, res) => {
    renderAndCache(app, req, res, '/dashboard')
  })

  server.get('/pricing', (req, res) => {
    renderAndCache(app, req, res, '/pricing')
  })

  server.get('/contact', (req, res) => {
    renderAndCache(app, req, res, '/contact')
  })
}

module.exports = cacheApp