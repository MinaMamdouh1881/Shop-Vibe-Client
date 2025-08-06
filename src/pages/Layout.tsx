import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Layout() {
  return (
    <>
      <Navbar />
      <div className='mx-2 md:mx-15 mt-15 text-[var(--COLOR)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
