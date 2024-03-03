import { gql } from "@apollo/client"

const GET_CATEGORIS = gql`
  query
    Categories{
      categories{
        id
        name
        isLiked
        totalLikes
      }
    }
`

export {
  GET_CATEGORIS
}