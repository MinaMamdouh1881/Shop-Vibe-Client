import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { PRODUCT } from '../types/productsType';
import ProductsLoading from './ProductsLoading';
import { FaHeart } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import {
  saveFav,
  sendFav,
  type FAVINITIALSTATE,
} from '../redux/features/favoriteSlice';
import toast from 'react-hot-toast';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Slider({
  data,
  loading,
  error,
  title,
  sliderId,
}: {
  data: PRODUCT[] | undefined;
  loading: boolean;
  error: boolean;
  title: string;
  sliderId: string;
}) {
  const { cart, fav, main } = useSelector((store: RootState) => store);
  const dispatch = useDispatch<AppDispatch>();
  const favHandle = ({
    _id,
    image,
    name,
    price,
  }: FAVINITIALSTATE['fav'][number]) => {
    const exists = (list: FAVINITIALSTATE['fav']) =>
      list.some((el) => el._id === _id);
    //GEST
    if (!main.user.isLoggedIn) {
      const guestFav: FAVINITIALSTATE['fav'] = JSON.parse(
        localStorage.getItem('myFav') || '[]'
      );
      if (exists(guestFav)) {
        dispatch(saveFav([...fav.fav.filter((el) => el._id !== _id)]));
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
    <div className='space-y-5 relative'>
      <h2 className='text-2xl font-bold'>{title}</h2>

      {error ? (
        <p className='text-center text-2xl'>
          Error Happened when Getting Products
        </p>
      ) : loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 justify-center items-center'>
          <ProductsLoading className='hidden lg:block' />
          <ProductsLoading className='hidden md:block' />
          <ProductsLoading className='hidden sm:block' />
          <ProductsLoading className='' />
        </div>
      ) : (
        data?.length && (
          <div className='relative'>
            <div
              className={`custom-nav-button prev-${sliderId} flex items-center justify-center left-0`}
              aria-label='Previous slide'
            >
              <IoChevronBack size={24} />
            </div>
            <div
              className={`custom-nav-button next-${sliderId} flex items-center justify-center right-0`}
              aria-label='Next slide'
            >
              <IoChevronForward size={24} />
            </div>

            <Swiper
              spaceBetween={25}
              slidesPerView={1}
              navigation={{
                prevEl: `.prev-${sliderId}`,
                nextEl: `.next-${sliderId}`,
              }}
              pagination={{
                el: `.custom-swiper-pagination-${sliderId}`,
                clickable: true,
                type: 'bullets',
              }}
              modules={[Navigation, Pagination]}
              className=''
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
              }}
            >
              {data.map((el) => (
                <SwiperSlide
                  key={el._id}
                  className='bg-[var(--INPUT)] overflow-hidden relative group transition-all duration-500 rounded-lg text-white'
                >
                  <button
                    className='p-2 bg-[var(--BG2)]/80 absolute left-0 z-10 duration-300 -translate-y-full group-hover:translate-y-0 cursor-pointer'
                    onClick={() =>
                      favHandle({
                        _id: el._id,
                        name: el.name,
                        price: el.price,
                        image: el.image,
                      })
                    }
                  >
                    <FaHeart
                      size={25}
                      color={
                        fav.fav.find((item) => item._id === el._id)
                          ? '#f87171'
                          : 'white'
                      }
                    />
                  </button>
                  <span className='p-2 bg-[var(--BG2)]/80 absolute right-0 z-10 delay-300 duration-300 -translate-y-full group-hover:translate-y-0'>
                    <IoCart
                      size={25}
                      color={
                        cart.cart.find((item) => item.product._id === el._id)
                          ? '#f87171'
                          : 'white'
                      }
                    />
                  </span>
                  <img
                    src={baseUrl + el.image}
                    alt={el.name}
                    className='aspect-square transition-all duration-500 group-hover:scale-110 p-2 h-80 w-full'
                  />
                  <div className='absolute left-0 bottom-0 bg-[var(--BG2)]/80 transition-all duration-500 space-y-4 p-2 translate-y-full group-hover:translate-y-0'>
                    <h3>{el.name}</h3>
                    <p className='text-[var(--TEXT)] text-sm line-clamp-2'>
                      {el.description}
                    </p>
                    <div className='flex flex-row justify-between'>
                      <p className='font-semibold'>{el.price}$</p>
                      <Link
                        to={`/product/${el._id}`}
                        className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white flex flex-row items-center gap-2'
                      >
                        Details
                        <FaLongArrowAltRight />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className={`custom-swiper-pagination-${sliderId} flex justify-center mt-4`}
            ></div>
          </div>
        )
      )}
    </div>
  );
}

export default Slider;
