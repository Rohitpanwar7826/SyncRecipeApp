import { useQuery } from "@apollo/client"
import DisplayList from "../../Lists/DisplayList"
import { GET_FAVORITE_LISTS } from "./gqlState"
import Loader from "../../../shared/Loader"
import { errorMessageDark } from "../../../ToasterType"


const ListFav = () => {
  const {data, loading, error} = useQuery(GET_FAVORITE_LISTS, { fetchPolicy: 'network-only' })
  if (loading) return < Loader />
  if (error) {
    errorMessageDark(error.graphQLErrors)
    return <h1> {error.message} </h1>
  }
  return (
    <DisplayList title="Favorite List" lists={data.favLists} refetchQueriesComp={[GET_FAVORITE_LISTS]}/>
  )
}

export default ListFav