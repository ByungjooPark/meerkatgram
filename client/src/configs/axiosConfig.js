import axiosOrigin from 'axios';
import { localstorageUtil } from '../utils/localstorageUtil.js';
import { reissueThunk } from '../store/thunks/authThunk.js';
import { setLogin, setLogout } from '../store/slices/authSlices.js';

let store = null;

export function injectStroe(_store) {
  store = _store;
}

const axios = axiosOrigin.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor
axios.interceptors.request.use(
  config => {
    const token = localstorageUtil.getAccessToken();
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
axios.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;
    if(error.response?.status === 401 && error.response.data.code === 'E05' && !prevRequest?._retry) {
      prevRequest._retry = true;
      
      try {
        const response = await store.dispatch(reissueThunk()).unwrap();

        if(response?.status === 200) {
          store.dispatch(setLogin(response.data));
          prevRequest.Authorization = `Bearer ${response.data.data.accessToken}`;
          return axios(prevRequest);
        } else {
          store.dispatch(setLogout());
          // 여기서 단순히 "리프레시 필요" 신호만 던짐
          throw new Error('재발급 실패');
        }
      } catch(error) {
        return Promise.reject(error); 
      }
    }
    store.dispatch(setLogout());
    return Promise.reject(error);
  }
);

export default axios;