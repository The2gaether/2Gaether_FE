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
export const __kakaoLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios
        .post(`http://34.227.111.137/login/oauth/kakao`, payload, {
          withCredentials: true,
        })

        .then((res) => {
          const Authorization = res.headers.authorization;
          sessionStorage.setItem("accessToken", Authorization);
          return res;
        });

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const kakaoList = createSlice({
  name: "kakaoList",
  initialState,
  reducers: {},
  extraReducers: {
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.iskakaoLogin = true;
    },
  },
});

export default kakaoList.reducer;
