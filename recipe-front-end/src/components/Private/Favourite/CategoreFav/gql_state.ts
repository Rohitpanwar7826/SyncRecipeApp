import { gql } from "@apollo/client";

const GET_FAV_CATEGORIES = gql`
  query FavCategories {
    favCategories {
      id
      name
      isLiked
      totalLikes
    }
  }
`

export {
  GET_FAV_CATEGORIES
}