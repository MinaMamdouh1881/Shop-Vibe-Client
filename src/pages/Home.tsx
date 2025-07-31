import { useSearchParams } from 'react-router';

function Home() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  if (user) {
    localStorage.setItem('user', user);
    window.location.href = '/';
  }
  return (
    <div className='space-y-15'>
      {/* Hero */}
      <div
        className='flex flex-col-reverse lg:flex-row justify-between items-center gap-y-10'
      >
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
      </div>
    </div>
  );
}

export default Home;
