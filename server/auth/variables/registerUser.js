function registerUserVariables(profile){
  const parseFullName = require('parse-full-name').parseFullName;

  const name = parseFullName(profile.name.givenName);
  const displayName = profile.name.givenName;
  const firstName = name.first;
  const lastName = name.last;
  const gender = profile.gender;
  const imageUrl = profile.photos[0].value;
  const email = profile.email;
  const googleId = profile.id;

  const variables = {
    googleId,
    email,
    displayName,
    firstName,
    lastName,
    gender,
    imageUrl,
  }

  return variables;
}

module.exports = registerUserVariables;