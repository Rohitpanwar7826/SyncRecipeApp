import { gql } from "@apollo/client";

const GET_FAVORITE_LISTS = gql`
  query FavLists {
    favLists {
      id
      name
      image
      totalLikes
      isLiked
      updatedAt
    }
  }
`
export {
  GET_FAVORITE_LISTS
}