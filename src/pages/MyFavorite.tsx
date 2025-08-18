import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import SingleProduct from '../components/SingleProduct';
function myFavorite() {
  const { fav } = useSelector((state: RootState) => state.fav);
  if (!fav.length) return <h1 className='text-center'>No Items Here</h1>;
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {fav.length &&
        fav?.map((el) => <SingleProduct key={el._id} product={el} />)}
    </div>
  );
}

export default myFavorite;
