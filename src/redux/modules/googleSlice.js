import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  googleList: {},
  isLoading: false,
  error: null,
  isLogin: false,
};

//구글 로그인 POST요청
export const __googleLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios
        .post(`${process.env.REACT_APP_DOG}/login/oauth/google`, payload, {
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

const googleList = createSlice({
  name: "googleList",
  initialState,
  reducers: {},
  extraReducers: {
    [__googleLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__googleLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
  },
});

export default googleList.reducer;
