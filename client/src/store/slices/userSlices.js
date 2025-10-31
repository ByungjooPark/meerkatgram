import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit의 createSlice 함수 임포트
import { loginThunk } from "../thunks/authThunk.js";
import { localstorageUtil } from "../../utils/localstorageUtil.js";


const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
  },
  reducers: { // `reducers`는 state의 상태를 변화시키는 actions를 정의하는 영역

  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload.data.user;
        localstorageUtil.setAccessToken(action.payload.data.accessToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        alert(action.payload.data.message);
      });
  }
});

// export const { } = user.actions;
export default user.reducer; // 리듀서 내보내기