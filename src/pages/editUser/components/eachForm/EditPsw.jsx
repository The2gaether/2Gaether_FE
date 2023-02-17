import axios from "axios";
import React, { useState } from "react";
import MainHeader from "../../../../shared/MainHeader";
import styled from "styled-components";
import { borderBottom, color } from "@mui/system";

const EditNick = ({ Authorization }) => {
  const [data, setData] = useState("");

  const onSubmitHadler = async () => {
    await axios.patch(`${process.env.REACT_APP_DOG}/dogs`, data, {
      headers: {
        Authorization,
      },
    });
  };

  const onDeleteUserHandler = () => {};

  return (
    <>
      <MainHeader />
      <Container>
        <StForm onSubmit={onSubmitHadler()}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>비밀번호 변경</div>
          <StInput
            placeholder="현재 비밀번호를 입력해주세요"
            required
            onChange={(e) => {
              setData(e);
            }}
          />
          <Space />
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>새 비밀번호</div>
          <StInput
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요"
            required
            onChange={(e) => {
              setData(e);
            }}
          />
          <br />
          <StInput
            placeholder="비밀번호를 재입력해주세요"
            required
            onChange={(e) => {
              setData(e);
            }}
          />
          <Space />
          <StButton>변경하기</StButton>
        </StForm>
        <Space />
        <Space />
        <UnderLine />
        <Space />
        <StDeleteUser onClick={() => onDeleteUserHandler()}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>회원탈퇴</div>
          <br />
          <div style={{ fontSize: "15px", color: "#c6c6c6" }}>
            개인정보 및 설정이 모두 삭제됩니다.
          </div>
        </StDeleteUser>
      </Container>
    </>
  );
};

export default EditNick;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StInput = styled.input`
  margin-top: 20px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  width: 300px;
`;

const StButton = styled.button`
  border-radius: 20px 20px 20px 20px;
  border-style: none;
  width: 40vh;
  height: 4vh;
  background-color: #2f58ac;
  color: white;
`;

const UnderLine = styled.div`
  display: flex;
  width: 45vh;
  height: 0.5vh;
  background-color: #c6c6c6;
`;

const StDeleteUser = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  margin-left: -10vh;
`;
const Space = styled.div`
  height: 8vh;
`;
