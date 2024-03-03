import { isEmpty } from "lodash"
import Heading from "../../shared/Heading"
import List from "./List"

function DisplayList({ title, lists, refetchQueriesComp=[] }) {
  return (
    <div className='w-100'>
      <Heading title={title} />
      <div className='d-flex flex-row flex-wrap justify-content-center' data-aos="fade-right">
        {lists.map(list => (
          < List list={list} key={list.id} refetchQueriesComp={refetchQueriesComp} />
        ))}
      </div>
      <h1 className='text-center'> {isEmpty(lists) ? "No records.." : null} </h1>
    </div>
  )
}

export default DisplayList