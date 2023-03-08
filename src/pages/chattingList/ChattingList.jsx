import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getChatList } from "../../redux/modules/chatListSlice";
import { useNavigate, useParams } from "react-router";
import Layout from "../../components/Layout";
import styled from "styled-components";
const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chatList.chatList);

  useEffect(() => {
    dispatch(__getChatList());
  }, []);

  return (
    <Layout title="채팅 리스트">
      <StWrDiv>
        상대방이 부적절한 메시지를 전송하는 경우
        <br />
        아랫쪽 신고 버튼을 이용해주세요.
      </StWrDiv>
      {chatList?.map((list, index) => (
        <div key={list.roomId}>
          <div
            onClick={() => {
              navigate(`/chattingdetail/${list.roomId}`);
            }}
          >
            <StDiv
              isGray={index % 2 === 1}
              isLast={index === chatList.length - 1}
            >
              <StMsDiv>
                <StImg src={list?.dogImageUrl}></StImg> {list?.nickname}
              </StMsDiv>
            </StDiv>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default ChatList;

const StWrDiv = styled.div`
  width: 374px;
  height: 50px;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  display: flex;
  align-items: center;
  color: #868686;
  justify-content: center;
  background: #f2f2f2;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0px 22px 20px;
  gap: 10px;
  background: ${(props) => (props.isGray ? "#dbdbdb" : "#ffffff")};
  width: 355px;
  height: 40px;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #dbdbdb")};
`;

const StMsDiv = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  padding: 0px;
  gap: 19px;
  width: 310px;
  height: 48px;
`;
const StImg = styled.img`
  display: flex;
  position: relative;
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;
