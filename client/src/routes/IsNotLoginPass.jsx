import { Navigate, Outlet } from "react-router-dom";

function IsNotLoginPass() {
  const isLogin = localStorage.getItem('accessToken') ? true : false;
  
  return (
    <>
      {
        isLogin ? <Navigate to='/posts' /> : <Outlet />
      }
    </>
  )
}

export default IsNotLoginPass;