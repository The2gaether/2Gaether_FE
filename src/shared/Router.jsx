import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import GiveLove from "../pages/giveLove/GiveLove";
import GetLove from "../pages/getLove/GetLove";
import DogSignUp from "../pages/dogSignup/DogSignUp";
import ChattingList from "../pages/chattingList/ChattingList";
import Chatting from "../pages/chatting/Chatting";
import AddDog from "../pages/addDog/AddDog";
import EditDog from "../pages/editDog/EditDog";
import EditUser from "../pages/editUser/EditUser";
import MyDog from "../pages/myDog/MyDog";
import Kakao from "../pages/kakaoLogin/kakao";
import KakaoLogin from "../pages/kakaoLogin/Kakaologin";
import ChatRoom from "../pages/chatting/ChatRoom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/kakaologin" element={<KakaoLogin />} />
        <Route path="/oauth/callback/kakao" element={<Kakao />} />
        <Route path="/dogSignUp" element={<DogSignUp />} />
        <Route path="/giveLove" element={<GiveLove />} />
        <Route path="/getLove" element={<GetLove />} />
        <Route path="/chattingList" element={<ChattingList />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/addDog" element={<AddDog />} />
        <Route path="/editDog" element={<EditDog />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/myDog" element={<MyDog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
