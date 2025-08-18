import { useParams } from 'react-router';
import {
  isGender,
  isMenCategory,
  isWomenCategory,
  type MENCATEGORIES,
  type WOMENCATEGORIES,
} from '../types/productsType';
import { useGetProductsQuery } from '../redux/services/productsApi';
import SingleProduct from '../components/SingleProduct';
import ProductsLoading from '../components/ProductsLoading';
import { useState } from 'react';
function SubCategory() {
  const { gender, subCat } = useParams<{
    subCat?: WOMENCATEGORIES | MENCATEGORIES;
    gender?: string;
  }>();

  if (!isGender(gender)) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className=''>Error No Products Here</p>
      </div>
    );
  }
  if (
    (gender === 'men' && !isMenCategory(subCat)) ||
    (gender === 'women' && !isWomenCategory(subCat))
  ) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className=''>{`Error No ${subCat} In ${gender}`}</p>
      </div>
    );
  }
  if (!isGender(gender)) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className=''>Error No Products Here</p>
      </div>
    );
  }

  const { data, isLoading, isError } = useGetProductsQuery({
    gender,
    category: subCat,
  });

  const [page, setPage] = useState(1);
  const limit = 8;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const currentProducts = data?.products.slice(startIndex, endIndex);
  const totalPages = Math.ceil((data?.products.length || limit) / limit);

  return (
    <div className='space-y-5'>
      <h2 className='text-center text-2xl font-bold md:text-4xl'>
        {gender === 'men' ? `Men's ${subCat}` : `Women's ${subCat}`}
      </h2>
      <p className='text-center text-sm md:text-xl'>
        {`Check out our ${subCat} products in ${
          gender === 'men' ? 'men Collection' : 'women Collection'
        }. Fresh styles added weekly.`}
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
          currentProducts?.map((el) => (
            <SingleProduct product={el} key={el._id} />
          ))}
      </div>
      <div className='flex flex-row flex-wrap items-center justify-center gap-5 mt-10'>
        {Array.from({ length: totalPages }, (_, i) => (
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

export default SubCategory;
