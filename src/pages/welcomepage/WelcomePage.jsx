import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Stimg>
      <StContainer>
        <p>근처의 강아지 친구와 교류하며 산책도 같이해요!</p>
        <button onClick={() => navigate("/login")}>시작하기</button>
      </StContainer>
    </Stimg>
  );
}

export default WelcomePage;
const Stimg = styled.div`
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("http://res.heraldm.com/phpwas/restmb_allidxmake.php?idx=5&simg=201902211639012219160_20190221164308_01.jpg");
  background-position: center 30%;
  background-size: cover;
`;

const StContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 116px;
    font-weight: 800;
    color: white;
    margin: 0 0 20px 0;
    @media screen and (max-width: 985px) {
      font-size: 70px;
    }
    @media screen and (max-width: 595px) {
      font-size: 50px;
    }
  }
  button {
    font-size: 19px;
    font-weight: 700;
    border: none;
    width: 260px;
    height: 44px;
    border-radius: 30px;
    background: linear-gradient(to right, #eeeeee, #656463);
    opacity: 0.8;
    color: white;
    cursor: pointer;
  }
`;
