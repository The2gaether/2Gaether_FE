import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyDogList = ({ key, dog }) => {
  const navigate = useNavigate();
  return (
    <>
      <Container key={dog.id}>
        <StImg style={{ backgroundImage: `url(${dog.profileImages})` }}></StImg>
        <StEditBtn>수정</StEditBtn>
        <StName>{dog.dogName}</StName>
      </Container>
    </>
  );
};

export default MyDogList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImg = styled.div`
  margin-bottom: -10px;
  position: relative;
  width: 100px;
  padding: 30px;
  max-width: 85vw;
  height: 150px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StEditBtn = styled.button`
  position: relative;
  width: 6vh;
  border-radius: 10px 10px 10px 10px;
`;

const StName = styled.h3`
  font-size: large;
  bottom: 10px;
  color: black;
`;
