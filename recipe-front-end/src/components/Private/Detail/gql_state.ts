import { gql } from "@apollo/client";

const GET_DETAIL = gql`
  query Detail($listId: ID) {
    detail(listId: $listId) {
      success
      listName
      result {
        category
        createdAt
        image
        youtube
        area
        tags
        topic
        instructions
      }
    }
  }
`
export {
  GET_DETAIL
}