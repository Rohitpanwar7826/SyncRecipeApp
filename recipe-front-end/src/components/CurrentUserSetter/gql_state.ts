import { gql } from "@apollo/client"

const GET_CURRENT_USER = gql`
  query CurrentUser($token: String!){
    currentUser(token:  $token){
      validateUser
      user { 
        id
        name
        email
        token
      },
    }
  }
`

export {
  GET_CURRENT_USER
}