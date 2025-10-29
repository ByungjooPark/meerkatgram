import { Navigate, Outlet } from "react-router-dom";

function AuthRouter() {
  const isLogin = localStorage.getItem('accessToken') ? true : false;
  return (
    <>
      {
        isLogin ? <Outlet /> : <Navigate to='/' />
      }
    </>
  )
}

export default AuthRouter;