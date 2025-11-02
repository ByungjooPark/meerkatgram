import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../configs/axiosConfig.js";

export const postIndex = createAsyncThunk(
  'post/postIndex',
  async (ars, thunkAPI) => {
    try {
      // const data = JSON.stringify({email, password});
      const url = '/posts';
      const response = await axios.get(url);
  
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);