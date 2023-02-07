import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

function Chatting() {
  // 소켓 연결
  const sock = new SockJS("https://local:3000/wss");
  let subscription;
  const ws = webstomp.over(sock);

  // access-token
  const token = localStorage.getItem("access-token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prevDate = useRef(0);
  // 채팅 내역 리스트
  const listRef = useRef();
  const chatList = useSelector((state) => state.chatting.chatList);

  // 방
  const [room, setRoom] = useState();

  const member = localStorage.getItem("user-info");
  const obj = JSON.parse(member);
  const loginMemberId = obj.memberId;

  const itemId = localStorage.getItem("itemId");
}

export default Chatting;
