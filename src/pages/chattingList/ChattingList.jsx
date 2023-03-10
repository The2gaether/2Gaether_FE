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
        <div style={{ fontSize: "12px", fontWeight: 400 }}>
          매칭된 상대방과 함께
        </div>
        <div style={{ fontSize: "12px", fontWeight: 700 }}>
          채팅방에서 이야기를 나누어 보세요 !
        </div>
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
                <StImg src={list?.dogImageUrl}></StImg>
                <StMsDivs>
                  <StNick>{list?.nickname}</StNick>
                  <StMsg>
                    {list?.message.length > 15
                      ? list?.message.slice(0, 15) + "..."
                      : list?.message}
                  </StMsg>
                </StMsDivs>
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
  justify-content: center;
  flex-direction: column;
  color: white;
  background: #172c56;
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
  width: 310px;
  height: 48px;
`;
const StImg = styled.img`
  display: flex;
  position: relative;
  background-size: cover;

  background-position: center;
  width: 55px;
  height: 50px;
  border-radius: 100%;
`;
const StNick = styled.div`
  width: 150px;
  height: 25px;
  font-weight: 700;
  font-size: 12px;
  margin-left: 19px;
`;
const StMsDivs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 310px;
  height: 48px;
`;
const StMsg = styled.div`
  max-height: 30px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: left;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 19px;
`;
