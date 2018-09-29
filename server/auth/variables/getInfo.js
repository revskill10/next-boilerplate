function getInfoVariables(profile, domain){
  const email = profile.email;

  const variables = {
    email,
    domain,
  }

  return variables;
}
  
module.exports = getInfoVariables;