import { useRef, useState, type FormEvent } from 'react';
import { newPassSchema } from '../validation/newPassValidation';
import { useResetPassMutation } from '../redux/services/authApi';
import { CgSpinner } from 'react-icons/cg';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useSearchParams } from 'react-router';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState('');
  const token = searchParams.get('token');

  const [validationErrors, setValidationErrors] = useState([]);
  const [showPass, setShowPass] = useState(false);

  const [resetPass, { error, isLoading }] = useResetPassMutation();

  const formRef = useRef<HTMLFormElement>(null);
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValidationErrors([]);
    setData('');

    //validation
    const result = newPassSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      JSON.parse(result.error?.message as string).map(
        (el: { path: string[]; message: never }) => {
          if (el.path[0] === 'password') {
            setValidationErrors((prev) => [...prev, el.message]);
          }
        }
      );
      return;
    }
    //call Api
    try {
      const res = await resetPass({
        ...Object.fromEntries(formData),
        token,
      }).unwrap();

      setData(res.msg);
      localStorage.removeItem('user');
      console.log('reset pass success', res);

      setTimeout(() => (window.location.href = '/login'), 2000);
    } catch (err) {
      console.log('reset pass failed:', err);
    }
  };
  return (
    <div>
      <div className='flex justify-center items-center h-[calc(100vh-138px)]'>
        <div
          className='bg-black/10 rounded-md p-4 sm:p-10 border-[var(--COLOR)] border space-y-5 text-[var(--COLOR)]'
          style={{
            boxShadow: '0 0px 20px var(--COLOR)',
          }}
        >
          <h1 className='text-center text-2xl text-bla'>
            Enter Your New Password
          </h1>
          <form
            ref={formRef}
            onSubmit={formHandler}
            className='sm:w-[500px] flex flex-col gap-5'
          >
            <div
              className={`flex flex-row items-center gap-5 bg-[var(--INPUT)] px-2 rounded-lg ${
                validationErrors.length ? 'border-1 border-red-700' : ''
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
            {validationErrors.map((el: string, i: number) => (
              <p className='text-red-700 text-sm' key={i}>
                {el}
              </p>
            ))}
            <button className='bg-[var(--BTN)] w-[200px] py-2 rounded-lg self-center cursor-pointer relative text-center flex justify-center'>
              {isLoading ? (
                <CgSpinner size={25} className='animate-spin' />
              ) : (
                'Send'
              )}
            </button>
            {error && 'data' in error && (
              <p className='text-center text-red-700 font-bold text-sm'>
                {(error.data as { error: string })?.error}
              </p>
            )}
            {data && (
              <p className='text-center text-green-700 font-bold text-sm'>
                {data}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
