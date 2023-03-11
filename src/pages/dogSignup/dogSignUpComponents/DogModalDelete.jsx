import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

function DogModalDelete() {
  const navigate = useNavigate();

  function onsubmitdelete() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
    window.location.reload();
  }
  return (
    <div>
      <St1>고객님의 탈퇴요청이 </St1>
      <St1>정상적으로 접수되었습니다. </St1>
      <St2>투개더는 언제든지 여러분을 기다릴게요.</St2>
      <Garo />
      <St3>
        <St4 onClick={onsubmitdelete}>네 알겠습니다.</St4>
      </St3>
    </div>
  );
}

export default DogModalDelete;

const St1 = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 3px;
`;

const St2 = styled.div`
  margin: 25px 0px 0px 0px;
  font-size: 10px;
  font-weight: 400;
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
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;

const Garo = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: rgba(60, 60, 67, 0.29);
  margin-top: 30px;
  margin-bottom: 13px;
`;
