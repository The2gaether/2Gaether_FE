//강아지 정보입력 슬라이스
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  dogInfo: [
    {
      dogName: "",
      dogSex: "",
      images: "",
      dogDetails: "",
    },
  ],
  isLoading: false,
  error: null,
  isLogin: false,
};

//강아지 정보입력 post 요청

export const __postDog = createAsyncThunk("signup", async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const Authorization = sessionStorage.setItem("accessToken");
    const { data } = await axios.post("https://midcon.shop/dogs", payload, {
      //폼데이터로 보내야해서 바꿔줌
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization,
      },
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userList = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__postDog.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },
    [__postDog.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
      alert("가입이 완료 되셨습니다!");
    },
    [__postDog.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post
  },
});
export default userList.reducer;
