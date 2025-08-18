import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useRef, useState, type FormEvent } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router';
import LoginProvider from '../components/LoginProvider';
import { setUserData } from '../redux/features/mainSlice';
import { signupSchema } from '../validation/signupValidation';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useSignupMutation } from '../redux/services/authApi';
import type { UserData } from '../types/userDataType';
import { saveCart } from '../redux/features/cartSlice';
import { saveFav } from '../redux/features/favoriteSlice';

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    emailErr: [],
    passwordErr: [],
    userNameErr: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [signup, { error, isLoading }] = useSignupMutation();

  const formRef = useRef<HTMLFormElement>(null);
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValidationErrors({ emailErr: [], passwordErr: [], userNameErr: [] });

    //validation
    const result = signupSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      JSON.parse(result.error?.message as string).map(
        (el: { path: string[]; message: never }) => {
          if (el.path[0] === 'email') {
            setValidationErrors((prev) => ({
              ...prev,
              emailErr: [...prev.emailErr, el.message],
            }));
          } else if (el.path[0] === 'userName') {
            setValidationErrors((prev) => ({
              ...prev,
              userNameErr: [...prev.userNameErr, el.message],
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
        await signup(Object.fromEntries(formData)).unwrap();
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
        <h1 className='text-center text-5xl text-bla'>Sign Up</h1>
        <form
          ref={formRef}
          onSubmit={formHandler}
          className='sm:w-[500px] flex flex-col gap-5'
        >
          <div
            className={`flex flex-row items-center gap-5 bg-[var(--INPUT)] px-2 rounded-lg ${
              validationErrors.userNameErr.length
                ? 'border-1 border-red-700'
                : ''
            }`}
          >
            <FaUser size={25} />
            <input
              type='text'
              placeholder='Enter Your Username'
              name='userName'
              className='flex-1 py-2 focus:outline-none'
            />
          </div>
          {validationErrors.userNameErr.map((el: string, i: number) => (
            <p className='text-red-700 text-sm' key={i}>
              {el}
            </p>
          ))}
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
            Have Email ?{' '}
            <Link to='/login' className='text-[var(--BTN)]'>
              Login
            </Link>
          </p>
          <button className='bg-[var(--BTN)] w-[200px] py-2 rounded-lg self-center cursor-pointer relative text-center flex justify-center'>
            {isLoading ? (
              <CgSpinner size={25} className='animate-spin' />
            ) : (
              'Sign up'
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

export default Signup;
