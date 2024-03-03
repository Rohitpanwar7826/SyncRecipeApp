import { useParams } from 'react-router-dom'
import useLists from '../../hooks/useLists';
import { errorMessageDark } from '../../ToasterType';
import Loader from '../../shared/Loader';
import DisplayList from './DisplayList';

const Lists = () => {
  const { category_id: categoryId } = useParams();
  const { data: categoryLists, loading, error } = useLists(categoryId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    errorMessageDark(error.message)
    return <div classNameName='error'>Error: {error.message}</div>;
  }
  return (
    <>
      < DisplayList title={categoryLists.lists.success ? categoryLists.lists.categorieName : "No Categories Found"} lists={categoryLists.lists.result} />
    </>
  );
}

export default Lists;
