module.exports = `
  mutation RegisterUser(
    $email:String!,
    $firstName:String!,
    $lastName:String!,
    $gender:String!,
    $googleId:String!,
    $imageUrl:String,
    $displayName:String!
  ){  
    insert_users(objects:[
      {
        email:$email,
        first_name:$firstName,
        last_name:$lastName,
        gender:$gender,
        googleId:$googleId,
        image_url:$imageUrl,
        displayName:$displayName
      }
    ]){
      returning{
        id
        displayName
      }
    }
}`