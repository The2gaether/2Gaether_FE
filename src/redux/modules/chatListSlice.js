import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// isLoading은 서버에서 todos를 가져오는 상태를 나타내는 값, 기본은 false , 통신중은 true , error는 에러발생시 나타내는 값
const initialState = {
  chatList: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

//채팅룸 목록 보기

export const __getChatList = createAsyncThunk(
  "getChatList",
  async (_, thunkAPI) => {
    try {
      const Authorization = sessionStorage.getItem("accessToken"); // 세션 스토리지에서 토큰 가져오기
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOG}/chat/rooms`,
        {
          headers: {
            Authorization,
          },
        }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {},
  // extraReducers 추가하기
  extraReducers: {
    // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    [__getChatList.pending]: (state) => {
      state.isLoading = true;
    },
    // 네트워크 요청 끝났을 때, false로 변경
    //state.chatList 이부분이 유저 셀렉터로 가져올거
    [__getChatList.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.chatList = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    // 에러발생! 네트워크 요청 끝났으니 false
    [__getChatList.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const {} = chatListSlice.actions;
export default chatListSlice.reducer;
