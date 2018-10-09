module.exports = `
query UserInfo($email:String!,$domain:String!){
  me:user_info(where:{
    email:{_eq:$email},
    domain:{_eq:$domain}
  }){
    user_id
    role_names
    organization_id
    user{
      displayName
      email
      gender
      first_name
      last_name
      image_url
    }
    organization{
      organization_name
    }
    module_roles{
      module_id
      role_names
    }
  }
}`
