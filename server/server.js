require('dotenv').config()
const express = require('express');
const dev = process.env.NODE_ENV !== 'production'
const app = require('next')({ dev })

function runApp(){
  const i18nextMiddleware = require('i18next-express-middleware')
  const Backend = require('i18next-node-fs-backend')
  const i18n = require('../shared/i18n')
  const path = require('path')

  i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'vi'], // preload all langages
    ns: ['common'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, async () => {
    try {
      await app.prepare();
      const server = express();
      require('./i18n/app')(express, server, i18nextMiddleware, i18n);
      require('./auth/app')(app, server);
      require('./default')(app, server);
    } catch(err) {
      console.error(err.stack)
    }
  })
}

runApp();
