import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit의 createSlice 함수 임포트
import { postIndex } from "../thunks/postThunk.js";


const post = createSlice({
  name: 'post',
  initialState: {
    index: null,
  },
  reducers: { // `reducers`는 state의 상태를 변화시키는 actions를 정의하는 영역

  },
  extraReducers: builder => {
    builder
      .addCase(postIndex.fulfilled, (state, action) => {
        state.index = action.payload.data;
        console.log(action.payload);
      })
      .addCase(postIndex.rejected, (state, action) => {
        console.log('rejected post slice index', action.payload.data);
      });
  }
});

// export const { } = post.actions;
export default post.reducer; // 리듀서 내보내기