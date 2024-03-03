import { gql } from "@apollo/client";

const CREATE_LIKE =  gql`
  mutation CREATE_LIKE($likeableId: String!, $typeName: String!) {
      like(input: { likeableId: $likeableId, typeName: $typeName})
      {
      success
      error
      response {
        ...on List {
          id,
          image,
          name,
          totalLikes,
          isLiked,
          updatedAt
        }
      }
    }
  }
`

export {
  CREATE_LIKE
}