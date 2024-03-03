import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_DETAIL } from './gql_state';
import Loader from '../../shared/Loader';
import { errorMessageDark } from '../../ToasterType';
import { isEmpty } from 'lodash';

const Detail = () => {
  const { list_id: listId } = useParams();
  const {data, loading, error} = useQuery(GET_DETAIL, {
    variables: {
      listId
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'no-cache',
  })

  if(loading) < Loader />

  if(error){
    errorMessageDark(error.message)
    return  <h1>{error.message}</h1>
  }
  
  if(data && !data.detail.success) {
    errorMessageDark(`Recipe Detail not found for this id: ${listId}`)
    return <h1> Recipe Detail not found for this id: {listId} </h1>
  }
  if(!data) return < Loader />

  const detail = data?.detail?.result;

  return (

    <div className="card m-2 rounded-xl bg-dark" data-aos="fade-left">
      <div className='d-flex justify-content-center align-items-center'>
        <img src={detail.image} className="card-img-top w-25 shadow-lg my-4 bg-white rounded" alt="..."  data-aos="fade-left"/>
      </div>
        <div className="card-body" data-aos="fade-right">
          <h5 className="card-title text-center bold bg-success p-2">{detail.topic}</h5>
          <p className="card-text text-white bold p-2">{detail.instructions}.</p>
          <p className="card-text text-white p-2">
          <small className="text-muted p-2 mx-3">{detail.area}</small> 
          | 
          <small className='p-2 mx-3 text-muted'>{detail.category}</small> 
          | 
          <small className='p-2 mx-3 text-muted'>{isEmpty(detail.tags) ? "No Tags" : detail.tags}</small></p>
        </div>
    </div>
  )
}

export default Detail