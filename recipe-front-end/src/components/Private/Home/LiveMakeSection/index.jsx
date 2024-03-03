import { isEmpty } from 'lodash';
import useLiveRecipe from './hooks/useLiveRecipe'
import Loader from '../../../shared/Loader';

const LiveMakeSection = () => {
  const recipes = useLiveRecipe();
  return (
    <div className='w-100 row col-md-12 bg-dark mx-0 my-4'>
      {isEmpty(recipes) ? < Loader /> : recipes?.result?.map((recipe) => {
        const { detail, users } = recipe;
        return (
          <div className="card p-2 m-4" style={{ width: "18rem" }} key={recipe.id}>
            <img src={detail.image} className="card-img-top" alt="LIVE-RECIPE" />
            <div className="card-body">
              <h5 className="card-title">{detail.topic}</h5>
              <p className="card-text">{detail.tags ? detail.tags : "No tags"}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{detail.area}</li>
              <li className="list-group-item">{detail.category}</li>
            </ul>
            <div className="card-body text-center  p-1 my-2">
              <span className='bold text-primary text-center' style={{ fontSize: "15px" }}>- LIVE I MAKE'S -</span>
              {
                users.map((user) => <p className='p-1 my-2 bold text-light bg-dark'>{user.name}</p>)
              }
            </div>
          </div>
        )
      })}
      {!isEmpty(recipes) && isEmpty(recipes?.result) ? <h5 className='p-4 text-white text-center'> No Live Makes..</h5> : null}
    </div>
  )
}

export default LiveMakeSection