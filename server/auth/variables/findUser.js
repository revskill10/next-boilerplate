function findUserVariables(profile){
  const email = profile.email;

  const variables = {
    email,
  }

  return variables;
}
  
module.exports = findUserVariables;