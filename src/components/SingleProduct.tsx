import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
const baseUrl = import.meta.env.VITE_BASE_URL;
import type { PRODUCT } from '../types/productsType';
import { Link } from 'react-router';

function SingleProduct({ product }: { product: PRODUCT }) {
  return (
    <div
      key={product._id}
      className='overflow-hidden relative group transition-all duration-500 rounded-lg text-white bg-[var(--INPUT)] flex flex-col'
    >
      <span className='p-2 bg-[var(--BG2)]/80 absolute left-0 z-10 duration-300 -translate-y-full group-hover:translate-y-0'>
        <FaHeart size={25} color='white' />
      </span>
      <span className='p-2 bg-[var(--BG2)]/80 absolute right-0 z-10 delay-300 duration-300 -translate-y-full group-hover:translate-y-0'>
        <IoCart size={25} color='white' />
      </span>
      <img
        src={baseUrl + product.image}
        alt={product.name}
        className='aspect-square transition-all duration-500 group-hover:scale-110 p-2 h-80 w-full'
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
