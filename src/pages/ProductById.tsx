import { FaShoppingCart } from 'react-icons/fa';
import { useLocation } from 'react-router';
import { useGetProductByIdQuery } from '../redux/services/productsApi';
import { useState } from 'react';
import ProductsLoading from '../components/ProductsLoading';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../redux/store';
import {
  saveCart,
  sendCart,
  type CARTINITIALSTATE,
} from '../redux/features/cartSlice';
import toast from 'react-hot-toast';
const baseUrl = import.meta.env.VITE_BASE_URL;

function ProductById() {
  const { cart, main } = useSelector((store: RootState) => store);
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const { data, isLoading, isError } = useGetProductByIdQuery({
    id: pathname.replace('/product/', ''),
  });
  const [selectedSize, setSelectedSize] = useState<string>('');

  const cartHandle = ({
    _id,
    product,
    quantity,
    size,
  }: CARTINITIALSTATE['cart'][number]) => {
    const exists = (list: CARTINITIALSTATE['cart']) =>
      list.some((el) => el.product._id === product._id && el.size === size);

    if (!main.user.isLoggedIn) {
      const guestCart: CARTINITIALSTATE['cart'] = JSON.parse(
        localStorage.getItem('myCart') || '[]'
      );

      if (exists(guestCart)) {
        return toast.error('Product already in cart');
      }

      const updated = [...guestCart, { _id, product, quantity, size }];
      dispatch(saveCart(updated));
      return toast.success('Product added to cart');
    }

    if (exists(cart.cart)) {
      return toast.error('Product already in cart');
    }

    dispatch(sendCart({ _id, product, quantity, size }));
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ProductsLoading />
      </div>
    );
  }

  if (isError || !data?.product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className=''>Error loading product</p>
      </div>
    );
  }

  return (
    <div className='mx-auto px-4 py-8 max-w-7xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex justify-center'>
          <img
            src={baseUrl + data.product.image}
            alt={data.product.name}
            className='w-full max-w-md h-auto object-cover rounded-lg shadow-md'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold '>{data.product.name}</h2>
          <div className='flex items-center gap-2'>
            <span className='text-xl font-semibold'>
              ${data.product.price.toFixed(2)}
            </span>
            {data.product.featured && (
              <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded'>
                Featured
              </span>
            )}
          </div>
          <p className='text-[var(--SECONDARY)]'>{data.product.description}</p>
          <div>
            <h3 className='text-lg font-medium '>Category</h3>
            <p className='text-[var(--SECONDARY)] capitalize'>
              {data.product.category}
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium '>Gender</h3>
            <p className='text-[var(--SECONDARY)] capitalize'>
              {data.product.gender}
            </p>
          </div>
          <div className='my-5'>
            <h3 className='text-lg font-medium '>Select Size</h3>
            <div className='flex gap-2 mt-2'>
              {data.product.size?.length &&
                data.product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
            </div>
            <button
              className='mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row justify-between items-center w-full'
              disabled={selectedSize === ''}
              onClick={() =>
                cartHandle({
                  _id: data.product._id,
                  product: {
                    _id: data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    image: data.product.image,
                  },
                  quantity: 1,
                  size: selectedSize,
                })
              }
            >
              Add to Cart{' '}
              <FaShoppingCart
                color={
                  cart.cart.find(
                    (item) => item.product._id === data.product._id
                  )
                    ? '#f87171'
                    : 'white'
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductById;
