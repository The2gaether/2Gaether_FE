import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";

function Chatting() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  // 소켓 연결
  const socket = new SockJS("https://jossiya.shop/ws-stomp");
  const client = Stomp.over(socket);

  //토큰 얻어오기
  const headers = {
    Authorization: localStorage.getItem("authorization"),
    "Refresh-Token": localStorage.getItem("refresh-Token"),
  };
  useEffect(() => {
    // 소켓 연결
    console.log(chatcollect.chatRoomId);
    if (chatcollect.chatRoomId) {
      console.log(chatcollect.chatRoomId);
      try {
        client.connect(
          {},
          () => {
            console.log(chatcollect.chatRoomId);
            // 채팅방 구독
            client.subscribe(`/sub/chats/${chatcollect.chatRoomId}`, (res) => {
              console.log(res.body);
              const receive = JSON.parse(res.body);
              console.log(receive);
              dispatch(subMessage(receive));
            });
          },
          {}
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [chatcollect]);

  //메시지 보내기
  const sendMessage = () => {
    client.send(
      "/pub/chat/message",
      headers,
      JSON.stringify({
        type: "TALK",
        memberId: users.memberId,
        roomId: id,
        name: room[0]?.name,
        message: message,
        sender: users.nickName,
        createdAt: createdAt,
      })
    );
    setMessage("");
  };
}

export default Chatting;
