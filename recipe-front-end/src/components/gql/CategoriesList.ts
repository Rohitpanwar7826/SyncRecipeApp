import { gql } from "@apollo/client";

const GET_LIST_CATEGORIES = gql`
query CategorieLists($id: ID!){
  lists(id: $id) {
    success
    totalRecords
    categorieName
    result{
      id
      name
      image
      totalLikes
      isLiked
      updatedAt
    }
  }
}

`
export {
  GET_LIST_CATEGORIES
}