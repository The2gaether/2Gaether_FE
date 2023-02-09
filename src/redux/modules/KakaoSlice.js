import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  kakaoList: {},
  isLoading: false,
  error: null,
  isLogin: false,
};

//로그인 POST요청
export const __postLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios
        .post(`http://localhost:3001/profile`, payload, {
          withCredentials: true,
        })

        .then((res) => {
          const accessToken = res.headers.authorization;
          localStorage.setItem("accessToken", accessToken);
          return res;
        });
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      if (400 < error.status < 500) {
        alert(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const kakaoList = createSlice({
  name: "kakaoList",
  initialState,
  reducers: {},
  extraReducers: {
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
  },
});

export default kakaoList.reducer;