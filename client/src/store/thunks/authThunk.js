import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../configs/axiosConfig.js";

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (ars, thunkAPI) => {
    const { email, password } = ars;
    try {
      const data = JSON.stringify({email, password});
      const url = '/auth/login';
      const response = await axios.post(url, data);
  
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);