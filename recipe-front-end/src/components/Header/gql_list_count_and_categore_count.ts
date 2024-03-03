import { gql } from "@apollo/client"

const GET_LIST_COUNT_AND_CATEGORE_COUNT = gql`
 query GET_LIST_COUNT_AND_CATEGORE_COUNT {
  categoreCount
  listCount
 }
`

export {
  GET_LIST_COUNT_AND_CATEGORE_COUNT
}