import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Layout from "../../../../components/Layout";
import smlogo from "../../../../assets/svg/logo.svg";
import DogSignUpModal from "../../../dogSignup/dogSignUpComponents/DogSignUpModal";
import DogModalDelete from "../../../dogSignup/dogSignUpComponents/DogModalDelete";
import axios from "axios";

const Outofusers = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  //모달창 띄우기
  const [signup, setSignup] = useState(false);

  const deleteUserHandler = () => {
    axios.delete(`${process.env.REACT_APP_DOG}/users/delete`, {
      headers: {
        Authorization,
      },
    });
  };

  const deleteId = () => {
    setSignup(!signup);
    deleteUserHandler();
  };

  return (
    <Layout title="회원탈퇴">
      <StLogo src={smlogo} />
      <Container>
        <StForm>
          <Stdelete>투개더 탈퇴 전 확인해주세요!</Stdelete>
          <Stword>
            <div>• 채팅,매칭내역등 모든 정보가 삭제됩니다.</div>
            <br />
            <div>• 데이터는 복구가 불가능합니다.</div>
          </Stword>
        </StForm>
        <StButton onClick={() => deleteId()}>탈퇴하기</StButton>
        {signup && (
          <DogSignUpModal closeModal={() => setSignup(!signup)}>
            <DogModalDelete />
          </DogSignUpModal>
        )}
      </Container>
    </Layout>
  );
};

export default Outofusers;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
  margin-top: 40px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StLogo = styled.img`
  width: 196.65px;
  height: 107.16px;
  margin-left: 83px;
  margin-top: 41px;
`;

const StButton = styled.button`
  border-radius: 20px 20px 20px 20px;
  border-style: none;
  width: 200px;
  height: 40px;
  background-color: #48484a;
  color: white;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    background-color: #2a4f9b;
    transition: 0.3s;
  }
`;

const Stdelete = styled.h1`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Stword = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f4f4f4;
  width: 350px;
  height: 80px;
  margin-bottom: 40px;
`;
