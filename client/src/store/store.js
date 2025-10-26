import { configureStore } from '@reduxjs/toolkit'; // Redux Toolkit의 configureStore 함수 임포트
import userReduser from './slices/userSlices.js';

// Redux Store 생성 및 설정
export default configureStore({
  reducer: {
    user: userReduser,
  },
});