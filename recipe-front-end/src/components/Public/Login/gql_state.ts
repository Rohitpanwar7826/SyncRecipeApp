import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  query 
    Login($email: String!, $password: String!){
      login(email: $email, password: $password){
        validateUser
        user{
          id
          name
          token
          email
        }
      }
  }
`

export {
  LOGIN_USER
}