import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function IsLogind() {
  const isLogin = useSelector(state => state.auth.isLogin);
  
  return (
    <>
      {
        !isLogin ? <Outlet /> : <Navigate to='/' replace />
      }
    </>
  )
}

export default IsLogind;