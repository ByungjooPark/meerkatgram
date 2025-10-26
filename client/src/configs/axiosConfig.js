import axiosOrigin from 'axios';

const axios = axiosOrigin.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axios;