import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
function Layout() {
  return (
    <>
      <Navbar />
      <div className='mx-2 md:mx-15 mt-15 text-[var(--COLOR)]'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
