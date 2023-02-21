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

  // 채팅 엔터키/shif+enter 막기
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
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
              //dispatch(subMessage(receive))를 사용하는 이유는
              //WebSocket을 통해 수신된 채팅 메시지를 Redux store의
              //상태로 업데이트하고, 이를 바탕으로 앱의 뷰를 업데이트하기
              //위함입니다.
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
      <Container>
        <StchatName>
          <button
            fs="30px"
            color="#000"
            bc="transparent"
            onClick={() => {
              navigate("/chatList");
            }}
          />
        </StchatName>

        <div>
          <div>
            <div ref={scrollRef}>
              {messages.map((chating) => (
                <SendMessage>
                  <span>{chating.message}</span>
                </SendMessage>
              ))}
            </div>
          </div>
        </div>

        <Footer>
          <textarea type="text" ref={chatRef} onKeyDown={handleEnterPress} />
          <button onClick={myChat}>전송</button>
        </Footer>
      </Container>
    </>
  );
};

export default ChattingDetail;
const Container = styled.div`
  width: 600px;
  height: 900px;
  border-radius: 10px;
  background-color: #c2c1c1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
`;

const StchatName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px 210px 0px 0px;

  h4 {
    margin: 0px 0px 0px 100px;
  }
`;

const Dou = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 10px;
  h4 {
    margin-top: 10px;
  }
`;

const ReceivedMessage = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
  div {
    display: flex;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 5%;
    margin-top: 5px;
  }
`;

const SendMessage = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: right;
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

const ReceivedMessageBox = styled.div`
  display: inline-block;
  background: #2f80ed;
  color: #f2f2f2;
  max-width: 80%;
  text-align: left;
  padding: 10px;
  margin-right: 20px;
  border-radius: 22px 0px 22px 22px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 5%;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
  margin-top: 673px;
  textarea {
    width: 495px;
    height: 170px;
    border-radius: 10px;
  }
`;
