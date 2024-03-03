
import { isEmpty } from "lodash";
import Category from "../Category";

function DisplayCategories({categoriesData, refetchQuriesComp=[]}) {
  return (
    <div className="my-4">
      <div className="row">
        {
          categoriesData?.map((category) => (
            < Category category={category} key={category.id} refetchQueriesComp={refetchQuriesComp} />
          ))
        }
      </div>
      { isEmpty(categoriesData) ? <h1> No Categories present </h1> : null  }
    </div>
  )
}

export default DisplayCategories