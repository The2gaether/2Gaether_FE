import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

function DogModalDelete() {
  const navigate = useNavigate();

  function onsubmitdelete() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <Wrapper>
      <St1>고객님의 탈퇴요청이 정상적으로 접수되었습니다.</St1>
      <br></br>
      <St2>투개더는 언제든지 여러분을 기다릴게요.</St2>
      <Separator>
        <div></div>
      </Separator>
      <St3>
        <St4 onClick={onsubmitdelete}>네 알겠습니다.</St4>
      </St3>
    </Wrapper>
  );
}

export default DogModalDelete;

const St1 = styled.div`
  font-size: 16px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const St2 = styled.div`
  margin: 5px 0px 5px 0px;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const Separator = styled.div`
  width: 100%;
  margin: 1px 0px 13px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(100, 99, 99);
  }
`;

const St3 = styled.div`
  color: #2f58ac;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const St4 = styled.div`
  color: #2f58ac;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div``;
