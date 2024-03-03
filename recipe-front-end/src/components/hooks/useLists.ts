import { useQuery } from "@apollo/client"
import { GET_LIST_CATEGORIES } from "../gql/CategoriesList"

const useLists = (categorieId: string) => {
   const {data, loading, error} = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      id: categorieId
    },
    fetchPolicy: "network-only"
  });

  return {
    data, loading, error
  }
}


export default (useLists)