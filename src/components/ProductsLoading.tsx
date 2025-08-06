import { ImSpinner2 } from 'react-icons/im';

function ProductsLoading({ className }: { className?: string }) {
  return (
    <div className={`mx-auto ${className}`}>
      <ImSpinner2 size={50} className='animate-spin mx-auto' />
    </div>
  );
}

export default ProductsLoading;
