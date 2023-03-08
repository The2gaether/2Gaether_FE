import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { subMessage } from "../../redux/modules/socketSlice";
import Stomp from "stompjs";
import {
  __getChatListThunk,
  __postChatopenThunk,
} from "../../redux/modules/chattingSlice";
import Layout from "../../components/Layout";
import ArrowIcon from "../../assets/svg/ArrowIcon.svg";

const ChattingDetail = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  //이전채팅 불러오기 및 채팅필요데이터
  useEffect(() => {
    dispatch(__getChatListThunk(roomId));
  }, [roomId]);

  const chatRef = useRef("");

  // 소켓 백엔드 서버가져오기

  const socket = new SockJS(`${process.env.REACT_APP_DOG}/ws-stomp`);
  const client = Stomp.over(socket);

  //토큰 얻어오기
  const headers = {
    Authorization: sessionStorage.getItem("accessToken"),
  };

  const { chatcollect } = useSelector((state) => state.chatcollect);
  const Myname = chatcollect[0]?.informDto?.nickname;
  const MyEmail = chatcollect[0]?.informDto?.email;
  const { messages } = useSelector((state) => state.messages);

  // 채팅 엔터키/shif+enter 막기

  useEffect(() => {
    let subscription;

    // 소켓 연결
    const socket = new SockJS(`${process.env.REACT_APP_DOG}/ws-stomp`);
    const client = Stomp.over(socket);

    const headers = {
      Authorization: sessionStorage.getItem("accessToken"),
    };
    try {
      client.connect({}, () => {
        // 채팅방 구독
        subscription = client.subscribe(`/sub/chat/rooms/${roomId}`, (res) => {
          const receive = JSON.parse(res.body);
          dispatch(subMessage(receive));
        });
      });
    } catch (e) {}

    return () => {
      // 소켓 연결 종료 및 구독해제
      if (subscription) {
        subscription.unsubscribe();
      }
      client.disconnect(() => {
        console.log(`Disconnected from WebSocket for room ${roomId}`);
      });
    };
  }, [roomId]);

  //메시지 보내기
  //여기에 있는 값을 모아야합니다 / 정기
  const myChat = () => {
    const message = chatRef.current.value;
    if (message === "") {
      return;
    }
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        roomId: roomId,
        sender: MyEmail, // 보내는 사용자의 이름 설정
        message: message,
      })
    );
    chatRef.current.value = "";
  };

  const scrollRef = useRef();

  useEffect(() => {
    // 메시지 초기화시 스크롤 이동
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <Layout title={chatcollect[0]?.informDto?.opponentNickname}>
      <StyledChatWindow>
        <Header />
        <div>
          <BeforeChatHistory>
            {chatcollect[0]?.chats?.map((list, index) =>
              list.userNickname === Myname ? (
                <div key={index}>
                  <MessageList
                    messageLength={list.message.length}
                    isMine={true} // 내가 보내는 메시지
                  >
                    <span>{list?.message}</span>
                  </MessageList>
                </div>
              ) : (
                <ReceivedMessage>
                  <StH4>{list?.userNickname}님</StH4>
                  <MessageList
                    messageLength={list.message.length}
                    isMine={false} // 상대방이 보내는 메시지
                  >
                    <span>{list?.message}</span>
                  </MessageList>
                </ReceivedMessage>
              )
            )}
          </BeforeChatHistory>
          <ChatHistory>
            {roomId && (
              <div ref={scrollRef}>
                {messages
                  .filter((message) => message.roomId === roomId) // 해당 방의 메시지만 필터링
                  .map((message) => {
                    if (message.roomId === roomId) {
                      // roomId와 메시지의 roomId가 일치하는 경우에만 메시지 렌더링
                      return message.userNickname === Myname ? (
                        <MessageList
                          key={message.id}
                          messageLength={message.message.length}
                          isMine={true} // 내가 보내는 메시지
                        >
                          <span>{message.message}</span>
                        </MessageList>
                      ) : (
                        <ReceivedMessages key={message.id}>
                          <StH4>{message.userNickname}님</StH4>
                          <MessageList
                            messageLength={message.message.length}
                            isMine={false} // 상대방이 보내는 메시지
                          >
                            <span>{message.message}</span>
                          </MessageList>
                        </ReceivedMessages>
                      );
                    }
                    return null;
                  })}
                <div ref={scrollRef} />
              </div>
            )}
          </ChatHistory>
        </div>
      </StyledChatWindow>
      <StDiv>
        <ChatInput>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="200글자 이내로 작성해주세요"
              type="text"
              ref={chatRef}
            />
            <StButton onClick={myChat}>전송</StButton>
          </form>
        </ChatInput>
      </StDiv>
    </Layout>
  );
};

export default ChattingDetail;

const StyledChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  max-width: 365px;
  height: calc(100% - 80px); // 변경된 부분
  margin-left: 10px;
  position: relative;

  //스크롤 없애기
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const StH4 = styled.div`
  font-size: 12px;
`;

const MessageList = styled.div`
  margin: 5px 0;
  padding: 8px;
  font-size: 12px;
  border-radius: 10px;
  word-break: break-all;
  display: flex;
  text-align: left;
  max-width: 160px;

  width: fit-content;
  /* 내가 보내는 메시지 스타일 */
  ${({ isMine }) =>
    isMine
      ? `
      align-self: flex-end;
      background-color: #2F58AC;
      color: #D9D9D9;
      margin-left: auto;
    `
      : `
      /* 상대방이 보내는 메시지 스타일 */
      align-self: flex-start;
      background-color: #D9D9D9;
      color: black;
      margin-right: auto;
    `}
`;
const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ChatHistory = styled.div`
  display: flex;
  width: 97%;
  flex-direction: column-reverse;
  margin-right: 50px;
`;

const Input = styled.input`
  font-size: 12px;
  padding: 10px;
  width: 210px;
  height: 8px;
  border-radius: 20px;
  border: 1px solid #333;
  transition: height 0.2s;
  margin: 12px 25px 12px 35px;
  &::placeholder {
    font-size: 8px;
    padding-left: 3px;
  }
`;

const ReceivedMessage = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  div {
    display: flex;
  }
`;

const ReceivedMessages = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  text-align: left;
  div {
    display: flex;
  }
`;

const BeforeChatHistory = styled.div`
  display: flex;
  width: 300px;
  height: 160px;
  flex-direction: column;
  padding: 10px;
  height: calc(100% - 1.2%); // 변경된 부분
`;
const StDiv = styled.div`
  width: 370px;
  margin-right: 20px;
  background-color: #e9e9e9;
  padding-right: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 478%);
`;
const StButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 13px;
  padding-bottom: 3px;
  margin-top: 5px;
  background-color: #2f58ac;
  color: white;
`;
