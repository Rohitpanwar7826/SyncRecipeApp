import { gql } from "@apollo/client";

const CREATE_LIKE =  gql`
  mutation CREATE_LIKE($likeableId: String!, $typeName: String!) {
      like(input: { likeableId: $likeableId, typeName: $typeName})
      {
      success
      error
      response {
        ...on Category {
          id
          name
          isLiked
          totalLikes
        }
      }
    }
  }
`

export {
  CREATE_LIKE
}