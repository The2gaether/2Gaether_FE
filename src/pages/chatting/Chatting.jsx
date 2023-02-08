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
}

export default Chatting;
