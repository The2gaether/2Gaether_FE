import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { click } from "@testing-library/user-event/dist/click";
import axios from "axios";

const initialState = {
  userList: [
    {
      // 현재 어떤걸 받을지 모름???????,
    },
  ],
  isLoading: false,
  error: null,
  isLogin: true,
};
// //로그아웃 시키기

// export const __logoutUser = createAsyncThunk(
//   "logout",
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await axios.post("/users/logout", payload, {
//         withCredentials: true,
//       });
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       console.log(error);
//     }
//     return thunkAPI.rejectWithValue();
//   }
// );
//로그인 POST요청

export const __postLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("서버 주소 넣기", payload);

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
//회원가입 post 요청
export const __postUser = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await axios.post("서버열리면 주소/users/join", payload);
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

    // [__logoutUser.pending]: (state) => {
    //   //보내는 도중, 진행중
    //   state.isLoading = true;
    // },
    // [__logoutUser.fulfilled]: (state, action) => {
    //   //연결후
    //   state.isLoading = false;
    // },
    // [__logoutUser.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});
export default userList.reducer;
