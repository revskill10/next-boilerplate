const GoogleStrategy = require('passport-google-oauth2').Strategy;
const api = require('./api');
const mkFindUserVariables = require('./variables/findUser');
const mkRegisterUserVariables = require('./variables/registerUser');
const mkQueryObject = require('./mkQueryObject');
const findUserQuery = require('./graphql/findUser');
const registerUserQuery = require('./graphql/registerUser');
const mkGetInfoVariables = require('./variables/getInfo');
const getInfoQuery = require('./graphql/getInfo');
const {mkJwtVariables, mkNullJwtVariables, createJwtToken} = require('./createJwtToken');
function getDomain(req){
  return req.get('host');
}

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
      done(null, user);
  });
  passport.use(new GoogleStrategy({
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
      passReqToCallback   : true
    },
    async function(req, _accessToken, _refreshToken, profile, done) {      
      const domain = getDomain(req);
      console.log(domain);

      const findUser = await api(mkQueryObject(
        findUserQuery,
        mkFindUserVariables(profile)
      ), done);
      if (findUser.data.users.length > 0) {
        const info = await api(mkQueryObject(
          getInfoQuery,
          mkGetInfoVariables(profile, domain)
        ), done);
        if (info.data.me.length > 0) {
          const infoData = info.data.me[0];
          const jwtVariables = mkJwtVariables(infoData);
          const token = createJwtToken(jwtVariables);
          console.log(token);
          return done(null, {token})
        } else {
          const user = findUser.data.users[0];
          const jwtVariables = mkNullJwtVariables(user);
          const token = createJwtToken({jwtVariables});
          console.log(token);
          return done(null, {token});
        }
      } else {
        const registerUser = await api(mkQueryObject(
          registerUserQuery,
          mkRegisterUserVariables(profile)
        ), done);
        const user = registerUser.data.returning[0];
        const jwtVariables = mkNullJwtVariables(user);
        const token = createJwtToken({jwtVariables});
        console.log(token);
        return done(null, {token});
      }
    }
  ));
}
