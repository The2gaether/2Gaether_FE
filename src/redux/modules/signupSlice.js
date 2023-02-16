//강아지 정보입력 슬라이스
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  dogInfo: [
    {
      dogName: "",
      dogSex: "",
      imgFile: "",
      dogDetails: "",
    },
  ],
  isLoading: false,
  error: null,
  isLogin: false,
};

//강아지 정보입력 post 요청

<<<<<<< HEAD

=======
>>>>>>> a67ef288ab3f55e329b53669cfbb2e75baed1449
export const __postDog = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    console.log(payload);
    const Authorization = sessionStorage.getItem("accessToken");

    const frm = new FormData();

    Object.values(payload.imgFile).forEach((file) =>
      frm.append("images", file)
    );
    frm.append("dogName", payload.dogName);
    frm.append("dogSex", payload.dogSex);
    /*   frm.append("images", payload.images); */
    frm.append("dogDetails", payload.dogDetails);

    try {
      console.log(Authorization);
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
<<<<<<< HEAD

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

=======
>>>>>>> a67ef288ab3f55e329b53669cfbb2e75baed1449
  }


const dogInfo = createSlice({
  name: "dogInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [__postDog.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__postDog.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      console.log(action.meta.arg);
      state.posts.push(action.payload);
    },
    [__postDog.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default dogInfo.reducer;
