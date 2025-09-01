import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useLocation } from 'react-router';
const baseUrl = import.meta.env.VITE_BASE_URL;
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { userLogout } from '../redux/features/mainSlice';
import { useNavigate } from 'react-router';
import { saveCart } from '../redux/features/cartSlice';
import { saveFav } from '../redux/features/favoriteSlice';
function Checkout() {
  const { user } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [data, setData] = useState({ error: '', message: '' });

  useEffect(() => {
    const checkPayment = async () => {
      try {
        await axios.post(
          `${baseUrl}/checkout/checkout-callback${search}`,
          {},
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setData({
          ...data,
          message: 'Your order has been placed successfully!',
        });
        const timer = setTimeout(() => {
          dispatch(saveCart([]));
          navigate('/');
        }, 2500);
        return () => clearTimeout(timer);
      } catch (error) {
        if (isAxiosError(error)) {
          if (
            error.response?.data.error === 'Auth' ||
            error.response?.data.error === 'Invalid token'
          ) {
            dispatch(userLogout());
            dispatch(saveFav([]));
            dispatch(saveCart([]));
            navigate('/login');
          } else {
            setData({ ...data, error: error.response?.data.error });
            const timer = setTimeout(() => {
              navigate('/cart');
            }, 2500);
            return () => clearTimeout(timer);
          }
        }
        console.log('Error during payment processing', error);
      }
    };
    checkPayment();
  }, [search]);

  return (
    <div>
      {!data.message.length && !data.error.length && (
        <div className='bg-black/40 h-full w-full absolute top-0 left-0 flex justify-center items-center flex-col gap-5 text-center'>
          <ImSpinner2 size={50} className='animate-spin mx-auto' />
          Please wait while we process your payment...
        </div>
      )}
      {data.error.length > 0 && (
        <div className='text-center text-red-600'>{data.error}</div>
      )}
      {data.message.length > 0 && (
        <div className='text-center text-green-600'>{data.message}</div>
      )}
    </div>
  );
}

export default Checkout;
