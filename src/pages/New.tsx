import { useGetNewArrivalQuery } from '../redux/services/productsApi';
import SingleProduct from '../components/SingleProduct';
import ProductsLoading from '../components/ProductsLoading';
import { useState } from 'react';

function New() {
  const { data, isLoading, isError } = useGetNewArrivalQuery(undefined);
  const [page, setPage] = useState(1);
  const limit = 8;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const numOfPages = Math.ceil((data?.products.length || limit) / limit);

  const currentProduct = data?.products.slice(startIndex, endIndex);
  return (
    <div className='space-y-5'>
      <h2 className='text-center text-2xl font-bold md:text-4xl'>
        New Arrivals
      </h2>
      <p className='text-center text-sm md:text-xl'>
        Check out the latest products in out collection. Fresh styles added
        weekly.
      </p>
      {isLoading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40'>
          <ProductsLoading />
          <ProductsLoading />
          <ProductsLoading />
          <ProductsLoading />
          <ProductsLoading />
          <ProductsLoading />
          <ProductsLoading />
          <ProductsLoading />
        </div>
      )}
      {isError && <p>Error While Getting Products</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {data?.success &&
          data.products.length &&
          currentProduct?.map((el) => (
            <SingleProduct product={el} key={el._id} />
          ))}
      </div>
      <div className='flex flex-row flex-wrap items-center justify-center gap-5 mt-10'>
        {Array.from({ length: numOfPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${
              page == i + 1 ? 'bg-[var(--BTN)] text-white' : ''
            } px-5 py-2 cursor-pointer border rounded-lg border-[var(--BTN)]`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default New;