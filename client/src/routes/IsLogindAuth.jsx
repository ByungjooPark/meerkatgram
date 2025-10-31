import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import { localstorageUtil } from "../utils/localstorageUtil.js";

function IsLogind() {
  const isLogin = localstorageUtil.getAccessToken() ? true : false;
  
  try {
    const decoded = jwtDecode(localStorage.getItem('accessToken'));
    const exp = dayjs.unix(decoded.exp).format('YYYY-MM-DD HH:mm:ss')
    console.log(decoded, exp);
    
  } catch(error) {
    console.log(error);
  }
  
  if(isLogin) {
    return <Navigate to='/posts' replace />;
  }

  return <Outlet />;
}

export default IsLogind;