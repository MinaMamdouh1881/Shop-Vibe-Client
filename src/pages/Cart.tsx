import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
const baseUrl = import.meta.env.VITE_BASE_URL;
import { IoMdAdd, IoIosRemove } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../redux/features/cartSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const { cart, main } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (main.user.isLoggedIn) {
      const saveCart = async () => {
        await axios
          .put(
            `${baseUrl}/cartAndFav/saveCart`,
            { items: cart.cart },
            {
              headers: { authorization: `Bearer ${main.user.token}` },
            }
          )
          .catch((err) => console.log(err));
      };

      saveCart();
    }
  }, []);

  if (!cart.cart.length) return <h1 className='text-center'>No Items Here</h1>;

  return (
    <div className='flex flex-col gap-5'>
      {cart.cart?.map((el) => (
        <div
          className='bg-[var(--INPUT)] rounded-2xl border'
          key={el.product._id}
        >
          <div className='flex flex-col gap-5 md:flex-row md:justify-between'>
            <div className='flex flex-row gap-2 md:gap-10'>
              <Link to={`/product/${el.product._id}`}>
                <div className='aspect-square w-40 overflow-hidden rounded-tl-2xl md:rounded-l-2xl'>
                  <img
                    src={baseUrl + el.product.image}
                    alt={el.product.name}
                    className='w-full h-full object-cover'
                  />
                </div>
              </Link>
              <div className='py-5 flex flex-col justify-between'>
                <h3 className='font-bold'>{el.product.name}</h3>
                <p className='text-[var(--SECONDARY)]'>
                  Quantity : {el.quantity}
                </p>
                <p className='text-[var(--SECONDARY)]'>size : {el.size}</p>
              </div>
            </div>
            <div className='flex flex-row-reverse md:flex-col justify-between items-center px-5 py-2'>
              <p>$ {(el.product.price * el.quantity).toFixed(2)}</p>
              <div className='flex flex-row gap-2 *:p-2 *:rounded *:text-white'>
                <button
                  className='bg-[var(--RED)]'
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({ id: el.product._id, size: el.size })
                    )
                  }
                >
                  <IoIosRemove />
                </button>
                <button
                  className='bg-[var(--BTN)]'
                  onClick={() =>
                    dispatch(
                      increaseQuantity({ id: el.product._id, size: el.size })
                    )
                  }
                >
                  <IoMdAdd />
                </button>
                <button
                  className='bg-[var(--RED)]'
                  onClick={() =>
                    dispatch(
                      removeFromCart({ id: el.product._id, size: el.size })
                    )
                  }
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='flex flex-row justify-between'>
        <button
          className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white'
          onClick={() => toast.success('Checkout successful!')}
        >
          Checkout
        </button>
        <p>Total Price : {cart.totalPrice.toFixed(2)}$</p>
      </div>
    </div>
  );
}

export default Cart;
