import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Collections from './pages/Collections';
import New from './pages/New';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import ProductById from './pages/ProductById';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import Cart from './pages/Cart';
import MyFavorite from './pages/MyFavorite';
export default function App() {
  const { user } = useSelector((state: RootState) => state.main);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path='/login'
              element={!user.isLoggedIn ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!user.isLoggedIn ? <Signup /> : <Navigate to={'/'} />}
            />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/' element={<Home />} />
            <Route path='/collections'>
              <Route index element={<Collections />} />
              <Route path=':gender'>
                <Route index element={<Category />} />
                <Route path=':subCat' element={<SubCategory />} />
              </Route>
            </Route>
            <Route path='/product'>
              <Route path=':id' element={<ProductById />} />
            </Route>
            <Route path='/new' element={<New />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-favorite' element={<MyFavorite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
