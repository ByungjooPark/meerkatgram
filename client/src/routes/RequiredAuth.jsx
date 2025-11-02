import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth() {
  const isLogin = useSelector(state => state.auth.isLogin);

  return (
    <>
      {
        isLogin ? <Outlet /> : <Navigate to='/login' replace />
      }
    </>
  )
}

export default RequiredAuth;