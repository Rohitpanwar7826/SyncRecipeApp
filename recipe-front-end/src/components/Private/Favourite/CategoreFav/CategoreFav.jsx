import { useQuery } from "@apollo/client"
import { GET_FAV_CATEGORIES } from "./gql_state"
import Loader from "../../../shared/Loader"
import { errorMessageDark } from "../../../ToasterType"
import DisplayCategories from "../../Home/Category/DisplayCategories"
import Heading from "../../../shared/Heading"

const CategoreFav = () => {
  const { data, loading, error } = useQuery(GET_FAV_CATEGORIES, { fetchPolicy: 'network-only' })
  if (loading) return <Loader />
  if (error) {
    errorMessageDark(error.graphQLErrors)
  }
  return (
    <>
      < Heading title="Favorite Categorie's" />
      < DisplayCategories categoriesData={data.favCategories} refetchQuriesComp={[GET_FAV_CATEGORIES]} />
    </>
  )
}

export default CategoreFav