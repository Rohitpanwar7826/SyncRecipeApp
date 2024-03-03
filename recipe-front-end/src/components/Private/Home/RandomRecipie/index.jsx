import { isEmpty } from "lodash";
import useRandomRecipie from "../../../hooks/useRandomRecipie"
import Loader from "../../../shared/Loader";
import './RandomRecipie.css';

const RandomRecipie = () => {
  const RandomRecipie = useRandomRecipie();
  
  return (
    <div className='mt-4 w-100'>
      <div className="card" data-aos="fade-right">
        {
          !isEmpty(RandomRecipie) ?
            <>
              <img className="card-img rand-recipie-img p-2 mx-auto"  src={RandomRecipie.image} alt="Card image cap" data-aos="zoom-in"/>
              <div className="card-body text-center" data-aos="zoom-in">
                <h5 className="card-title">{RandomRecipie.category}</h5>
                <p className="card-text">{RandomRecipie.topic}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </> : < Loader />
        }
      </div>
    </div>
  )
}

export default RandomRecipie