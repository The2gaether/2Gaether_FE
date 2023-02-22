import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import GiveLove from "../pages/loveList/giveLove/GiveLove";
import GetLove from "../pages/loveList/getLove/GetLove";
import DogSignUp from "../pages/dogSignup/DogSignUp";
import ChattingList from "../pages/chattingList/ChattingList";
import EditUser from "../pages/myPage/MyPage";
import MyDog from "../pages/myDog/MyDog";
import Kakao from "../pages/kakaoLogin/kakao";
import ChatRoom from "../pages/chatting/ChatRoom";
import WelcomePage from "../pages/welcomepage/WelcomePage";
import ChattingDetail from "../pages/chatting/ChattingDetail";
import Address from "../pages/dogSignup/Address";
import DifferentAddress from "../pages/dogSignup/DifferentAddress";
import EditNick from "../pages/myPage/components/eachForm/EditNick";
import EditPsw from "../pages/myPage/components/eachForm/EditPsw";
import AddDog from "../pages/myPage/components/eachForm/AddDog";
import SelectPage from "../pages/selectPage/SelectPage";
<<<<<<< HEAD

=======
import NewAddress from "../pages/dogSignup/NewAddress";
>>>>>>> af6a8d2936a822e3f711c930654306b85f1c0e53
const Router = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  return (
    <BrowserRouter>
      <Routes>
        {!Authorization ? (
          <>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/oauth/callback/kakao" element={<Kakao />} />
            <Route path="/selectpage" element={<SelectPage />} />
            <Route path="/dogSignUp" element={<DogSignUp />} />
            <Route path="/address" element={<Address />} />
<<<<<<< HEAD
            <Route path="/jinAddress" element={<JinAddress />} />
=======
            <Route path="/newaddress" element={<NewAddress />} />
            <Route path="/differntaddress" element={<DifferentAddress />} />
>>>>>>> af6a8d2936a822e3f711c930654306b85f1c0e53
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dogSignUp" element={<DogSignUp />} />
            <Route path="/giveLove" element={<GiveLove />} />
            <Route path="/getLove" element={<GetLove />} />
            <Route path="/chattingList" element={<ChattingList />} />
            <Route path="/chattingdetail" element={<ChattingDetail />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/mypage" element={<EditUser />} />
            <Route path="/mypage/editnick" element={<EditNick />} />
            <Route path="/mypage/editpsw" element={<EditPsw />} />
            <Route path="/mypage/adddog" element={<AddDog />} />
            <Route path="/myDog/:id" element={<MyDog />} />
            <Route path="/address" element={<Address />} />
            <Route path="/differntaddress" element={<DifferentAddress />} />
            <Route path="/newaddress" element={<NewAddress />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
