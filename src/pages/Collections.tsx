import { Link } from 'react-router';

function Collections() {
  const data = [
    {
      image: 'src/assets/men-pants.webp',
      alt: 'men-pants',
      title: 'Pants',
      link: '/collections/men/pants',
    },
    {
      image: 'src/assets/men-shirts.webp',
      alt: 'men-shirts',
      title: 'Shirts',
      link: '/collections/men/shirt',
    },
    {
      image: 'src/assets/men-shoes.webp',
      alt: 'men-shoes',
      title: 'Shoes',
      link: '/collections/men/shoes',
    },
    {
      image: 'src/assets/men-t-shirt.webp',
      alt: 'men-t-shirt',
      title: 'T-shirt',
      link: '/collections/men/t-shirt',
    },
    {
      image: 'src/assets/women-blouse.webp',
      alt: 'women-blouse',
      title: 'Blouse',
      link: '/collections/women/blouse',
    },
    {
      image: 'src/assets/women-heels.webp',
      alt: 'women-heels',
      title: 'Heels',
      link: '/collections/women/heels',
    },
    {
      image: 'src/assets/women-skirt.webp',
      alt: 'women-skirt',
      title: 'Skirt',
      link: '/collections/women/skirt',
    },
  ];
  return (
    <div className='space-y-5'>
      <h2 className='text-center text-2xl font-bold md:text-4xl'>
        Our Collections
      </h2>
      <p className='text-center text-sm md:text-xl'>
        Explore our curated collections, designed for every style and occasion.
      </p>

      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 overflow-hidden'>
        <div className='overflow-hidden rounded-2xl relative group'>
          <img
            src='src/assets/men-collection.webp'
            alt='man-collection'
            className='scale-120 group-hover:scale-100 duration-500 filter grayscale-0 brightness-100 group-hover:grayscale group-hover:brightness-50'
          />
          <div className='absolute top-1/2 left-1/2 duration-500 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 flex flex-col justify-center gap-10'>
            <h3 className='text-3xl font-semibold text-[#00BFFF] text-nowrap'>
              Men's Collection
            </h3>
            <Link
              className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white text-center'
              to={'/collections/men'}
            >
              Explore
            </Link>
          </div>
        </div>
        <div className='overflow-hidden rounded-2xl relative group'>
          <img
            src='src/assets/women-collection.webp'
            alt='woman-collection'
            className='scale-120 group-hover:scale-100 duration-500 filter grayscale-0 brightness-100 group-hover:grayscale group-hover:brightness-50'
          />
          <div className='absolute top-1/2 left-1/2 duration-500 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 flex flex-col justify-center gap-10'>
            <h3 className='text-3xl font-semibold text-[#00BFFF] text-nowrap'>
              Women's Collection
            </h3>
            <Link
              className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white text-center'
              to={'/collections/women'}
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-row flex-wrap gap-10 items-center justify-center mt-20'>
        {data.map((el, i) => (
          <div className='group relative overflow-hidden rounded-2xl' key={i}>
            <img
              src={el.image}
              alt={el.alt}
              className='aspect-square w-[250px] scale-120 group-hover:scale-100 duration-500 filter grayscale-0 brightness-100 group-hover:grayscale group-hover:brightness-50'
            />
            <div className='absolute top-1/2 left-1/2 duration-500 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 flex flex-col justify-center gap-10'>
              <h3 className='text-3xl font-semibold text-[#00BFFF] text-nowrap'>
                {el.title}
              </h3>
              <Link
                className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white text-center'
                to={el.link}
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
