import { FcGoogle } from 'react-icons/fc';
import { FaSquareFacebook } from 'react-icons/fa6';
const baseUrl = import.meta.env.VITE_BASE_URL;
function LoginProvider() {
  const googleLogin = () => {
    window.open(`${baseUrl}/auth/google`, '_self');
  };
  const facebookLogin = () => {
    window.open(`${baseUrl}/auth/facebook`, '_self');
  };
  return (
    <div className='flex justify-center items-center flex-row gap-10'>
      <button
        type='button'
        className='bg-[var(--COLOR)] p-2 rounded-lg self-center cursor-pointer relative text-center flex justify-center text-[var(--BG)] gap-2'
        onClick={googleLogin}
      >
        <FcGoogle size={25} />
      </button>

      <button
        type='button'
        className='bg-[var(--COLOR)] p-2 rounded-lg self-center cursor-pointer relative text-center flex justify-center text-[var(--BG)] gap-2'
        onClick={facebookLogin}
      >
        <FaSquareFacebook size={25} color='#1877F2' />
      </button>
    </div>
  );
}

export default LoginProvider;
