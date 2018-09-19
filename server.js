const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()    

const allowedOrigins = ['http://localhost:3000']


app.prepare()
.then(() => {
  const server = express(),
        passport = require('passport'),
        auth = require('./auth'),
        cookieParser = require('cookie-parser'),
        cookieSession = require('cookie-session'),
        cors = require('cors');

  auth(passport);
  server.use(passport.initialize());
  server.use(cors());
  /*
  https://www.googleapis.com/oauth2/v1/userinfo?alt=json
  var client_id = '348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com';
  var secret_id = '7v3VblnTIU2OMuYq5NDDD4wV';
  var allowedOrigins = ['http://localhost:3000',
                        'http://yourapp.com'];
  app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
  app.use(cors({
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  }));
  app.use(cors({
    credentials: true,
  }));
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://example.com/', true);
  xhr.withCredentials = true;
  xhr.send(null);
  */

 server.use(cookieSession({
      name: 'session',
      keys: ['SECRECT KEY'],
      maxAge: 24 * 60 * 60 * 1000
  }));
  server.use(cookieParser());

  server.get('/', async (req, res) => {
    if (req.session.token) {
      res.cookie('token', req.session.token);
    } else {
      res.cookie('token', '')
    }
    const actualPage = '/index'
    //const queryParams = { title: req.params.id }
    app.render(req, res, actualPage)
  });

  server.get('/logout', (req, res) => {
      req.logout();
      req.session = null;
      res.cookie('token', '')
      res.redirect('/');
  });

  server.get('/auth/google', passport.authenticate('google', {
      scope: [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ]
  }));

  server.get('/auth/google/callback',
      passport.authenticate('google', {
          failureRedirect: '/'
      }),
      (req, res) => {
          //console.log(req.user.profile);
          req.session.token = req.user.token;
          res.cookie('token', req.session.token);
          res.redirect('/');
      }
  );

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3001, () => {
      console.log('Server is running on port 3000');
  });
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
});

