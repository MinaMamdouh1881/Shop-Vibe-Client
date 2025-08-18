import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import LoginProvider from '../components/LoginProvider';
import { useLoginMutation } from '../redux/services/authApi';
import { loginSchema } from '../validation/loginValidation';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/features/mainSlice';
import { saveCart } from '../redux/features/cartSlice';
import { saveFav } from '../redux/features/favoriteSlice';
import type { AppDispatch } from '../redux/store';
import type { UserData } from '../types/userDataType';

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    emailErr: [],
    passwordErr: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [login, { error, isLoading }] = useLoginMutation();

  const formRef = useRef<HTMLFormElement>(null);
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValidationErrors({ emailErr: [], passwordErr: [] });

    //validation
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      JSON.parse(result.error?.message as string).map(
        (el: { path: string[]; message: never }) => {
          if (el.path[0] === 'email') {
            setValidationErrors((prev) => ({
              ...prev,
              emailErr: [...prev.emailErr, el.message],
            }));
          } else {
            setValidationErrors((prev) => ({
              ...prev,
              passwordErr: [...prev.passwordErr, el.message],
            }));
          }
        }
      );
      return;
    }
    //call Api
    try {
      const res: { success: boolean; token: string; user: UserData } =
        await login(Object.fromEntries(formData)).unwrap();
      dispatch(
        setUserData({
          id: res.user.id,
          isLoggedIn: true,
          rule: res.user.rule,
          userName: res.user.userName,
          token: res.token,
        })
      );

      dispatch(saveCart(res.user.myCart));
      dispatch(saveFav(res.user.myFavorites));
      navigate('/');
    } catch (err) {
      console.log('Login failed:', err);
    }
  };

  return (
    <div className='flex justify-center items-center h-[calc(100vh-138px)]'>
      <div
        className='bg-black/10 rounded-md p-4 sm:p-10 border-[var(--COLOR)] border space-y-5 text-[var(--COLOR)]'
        style={{
          boxShadow: '0 0px 20px var(--COLOR)',
        }}
      >
        <h1 className='text-center text-5xl text-bla'>Login</h1>
        <form
          ref={formRef}
          className='sm:w-[500px] flex flex-col gap-5'
          onSubmit={formHandler}
        >
          <div
            className={`flex flex-row items-center gap-5 bg-[var(--INPUT)] px-2 rounded-lg ${
              validationErrors.emailErr.length ? 'border-1 border-red-700' : ''
            }`}
          >
            <MdEmail size={25} />
            <input
              type='email'
              placeholder='Enter Your Email'
              name='email'
              className='flex-1 py-2 focus:outline-none'
            />
          </div>
          {validationErrors.emailErr.map((el: string, i: number) => (
            <p className='text-red-700 text-sm' key={i}>
              {el}
            </p>
          ))}
          <div
            className={`flex flex-row items-center gap-5 bg-[var(--INPUT)] px-2 rounded-lg ${
              validationErrors.passwordErr.length
                ? 'border-1 border-red-700'
                : ''
            }`}
          >
            <RiLockPasswordFill size={25} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder='Enter Your Password'
              name='password'
              className='flex-1 py-2 focus:outline-none'
            />
            <button type='button' onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </button>
          </div>
          {validationErrors.passwordErr.map((el: string, i: number) => (
            <p className='text-red-700 text-sm' key={i}>
              {el}
            </p>
          ))}
          <p>
            Don't Have Email ?{' '}
            <Link to='/signup' className='text-[var(--BTN)]'>
              Sign Up
            </Link>
          </p>
          <Link to='/forget-password' className='text-[var(--BTN)] text-end'>
            Forget Your Password
          </Link>
          <button className='bg-[var(--BTN)] w-[200px] py-2 rounded-lg self-center cursor-pointer relative text-center flex justify-center'>
            {isLoading ? (
              <CgSpinner size={25} className='animate-spin' />
            ) : (
              'Login'
            )}
          </button>
          {error && 'data' in error && (
            <p className='text-center text-red-700 font-bold text-sm'>
              {(error.data as { error: string })?.error}
            </p>
          )}
          <LoginProvider />
        </form>
      </div>
    </div>
  );
}

export default Login;
