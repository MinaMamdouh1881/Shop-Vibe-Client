import { SiShopee } from 'react-icons/si';

function Footer() {
  return (
    <footer
      className='flex flex-col justify-between items-center gap-5 sm:flex-row p-5 text-[var(--COLOR)] bg-[var(--BG)] mt-15'
      style={{ boxShadow: '0 -1px 10px var(--COLOR)' }}
    >
      <div className='flex flex-row items-center gap-3'>
        <SiShopee size={25} />
        <h2 className='text-xl font-bold'>Shop Vibe</h2>
      </div>
      <div className='flex flex-col items-center md:items-end gap-3'>
        <p className='text-sm text-center'>
          &copy; {new Date().getFullYear()} Shop Vibe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
