import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
const baseUrl = import.meta.env.VITE_BASE_URL;
import type { PRODUCT } from '../types/productsType';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import {
  saveFav,
  sendFav,
  type FAVINITIALSTATE,
} from '../redux/features/favoriteSlice';
import toast from 'react-hot-toast';

function SingleProduct({ product }: { product: PRODUCT }) {
  const { cart, fav, main } = useSelector((store: RootState) => store);
  const dispatch = useDispatch<AppDispatch>();
  const favHandle = ({
    _id,
    image,
    name,
    price,
  }: FAVINITIALSTATE['fav'][number]) => {
    const exists = (list: FAVINITIALSTATE['fav']) =>
      list.some((el) => el._id === product._id);
    //GEST
    if (!main.user.isLoggedIn) {
      const guestFav: FAVINITIALSTATE['fav'] = JSON.parse(
        localStorage.getItem('myFav') || '[]'
      );
      if (exists(guestFav)) {
        dispatch(saveFav([...fav.fav.filter((el) => el._id !== product._id)]));
        return toast.error('Product Removed From Favorites');
      }
      const updated = [...guestFav, { _id, image, name, price }];
      dispatch(saveFav(updated));
      return toast.success('Product added to Favorites');
    }
    //LOGGED IN
    dispatch(sendFav({ _id, image, name, price }));
  };
  return (
    <div
      key={product._id}
      className='overflow-hidden relative group transition-all duration-500 rounded-lg text-white bg-[var(--INPUT)] flex flex-col'
    >
      <button
        className='p-2 bg-[var(--BG2)]/80 absolute left-0 z-10 duration-300 -translate-y-full group-hover:translate-y-0 cursor-pointer'
        onClick={() =>
          favHandle({
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
          })
        }
      >
        <FaHeart
          size={25}
          color={
            fav.fav.find((item) => item._id === product._id)
              ? '#f87171'
              : 'white'
          }
        />
      </button>
      <span className='p-2 bg-[var(--BG2)]/80 absolute right-0 z-10 delay-300 duration-300 -translate-y-full group-hover:translate-y-0'>
        <IoCart
          size={25}
          color={
            cart.cart.find((item) => item.product._id === product._id)
              ? '#f87171'
              : 'white'
          }
        />
      </span>
      <img
        src={baseUrl + product.image}
        alt={product.name}
        className='aspect-square transition-all duration-500 group-hover:scale-110 p-2 h-80 w-full'
        loading='lazy'
      />
      <div className=' bg-[var(--BG2)]/80 transition-all duration-500 space-y-4 p-2 flex-1 flex flex-col justify-between'>
        <h3>{product.name}</h3>
        <p className='text-[var(--TEXT)] text-sm line-clamp-2'>
          {product.description}
        </p>
        <div className='flex flex-row justify-between'>
          <p className='font-semibold'>{product.price}$</p>
          <Link
            to={`/product/${product._id}`}
            className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white flex flex-row items-center gap-2'
          >
            Details
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
