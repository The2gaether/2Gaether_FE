import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessages,
  sendMessage,
} from "../../redux/modules/chatWindowSlice";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { __postChatopenThunk } from "../../redux/modules/chattingSlice";

const ChatWindow = () => {
  // Redux 스토어에서 메시지, isLoading 및 오류 값을 가져옵니다
  const { messages, isLoading, error } = useSelector((state) => state.messages);
  console.log(messages);
  // Redux 스토어에서 디스패치 기능 가져오기
  const dispatch = useDispatch();
  // stompClient 상태를 null로 초기화합니다
  const [stompClient, setStompClient] = useState(null);
  // 구성 요소가 마운트될 때 웹 소켓 연결을 초기화하고 항목을 구독합니다
  useEffect(() => {
    dispatch(fetchMessages());

    // 웹 소켓에 연결
    const socket = new SockJS("https://midcon.shop/ws-stomp");
    const client = Stomp.over(socket);
    setStompClient(client);
    client.connect({}, (roomid) => {
      console.log(`Connected: ${roomid}`);
      // 공개 주제를 구독하고 메시지 수신
      client.subscribe(`/sub/chat/room/${roomid}`, (message) => {
        // 메시지를 보낼 작업 발송
        const newMessage = JSON.parse(message.body);
        // 메시지를 보낼 작업 발송
        dispatch(sendMessage({ message: newMessage }));
      });
    });
    // 클라이언트의 연결을 끊는 정리 기능을 반환
    return () => {
      client.disconnect();
    };
  }, [dispatch]);
  // 서버에 메시지를 보내는 기능
  const handleSendMessage = (message) => {
    stompClient.send(`/pub/chat/message`, {}, JSON.stringify({ message }));
  };

  return (
    <StyledChatWindow>
      {error && <p>Error: {error.message}</p>}
      <Header>
        <Title>Chat Room</Title>
      </Header>
      <ChatHistory>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <MessageList>
            {messages.map((message) => (
              <Message key={message.id}>{message.text}</Message>
            ))}
          </MessageList>
        )}
      </ChatHistory>
      <ChatInput>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input type="text" placeholder="Enter your message" />
          <button onClick={handleSendMessage}>Send</button>
        </form>
      </ChatInput>
    </StyledChatWindow>
  );
};

export default ChatWindow;

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
