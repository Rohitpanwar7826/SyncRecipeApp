import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { CREATE_LIKE } from "./gql_create_like_stat";
import { errorMessageDark, updatedLoadingMessage, updatedLoadingMessageToError, updatedLoadingMessageToSuccess } from "../../../ToasterType";
import { Id } from "react-toastify";
import { CATEGORY_Name } from "../../../store/LikeTypeName";
import { GET_LIST_COUNT_AND_CATEGORE_COUNT } from "../../../Header/gql_list_count_and_categore_count";

interface categoryPropTypes {
  category: {
    id: string,
    name: string,
    totalLikes: number,
    isLiked: boolean
  },
  refetchQueriesComp: any
}

const Category = ({ category , refetchQueriesComp = []}: categoryPropTypes) => {
  const likeLoadingId = useRef<Id>('');
  const [categoreData, setCategoreData ] = useState(category);
  const [createLike, { loading, error }] = useMutation(CREATE_LIKE,
    {
      refetchQueries: [GET_LIST_COUNT_AND_CATEGORE_COUNT, ...refetchQueriesComp],
      onCompleted(data, clientOptions) {
        updatedLoadingMessageToSuccess(likeLoadingId.current, "Successfuly")
        if (data.like.success) setCategoreData(data.like.response)
        if (!data.like.success) updatedLoadingMessageToError(likeLoadingId.current, data.like.error)
      },
      onError(error, clientOptions) {
        updatedLoadingMessageToError(likeLoadingId.current, error.message)
      }
    }
  )

  if (loading) {
    likeLoadingId.current = updatedLoadingMessage("Loading..")
  }

  if (error) {
    errorMessageDark(error.message)
  }
  
  const handleLike = (catId: string) => {
    createLike({ variables: { likeableId: catId, typeName: CATEGORY_Name } })
  }

  return (
    <div className="col-md-4 mt-3" data-aos="zoom-in">
      <div className="card">
        <div className="card-body">
          <button className='my-1 m-0 p-0 border-0 bg-white text-white' onClick={() => {
            handleLike(categoreData.id)
          }}>
            {
              categoreData.isLiked ? <h5 className=''> <FaHeart color='red' fontSize={30} /> <span className="text-success">{categoreData.totalLikes}</span></h5> :
                <h5 className=''> < FaRegHeart color='red' fontSize={30} /> <span className="text-success">{categoreData.totalLikes}</span></h5>
            }
          </button>
          <h5 className="card-title">{categoreData.name}</h5>
          <Link to={`/lists/${categoreData.id}`} className="btn btn-primary">View Lists</Link>
        </div>
      </div>
    </div>
  )
}

export default Category