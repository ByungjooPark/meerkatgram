import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit의 createSlice 함수 임포트
import { loginThunk, reissueThunk } from "../thunks/authThunk.js";
import { localstorageUtil } from "../../utils/localstorageUtil.js";
import { authUtil } from "../../utils/authUtil.js";


const auth = createSlice({
  name: 'auth',
  initialState: {
    isLogin: authUtil.chkIsLogind(),
    userInfo: null,
  },
  reducers: { // `reducers`는 state의 상태를 변화시키는 actions를 정의하는 영역
    setLogin(state, action) {
      state.isLogin = true;
      state.userInfo = action.payload.user;
      localstorageUtil.setAccessToken(action.payload.accessToken);
    },
    setLogout(state) {
      state.isLogin = false;
      state.userInfo = null;
      localstorageUtil.clearLocalstorage();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLogin = true;
        state.userInfo = action.payload.user;
        localstorageUtil.setAccessToken(action.payload.data.accessToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        alert(action.payload.data.message);
      })
      .addCase(reissueThunk.fulfilled, (state, action) => {
        state.isLogin = true;
        state.userInfo = action.payload.data.data.user;
        localstorageUtil.setAccessToken(action.payload.data.data.accessToken);
      });
  }
});

export const {
  setLogin,
  setLogout,
} = auth.actions;

export default auth.reducer; // 리듀서 내보내기