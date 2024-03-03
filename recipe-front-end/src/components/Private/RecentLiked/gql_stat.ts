import { gql } from "@apollo/client"

const GET_RECENT_LIKE = gql`
  query GET_RECENT_LIKE {
    recentLiked {
      lists {
        likeable {
          ...on List {
          id
          name
          image
          totalLikes
          isLiked
          updatedAt
          }
        }
        user {
          id
          name
          email
        }
      }
      categories {
        likeable {
          ...on Category {
            id
            name
            isLiked
            totalLikes
          }
        }
        user {
          id
          name
          email
        }
      }
    }
  }
`
export {
  GET_RECENT_LIKE
}