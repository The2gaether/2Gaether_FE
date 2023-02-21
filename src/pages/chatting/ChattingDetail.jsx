import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { subMessage } from "../../redux/modules/socketSlice";
import Stomp from "stompjs";
import { __postChatopenThunk } from "../../redux/modules/chattingSlice";

const ChattingDetail = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const myEmail = sessionStorage.getItem("userEmail");
  const Myname = sessionStorage.getItem("userNickname");
  const chatRef = useRef("");

  // 소켓 백엔드 서버가져오기
  const socket = new SockJS("https://midcon.shop/ws-stomp");
  const client = Stomp.over(socket);

  //토큰 얻어오기
  const headers = {
    Authorization: sessionStorage.getItem("authorization"),
  };

  const { chatcollect } = useSelector((state) => state.chatcollect);
  console.log(chatcollect);
  const { messages } = useSelector((state) => state.messages);

  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault(); // Enter 키 동작 막기
      window.scrollTo(0, 0);
      // sendMessage();
    }
  };

  useEffect(() => {
    dispatch(__postChatopenThunk({}));
  }, []);

  useEffect(() => {
    // 소켓 연결
    console.log(chatcollect.roomId);
    if (chatcollect.roomId) {
      console.log(chatcollect.roomId);
      try {
        client.connect(
          {},
          () => {
            console.log(chatcollect.roomId);
            // 채팅방 구독
            client.subscribe(`/sub/chat/room/${chatcollect.roomId}`, (res) => {
              console.log(res.body);
              const receive = JSON.parse(res.body);
              console.log(123456, receive);
              dispatch(subMessage(receive));
              /* 
               여기서 dispatch(subMessage(receive))는 Redux store의 messages state를 
               업데이트하기 위한 action을 dispatch 하는 것입니다. 
               subMessage는 socketSlice.js에서 생성된 Redux slice의 action creator입니다.
               이 코드에서는 Stomp을 사용하여 WebSocket을 통해 메시지를 주고받는 채팅 기능을 
               구현하고 있습니다. 
               메시지를 받으면, subMessage 액션을 dispatch하여 messages state를 업데이트합니다. 
               이후, messages state를 이용하여 UI를 업데이트합니다.

               Redux store를 사용하면, state 관리를 중앙에서 처리할 수 있으며, 여러 컴포넌트에서 
               동일한 state를 공유할 수 있습니다. 이를 통해 코드의 유지보수성과 확장성을 향상시킬 
               수 있습니다.

               따라서 dispatch(subMessage(receive))를 통해 Redux store의 messages state를 
               업데이트하고, 이를 이용하여 UI를 업데이트하는 것이 이 코드에서 선택된 방법입니다. */
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
  const myChat = () => {
    const message = chatRef.current.value;
    if (message === "") {
      return;
    }
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        type: "TALK",
        roomId: chatcollect.roomId,
        sender: chatcollect.roomId,
        message: message,
      })
    );
    chatRef.current.value = null;
  };
  console.log(9999, messages);

  const scrollRef = useRef();
  console.log(scrollRef);
  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [messages]);
  console.log(987654, messages);

  return (
    <>
      <StyledChatWindow>
        <div>
          <button
            fs="30px"
            color="#000"
            bc="transparent"
            onClick={() => {
              navigate("/chatList");
            }}
          />
        </div>
        <Header>
          <Title>Chat Room</Title>
        </Header>

        <ChatHistory>
          <div ref={scrollRef}>
            {messages.map((chating) => (
              <MessageList>
                <span>{chating.message}</span>
              </MessageList>
            ))}
          </div>
        </ChatHistory>

        <ChatInput>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input type="text" ref={chatRef} onKeyDown={handleEnterPress} />
            <button onClick={myChat}>전송</button>
          </form>
        </ChatInput>
      </StyledChatWindow>
    </>
  );
};

export default ChattingDetail;

const StyledChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
  border-radius: 10px;
  width: 500px;
  height: 500px;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  overflow-y: auto;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #333;
  margin-right: 10px;
`;
const Message = styled.li`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;
