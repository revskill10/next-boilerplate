const passport = require('passport'),
      auth = require('./auth'),
      cookieParser = require('cookie-parser'),
      cookieSession = require('cookie-session')

function makeAuth(app, server){
  auth(passport);
  server.use(passport.initialize());

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
      const token = req.user.token;
      req.session.token = token;
      res.cookie('token', token);
      res.redirect('/');
    }
  );  
}

module.exports = makeAuth;
