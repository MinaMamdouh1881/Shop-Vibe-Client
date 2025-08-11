import { FaHeart } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import Styles from './navbar.module.css';
import { SiShopee } from 'react-icons/si';
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { useState } from 'react';
import { Link } from 'react-router';
import { userLogout } from '../redux/features/mainSlice';
import { deleteCartAndFav } from '../redux/features/cartAndFavSlice';

function Navbar() {
  const user = useSelector((state: RootState) => state.main.user);
  const { cart, fav } = useSelector((state: RootState) => state.cartAndFav);

  const dispatch = useDispatch<AppDispatch>();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      return true;
    } else {
      document.body.classList.remove('dark');
      return false;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    );
    setIsDark(document.body.classList.contains('dark'));
  };
  const middleLinks = [
    { name: 'Home', to: '/' },
    { name: 'Collections', to: '/collections' },
    { name: 'New', to: '/new' },
  ];
  return (
    <div
      className='flex flex-row justify-between p-5 *:flex-row *:gap-5 *:items-center text-[var(--COLOR)] relative bg-[var(--BG)]'
      style={{ boxShadow: '0 1px 10px var(--COLOR)' }}
    >
      <div className='flex'>
        <SiShopee size={25} />
        <h1 className='text-2xl font-bold'>Shop Vibe</h1>
      </div>
      {/* hamburger menu */}
      <button
        className='cursor-pointer md:hidden'
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
      </button>
      {/* hamburger menu */}
      {/* desktop menu */}
      <ul className='hidden md:flex'>
        {middleLinks.map((link, index) => (
          <li className={`${Styles.links}`} key={index}>
            <Link to={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <ul className='hidden md:flex'>
        <li className='p-2 bg-[var(--INPUT)] rounded-lg relative'>
          <span className='absolute bg-[var(--BTN)] aspect-square rounded-full px-1 top-full left-full -translate-x-1/2 -translate-y-1/2 text-xs text-white'>
            {fav.length || 0}
          </span>
          <Link to='/my-favorite'>
            <FaHeart size={15} />
          </Link>
        </li>
        <li className='p-2 bg-[var(--INPUT)] rounded-lg relative'>
          <span className='absolute bg-[var(--BTN)] aspect-square rounded-full px-1 top-full left-full -translate-x-1/2 -translate-y-1/2 text-xs text-white'>
            {cart.length || 0}
          </span>
          <Link to='/cart'>
            <FaShoppingCart size={15} />
          </Link>
        </li>
        <li className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white'>
          {user.isLoggedIn ? (
            <button
              onClick={() => {
                dispatch(userLogout());
                dispatch(deleteCartAndFav());
              }}
              className='cursor-pointer'
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>login</Link>
          )}
        </li>
        <li
          onClick={toggleDarkMode}
          className='p-2 bg-[var(--INPUT)] rounded-lg cursor-pointer'
        >
          {isDark ? <MdLightMode size={15} /> : <MdDarkMode size={15} />}
        </li>
      </ul>
      {/* desctop menu */}
      {/* mobile menu */}
      <div
        className={`md:hidden absolute w-full duration-500 bg-[var(--BG)] top-[72px] z-50 px-5 space-y-5 pb-5 ${
          menuOpen ? 'left-0' : 'left-full'
        }`}
      >
        <ul className='md:flex'>
          {middleLinks.map((link, index) => (
            <li className={`${Styles.links}`} key={index}>
              <Link to={link.to} onClick={() => setMenuOpen((prev) => !prev)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className='flex flex-row justify-center gap-5 '>
          <li className='py-2 px-3 bg-[var(--INPUT)] rounded-lg flex justify-center items-center relative'>
            <span className='absolute bg-[var(--BTN)] aspect-square rounded-full px-1 top-full left-full -translate-x-1/2 -translate-y-1/2 text-xs text-white'>
              {fav.length || 0}
            </span>
            <Link to='/my-favorite'>
              <FaHeart size={15} />
            </Link>
          </li>
          <li className='py-2 px-3 bg-[var(--INPUT)] rounded-lg flex justify-center items-center relative'>
            <span className='absolute bg-[var(--BTN)] aspect-square rounded-full px-1 top-full left-full -translate-x-1/2 -translate-y-1/2 text-xs'>
              {cart.length || 0}
            </span>
            <Link to='/cart'>
              <FaShoppingCart size={15} />
            </Link>
          </li>
          <li className='bg-[var(--BTN)] p-2 rounded-lg text-sm text-white'>
            {user.isLoggedIn ? (
              <button
                onClick={() => {
                  dispatch(userLogout());
                  dispatch(deleteCartAndFav());
                }}
                className='cursor-pointer'
              >
                Logout
              </button>
            ) : (
              <Link to='/login'>login</Link>
            )}
          </li>
          <li
            onClick={toggleDarkMode}
            className='py-2 px-3 bg-[var(--INPUT)] rounded-lg flex justify-center items-center cursor-pointer'
          >
            {isDark ? <MdLightMode size={15} /> : <MdDarkMode size={15} />}
          </li>
        </ul>
      </div>
      {/* mobile menu */}
    </div>
  );
}

export default Navbar;
