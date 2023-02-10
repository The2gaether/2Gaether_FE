import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ChatWindow = () => {
  // State variables to store the messages and the message input
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // State variable to store the Stomp client
  const [client, setClient] = useState(null);

  // Connect to the WebSocket server when the component is mounted
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    setClient(stompClient);
  }, []);

  // Subscribe to the chat topic when the Stomp client is connected
  useEffect(() => {
    if (client) {
      client.connect({}, () => {
        client.subscribe("/topic/chat", (message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
        });
      });
    }
  }, [client]);

  // Handle the message input change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle the send button click
  const handleSendClick = () => {
    client.send("/app/chat", {}, JSON.stringify({ message }));
    setMessage("");
  };

  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
