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
      const res = await axios.post(
        `${process.env.REACT_APP_DOG}/users/login`,
        payload
      );

      sessionStorage.setItem("accessToken", res.headers.authorization);

      return thunkAPI.fulfillWithValue();
    } catch (error) {
      if (400 < error.status < 500) {
        alert(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//회원가입 post 요청

export const __postUser = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DOG}/users/signup`,
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      if (400 < error.status < 500) {
        alert(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//이메일 중복체크
export const __checkId = createAsyncThunk(
  "account/checkId",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DOG}/users/dupcheck`,
        payload,
        {
          withCredentials: true,
        }
      );

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      if (400 < error.status < 500) {
        alert(error.response.data.message);
      }
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
      state.isCertification = true;
    },
    [__postUser.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
    },
    [__postUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post

    [__checkId.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },

    [__checkId.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
      state.isCheck = true;
    },
    [__checkId.rejected]: (state, action) => {
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
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default userList.reducer;
