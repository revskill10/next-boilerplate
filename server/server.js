require('dotenv').config()
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  require('./auth/app')(app, server);
  server.get('*', (req, res) => {
    return handle(req, res)
  });
  server.listen(process.env.PORT || 80, () => {
    console.log('Server is running on port 80');
  });
})
.catch((ex) => {
  console.error(ex.stack)
  //process.exit(1)
});

