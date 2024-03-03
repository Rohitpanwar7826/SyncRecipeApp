import { useQuery } from "@apollo/client"
import { GET_RECENT_LIKE } from "./gql_stat"
import Loader from "../../shared/Loader"
import DisplayList from "./DisplayLIst"
import DisplayCategories from "./DisplayCategory"
import { errorMessageDark } from "../../ToasterType"

const RecentLiked = () => {
  const { data, loading, error } = useQuery(GET_RECENT_LIKE, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: "no-cache"
  })
  if (loading) return < Loader />
  if (error) {
    errorMessageDark(error.graphQLErrors)
    return <h1>{error.graphQLErrors}</h1>
  }
  const { categories, lists } = data.recentLiked;
  return (
    <>
      < DisplayCategories title="Recent Category Liked" categoriesData={categories} />
      < DisplayList title="Recent List Liked" lists={lists} />
    </>
  )
}

export default RecentLiked