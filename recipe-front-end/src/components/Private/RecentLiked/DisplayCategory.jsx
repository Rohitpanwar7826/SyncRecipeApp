import { isEmpty } from "lodash";
import Category from "../Home/Category";
import Heading from "../../shared/Heading";


function DisplayCategories({ categoriesData, title }) {
  return (
    <>
      <Heading title={title} />
      <div className="my-4">
        <div className="row">
          {
            categoriesData?.map((category) => (
              < Category category={category.likeable} key={category.likeable.id + category.user.id} />
            ))
          }
        </div>
        {isEmpty(categoriesData) ? <h1> No Categories present </h1> : null}
      </div>
    </>
  )
}

export default DisplayCategories