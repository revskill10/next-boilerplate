const GoogleStrategy = require('passport-google-oauth2')
    .Strategy;

/*
module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: "348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com",
        clientSecret: "7v3VblnTIU2OMuYq5NDDD4wV",
        callbackURL: '/auth/google/callback'
    }, (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};
*/
module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
      done(null, user);
  });
  passport.use(new GoogleStrategy({
    clientID:     "348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com",
    clientSecret: "7v3VblnTIU2OMuYq5NDDD4wV",
    callbackURL: `/auth/google/callback`,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log('hehe ' + JSON.stringify(profile));
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, {profile, token: accessToken});
    //});
  }
  ));
}
