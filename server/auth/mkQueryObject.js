
function mkQueryObject(query, variables){
  const headers = {
    'X-Hasura-Access-Key': process.env.HASURA_SECRET,
  }
  const endpoint = process.env.USER_API;

  return {
    query,
    endpoint,
    variables,
    headers,
  }
}

module.exports = mkQueryObject;