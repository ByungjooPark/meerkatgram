import { Navigate, Outlet } from "react-router-dom";
import { localstorageUtil } from "../utils/localstorageUtil.js";

function RequiredAuth() {
  const isLogin = localstorageUtil.getAccessToken() ? true : false;
  
  if(!isLogin) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export default RequiredAuth;