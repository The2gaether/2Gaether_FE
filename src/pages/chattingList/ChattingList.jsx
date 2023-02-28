import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getChatList } from "../../redux/modules/chatListSlice";
import { useNavigate } from "react-router";
import Layout from "../../components/Layout";
import StartLayout from "../../components/StartLayout";
const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chatList.chatList);
  console.log(12345, chatList);

  useEffect(() => {
    dispatch(__getChatList());
  }, []);

  return (
    <StartLayout>
      <div>
        {chatList?.map((list) => (
          <div>
            <div
              key={list.roomId}
              onClick={() => {
                navigate(`/chattingdetail/${list.roomId}`);
              }}
            >
              <div>
                <div>{list.nickname1}님과의 대화방</div>
                <div>{list.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StartLayout>
  );
};

export default ChatList;
