const jwt = require('jsonwebtoken');

const namespace = "https://hasura.io/jwt/claims"
const allowedRoles = "x-hasura-allowed-roles"
const defaultRoleKey = "x-hasura-default-role"
const userId = 'x-hasura-user-id'
const orgId = 'x-hasura-org-id'
const defaultRole = 'user'
const nameKey = 'name'

function mkJwtVariables(infoData){
  console.log(JSON.stringify(infoData));
  const jwtVariables = {
    roles: infoData.roles, 
    org_id: infoData.organization_information.id, 
    user_id: infoData.user_id, 
    user_name: infoData.user_info.displayName,
  }
  return jwtVariables
}

function mkNullJwtVariables(user){
  console.log(user);
  const jwtVariables = {
    roles: ["User"],
    org_id: "",
    user_id: user.id,
    user_name: user.displayName,
  }
  return jwtVariables;
}

function createJwtToken({roles, org_id, user_id, user_name}){  
  const data = {
    'name': user_name,
    [namespace]: {
      "x-hasura-allowed-roles": roles,
      "x-hasura-default-role": defaultRole,
      'x-hasura-user-id': user_id,
      'x-hasura-org-id': org_id,
    }
  }
  return jwt.sign({data}, process.env.JWT_SECRET);
}

module.exports = {
  mkJwtVariables,
  mkNullJwtVariables,
  createJwtToken,
}
