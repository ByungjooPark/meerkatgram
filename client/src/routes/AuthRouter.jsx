import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';

function AuthRouter() {
  const isLogin = localStorage.getItem('accessToken') ? true : false;
  try {
    const decoded = jwtDecode(localStorage.getItem('accessToken'));
    const exp = dayjs.unix(decoded.exp).format('YYYY-MM-DD HH:mm:ss')
    console.log(decoded, exp);
    
  } catch(error) {
    console.log(error);
  }
  return (
    <>
      {
        isLogin ? <Outlet /> : <Navigate to='/' />
      }
    </>
  )
}

export default AuthRouter;