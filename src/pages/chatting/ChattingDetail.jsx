import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { subMessage } from "../../redux/modules/socketSlice";
import Stomp from "stompjs";

const ChattingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const myEmail = localStorage.getItem("userEmail");
  const Myname = localStorage.getItem("userNickname");
  const chatRef = useRef("");

  // 소켓 백엔드 서버가져오기
  const socket = new SockJS("https://midcon.shop/ws-stomp");
  const client = Stomp.over(socket);

  //토큰 얻어오기
  const headers = {
    Authorization: localStorage.getItem("authorization"),
    "Refresh-Token": localStorage.getItem("refresh-Token"),
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
  const myChat = () => {
    const message = chatRef.current.value;
    if (message === "") {
      return;
    }
    client.send(
      "/pub/chat/message",
      headers,
      JSON.stringify({
        type: "TALK",
        chatRoomId: chatcollect.chatRoomId,
        userEmail: myEmail,
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
              {Myname &&
                messages.map((chating) =>
                  chating.userNickname === Myname ? (
                    <SendMessage>
                      <div>
                        <span>{chating.message}</span>
                        {/*      <img
                          src={process.env.PUBLIC_URL + "/basic.png"}
                          alt="로고"
                        /> */}
                      </div>
                    </SendMessage>
                  ) : (
                    <ReceivedMessage>
                      <div>
                        {/*         <img
                          src={process.env.PUBLIC_URL + "/basic.png"}
                          alt="로고"
                        /> */}
                        <Dou>
                          <h4>{chating.userNickname}님</h4>
                          <span>{chating.message}</span>
                        </Dou>
                      </div>
                    </ReceivedMessage>
                  )
                )}
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

  img {
    width: 50px;
    height: 50px;
    border-radius: 5%;
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
