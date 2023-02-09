import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  userList: [
    {
      email: "",
      password: "",
      username: "",
    },
  ],
  isLoading: false,
  error: null,
  isLogin: false,
};

//로그인 POST요청

export const __postLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("https://midcon.shop/users/login", payload);

      sessionStorage.setItem("access_token", res.headers.authorization);
      // sessionStorage.setItem("refresh_token", res.headers.authorization);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      console.log(error);
      if (400 < error.status < 500) {
        alert(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//강아지 정보입력 post 요청

export const __postUser = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await axios.post(
        "https://midcon.shop/users/signup",
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userList = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__postUser.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },
    [__postUser.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
      alert("가입이 완료 되셨습니다!");
    },
    [__postUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post

    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
  },
});
export default userList.reducer;
