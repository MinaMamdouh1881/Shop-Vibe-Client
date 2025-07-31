import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Collections from './pages/Collections';
import New from './pages/New';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path='/login'
              element={
                !localStorage.getItem('user') ? <Login /> : <Navigate to='/' />
              }
            />
            <Route
              path='/signup'
              element={
                !localStorage.getItem('user') ? (
                  <Signup />
                ) : (
                  <Navigate to={'/'} />
                )
              }
            />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/' element={<Home />} />
            <Route path='/collections' element={<Collections />} />
            <Route path='/new' element={<New />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
