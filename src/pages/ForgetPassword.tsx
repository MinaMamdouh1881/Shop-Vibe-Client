import { useRef, useState, type FormEvent } from 'react';
import { MdEmail } from 'react-icons/md';
import { forgetPassSchema } from '../validation/forgetPassValidation';
import { useForgetPassMutation } from '../redux/services/authApi';
import { CgSpinner } from 'react-icons/cg';

function ForgetPassword() {
  const [validationErrors, setValidationErrors] = useState([]);
  const [data, setData] = useState('');

  const [forgetPass, { error, isLoading }] = useForgetPassMutation();

  const formRef = useRef<HTMLFormElement>(null);
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setValidationErrors([]);
    setData('');

    //validation
    const result = forgetPassSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      JSON.parse(result.error?.message as string).map(
        (el: { path: string[]; message: never }) => {
          if (el.path[0] === 'email') {
            setValidationErrors((prev) => [...prev, el.message]);
          }
        }
      );
      return;
    }
    //call Api
    try {
      const res = await forgetPass(Object.fromEntries(formData)).unwrap();
      setData(res.msg);
      console.log('email send success', res);
      formRef.current?.reset();
    } catch (err) {
      console.log('email send failed:', err);
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
          <h1 className='text-center text-2xl text-bla'>Enter Your Email</h1>
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
              <MdEmail size={25} />
              <input
                type='email'
                placeholder='Enter Your Email'
                name='email'
                className='flex-1 py-2 focus:outline-none'
              />
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

export default ForgetPassword;
