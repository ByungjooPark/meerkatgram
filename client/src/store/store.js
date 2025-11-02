import { configureStore } from '@reduxjs/toolkit'; // Redux Toolkit의 configureStore 함수 임포트
import authReduser from './slices/authSlices.js';
import postReduser from './slices/postSlices.js';

// Redux Store 생성 및 설정
export default configureStore({
  reducer: {
    auth: authReduser,
    post: postReduser,
  },
});