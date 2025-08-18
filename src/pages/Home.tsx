import { useNavigate, useSearchParams } from 'react-router';
import {
  useGetBestSalesMenQuery,
  useGetBestSalesWomenQuery,
  useGetFeaturedMenQuery,
  useGetFeaturedWomenQuery,
} from '../redux/services/productsApi';
import Slider from '../components/Slider';
import type { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/features/mainSlice';
import { useEffect } from 'react';
import type { UserData } from '../types/userDataType';
import { saveCart } from '../redux/features/cartSlice';
import { saveFav } from '../redux/features/favoriteSlice';

function Home() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const res = searchParams.get('res');
  useEffect(() => {
    if (res) {
      const response: { success: boolean; token: string; user: UserData } =
        JSON.parse(decodeURIComponent(res));
      dispatch(
        setUserData({
          id: response.user.id,
          isLoggedIn: true,
          rule: response.user.rule,
          userName: response.user.userName,
          token: response.token,
        })
      );
      dispatch(saveCart(response.user.myCart));
      dispatch(saveFav(response.user.myFavorites));
      navigate('/');
    }
  }, [res]);

  const {
    data: featuredMen,
    isLoading: loadingFeaturedMen,
    isError: errorFeaturedMen,
  } = useGetFeaturedMenQuery(undefined);
  const {
    data: featuredWomen,
    isLoading: loadingFeaturedWomen,
    isError: errorFeaturedWomen,
  } = useGetFeaturedWomenQuery(undefined);
  const {
    data: bestSalesMen,
    isLoading: loadingBestSalesMen,
    isError: errorBestSalesMen,
  } = useGetBestSalesMenQuery(undefined);
  const {
    data: bestSalesWomen,
    isLoading: loadingBestSalesWomen,
    isError: errorBestSalesWomen,
  } = useGetBestSalesWomenQuery(undefined);

  return (
    <div className='space-y-15 mb-15'>
      {/* Hero */}
      <section className='flex flex-col-reverse lg:flex-row justify-between items-center gap-y-10'>
        <div className='lg:w-[50%] space-y-10 bg-black/30 p-5 rounded-2xl'>
          <h2 className='text-3xl font-bold'>Welcome to Shop Vibe</h2>
          <p>Discover Your Style, Feel the Vibe!</p>
          <p className='leading-7'>
            Dive into the latest fashion trends with Shop Vibe, your go-to
            destination for chic, affordable, and unique clothing. From
            streetwear to elegant fits, we've got everything you need to express
            yourself. Shop now and elevate your wardrobe with pieces that speak
            your vibe!
          </p>
          <button className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white'>
            Shop Now
          </button>
        </div>
        <img
          src='src/assets/shope-vibe-hero.webp'
          alt='shope-vibe-hero'
          className='w-[80%] sm:w-[60%] lg:w-[45%] rounded-2xl'
          style={{ boxShadow: '0 0px 20px var(--COLOR)' }}
        />
      </section>
      {/* Hero */}

      {/* Featchered Men */}
      <Slider
        data={featuredMen?.products}
        error={errorFeaturedMen}
        loading={loadingFeaturedMen}
        title='Featured In Men'
        sliderId='featured-men'
      />
      {/* Featchered Men */}

      {/* Featchered Women */}
      <Slider
        data={featuredWomen?.products}
        error={errorFeaturedWomen}
        loading={loadingFeaturedWomen}
        title='Featured In Women'
        sliderId='featured-Women'
      />
      {/* Featchered Women */}

      {/* Best Sales Men */}
      <Slider
        data={bestSalesMen?.products}
        error={errorBestSalesMen}
        loading={loadingBestSalesMen}
        title='Best Sales In Men'
        sliderId='best-sales-men'
      />
      {/* Best Sales Men */}

      {/* Best Sales Women */}
      <Slider
        data={bestSalesWomen?.products}
        error={errorBestSalesWomen}
        loading={loadingBestSalesWomen}
        title='Best Sales In Women'
        sliderId='best-sales-women'
      />
      {/* Best Sales Women */}
    </div>
  );
}

export default Home;
