import { isEmpty } from "lodash"
import Heading from "../../shared/Heading"
import List from "../Lists/List"

function DisplayList({ title, lists }) {
  return (
    <div className='w-100'>
      <Heading title={title} />
      <div className='d-flex flex-row flex-wrap justify-content-center' data-aos="fade-right">
        {lists.map(list => (
          < List list={list.likeable} key={list.likeable.id+list.user.id} />
        ))}
      </div>
      <h1 className='text-center'> {isEmpty(lists) ? "No records.." : null} </h1>
    </div>
  )
}

export default DisplayList