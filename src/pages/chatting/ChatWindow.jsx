import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessages,
  sendMessage,
} from "../../redux/modules/chatWindowSlice";
import styled from "styled-components";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatWindow = () => {
  const { messages, isLoading, error } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    dispatch(fetchMessages());

    // Connect to the websocket
    const socket = new SockJS("/ws");
    const client = Stomp.over(socket);
    setStompClient(client);
    client.connect({}, (frame) => {
      console.log(`Connected: ${frame}`);
      client.subscribe("/topic/public", (message) => {
        const newMessage = JSON.parse(message.body);
        dispatch(sendMessage({ message: newMessage }));
      });
    });

    return () => {
      client.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = (message) => {
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({ message }));
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
