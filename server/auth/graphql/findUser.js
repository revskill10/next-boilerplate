module.exports = `
query FindUser($email:String!){
  users(where:{
    email:{_eq:$email}
  }){
    id
    displayName
  }
}
`
