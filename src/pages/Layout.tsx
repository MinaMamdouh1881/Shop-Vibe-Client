import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Layout() {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Navbar />
      <div className='mx-2 md:mx-15 mt-15 text-[var(--COLOR)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
