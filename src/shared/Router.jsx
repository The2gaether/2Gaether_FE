import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import GiveLove from "../pages/loveList/giveLove/GiveLove";
import GetLove from "../pages/loveList/getLove/GetLove";
import DogSignUp from "../pages/dogSignup/DogSignUp";
import ChattingList from "../pages/chattingList/ChattingList";
import AddDog from "../pages/addDog/AddDog";
import EditDog from "../pages/editDog/EditDog";
import EditUser from "../pages/editUser/EditUser";
import MyDog from "../pages/myDog/MyDog";
import Kakao from "../pages/kakaoLogin/kakao";
import ChatRoom from "../pages/chatting/ChatRoom";
import WelcomePage from "../pages/welcomepage/WelcomePage";
import ChatWindow from "../pages/chatting/ChatWindow";
import ChattingDetail from "../pages/chatting/ChattingDetail";
import Address from "../pages/dogSignup/Address";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/oauth/callback/kakao" element={<Kakao />} />
        <Route path="/dogSignUp" element={<DogSignUp />} />
        <Route path="/giveLove" element={<GiveLove />} />
        <Route path="/getLove" element={<GetLove />} />
        <Route path="/chattingList" element={<ChattingList />} />
        <Route path="/chattingdetail" element={<ChattingDetail />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/chatwindow" element={<ChatWindow />} />
        {/* <Route path="/addDog" element={<AddDog />} /> */}
        {/* <Route path="/editDog" element={<EditDog />} /> */}
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/myDog/:id" element={<MyDog />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
