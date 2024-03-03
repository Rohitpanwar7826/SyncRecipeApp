import { useRef, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useParams } from 'react-router-dom'
import { empty, useMutation } from '@apollo/client';
import { CREATE_LIKE } from './gql_create_like_stat';
import { connect } from 'react-redux';
import { errorMessageDark, updatedLoadingMessage, updatedLoadingMessageToSuccess, updatedLoadingMessageToError } from '../../../ToasterType';
import { GET_LIST_COUNT_AND_CATEGORE_COUNT } from '../../../Header/gql_list_count_and_categore_count';
import { isEmpty } from 'lodash';

const List = ({ list, refetchQueriesComp = [] }) => {
  const likeLoadingId = useRef();

  const [listData, setListData] = useState(list)
  const [createLike, { loading, error }] = useMutation(CREATE_LIKE,
    {
      refetchQueries: [GET_LIST_COUNT_AND_CATEGORE_COUNT],
      onCompleted() {
        updatedLoadingMessageToSuccess(likeLoadingId.current, "Successfully")
      },
      onError(error, clientOptions) {
        updatedLoadingMessageToError(likeLoadingId.current, error.message)
      },
      update(cache, { data }) {
        if (!isEmpty(refetchQueriesComp)) {
          const identity = cache.identify(listData)
          cache.evict({ id: identity });
        } else {
          setListData(data.like.response)
        }
      }
    }
  )

  if (loading) {
    likeLoadingId.current = updatedLoadingMessage("Loading..")
  }

  if (error) {
    errorMessageDark(error.message)
  }

  const handleLike = (listId) => {
    createLike({ variables: { likeableId: listId, typeName: "List" } })
  }
  return (
    <div className="card m-2 rounded-xl bg-dark" key={listData.id}>
      <div className="d-flex justify-content-center">
        <LazyLoadImage
          src={listData.image}
          key={listData.image}
          width={250}
          height={250}
          className='img p-2 rounded-xl'
          placeholderSrc={listData.image}
          effect='blur'
        />
      </div>
      <div className="w-100 col-md-6">
        <div className="card-body">
          <h5 className="card-title text-white">{listData.name}</h5>
          <p className="card-text"><small className="text-muted">{listData.updatedAt}</small></p>
          < div className='d-flex justify-content-center align-items-center'>
            <button className='my-1 m-0 p-0 border-0 bg-dark text-white' onClick={() => {
              handleLike(listData.id)
            }}>
              {
                listData.isLiked ? <h5 className=''> <FaHeart color='red' fontSize={30} /> {listData.totalLikes}</h5> :
                  <h5 className=''> < FaRegHeart color='red' fontSize={30} /> {listData.totalLikes}</h5>
              }
            </button>
          </div>
          <br />
          <div className='d-flex justify-content-center align-items-center'>
            <Link to={`/lists/${listData.id}/detail`} className='bg-success text-dark p-2 bold text-decoration-none'> I Make </Link> <br />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUserId: state.user.id
})


export default connect(mapStateToProps)(List);