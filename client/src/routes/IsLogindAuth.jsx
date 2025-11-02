import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function IsLogind() {
  const location = useLocation();
  const isLogin = useSelector(state => state.auth.isLogin);

  return (
    <>
      {
        isLogin ? <Navigate to={location.pathname} replace /> : <Outlet />
      }
    </>
  )
}

export default IsLogind;