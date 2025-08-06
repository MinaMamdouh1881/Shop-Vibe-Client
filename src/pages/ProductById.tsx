import { FaHeart } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useLocation } from 'react-router';
import { useGetProductByIdQuery } from '../redux/services/productsApi';
import { useState, useEffect } from 'react';
import ProductsLoading from '../components/ProductsLoading';
const baseUrl = import.meta.env.VITE_BASE_URL;

function ProductById() {
  const { pathname } = useLocation();
  const { data, isLoading, isError } = useGetProductByIdQuery({
    id: pathname.replace('/product/', ''),
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Log selected sizes whenever they change
  useEffect(() => {
    console.log('Selected sizes:', selectedSizes);
  }, [selectedSizes]);

  const handleSizeClick = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
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

  const product = data.product;

  return (
    <div className='mx-auto px-4 py-8 max-w-7xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex justify-center'>
          <img
            src={baseUrl + product.image}
            alt={product.name}
            className='w-full max-w-md h-auto object-cover rounded-lg shadow-md'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold '>{product.name}</h2>
          <div className='flex items-center gap-2'>
            <span className='text-xl font-semibold'>
              ${product.price.toFixed(2)}
            </span>
            {product.featured && (
              <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded'>
                Featured
              </span>
            )}
          </div>
          <p className='text-[var(--SECONDARY)]'>{product.description}</p>
          <div>
            <h3 className='text-lg font-medium '>Category</h3>
            <p className='text-[var(--SECONDARY)] capitalize'>
              {product.category}
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium '>Gender</h3>
            <p className='text-[var(--SECONDARY)] capitalize'>
              {product.gender}
            </p>
          </div>
          <div>
            <h3 className='text-lg font-medium '>Available Sizes</h3>
            <div className='flex gap-2 mt-2'>
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    selectedSizes.includes(size)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            className='mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row justify-between items-center'
            disabled={selectedSizes.length === 0}
          >
            Add to Cart <FaShoppingCart />
          </button>
          <button
            className='mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row justify-between items-center'
            disabled={selectedSizes.length === 0}
          >
            Add to Wish List <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductById;

// import { useLocation } from 'react-router';
// import { useGetProductByIdQuery } from '../redux/services/productsApi';
// function ProductById() {
//   const { pathname } = useLocation();
//   const { data, isLoading, isError } = useGetProductByIdQuery({
//     id: pathname.replace('/product/', ''),
//   });
//   console.log(data);

//   return <div>{data?.product.category}</div>;
// }

// export default ProductById;
