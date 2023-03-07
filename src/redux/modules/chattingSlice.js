import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chatcollect: [{}],
  error: null,
  isLoading: false,
};

const config = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

// 채팅방 생성 post
export const __postChatopenThunk = createAsyncThunk(
  "CHAT_OPEN",
  async (payload, thunkAPI) => {
    try {
      const Request = await axios.post(
        `${process.env.REACT_APP_DOG}/chat/rooms`
      );
      return thunkAPI.fulfillWithValue(Request.data);
    } catch (e) {
      return;
    }
  }
);

// 전체 채팅 GET요청
export const __getChatListThunk = createAsyncThunk(
  "GET_CHATS",
  async (roomId, thunkAPI) => {
    try {
      const Authorization = sessionStorage.getItem("accessToken"); // 세션 스토리지에서 토큰 가져오기
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOG}/chat/rooms/${roomId}`,
        //`${process.env.REACT_APP_DOGS}/chat/rooms/${roomId}`,

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

// 채팅리스트에서 채팅방 삭제요청
export const __removeChatListThunk = createAsyncThunk(
  "REMOVE_CHAT",
  async (payload, thunkAPI) => {
    try {
      const chatRoomId = payload;

      const Request = axios.delete(`/chats/${chatRoomId}`, config);
      if (Request.status === 200) {
        thunkAPI.dispatch(__getChatListThunk());
      }
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatcollect",
  initialState,
  reducers: {},
  extraReducers: {
    [__postChatopenThunk.fulfilled]: (state, action) => {
      state.chatcollect = action.payload;
    },
    [__getChatListThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chatcollect = [action.payload];
    },
    [__getChatListThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getChatListThunk.pending]: (state) => {
      state.isLoading = true;
    },
    // [__removeChatListThunk.fulfilled]: (state, action) => {
    //   const target = state.chatcollect.findIndex(
    //     (chatcollect) => chatcollect.friendNickname === action.payload
    //   );
    //   state.chatcollect.splice(target, 1);
    // },
  },
});
export default chatSlice.reducer;
