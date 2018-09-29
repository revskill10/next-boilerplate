function handleI18n(express, server, i18nextMiddleware, i18n){
  const path = require('path');
  // enable middleware for i18next
  server.use(i18nextMiddleware.handle(i18n))

  // serve locales for client
  server.use('/locales', express.static(path.join(__dirname, '/locales')))

  // missing keys
  server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))
}

module.exports = handleI18n;
