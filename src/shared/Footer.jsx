import React from "react";
import styled from "styled-components";
import DogHome from "../assets/img/DogHome.png";
import MessageIcon from "../assets/img/MessageIcon.png";
import FootIcon from "../assets/img/FootIcon.png";
import UserIcon from "../assets/img/UserIcon.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <StButtons>
      <StImgWrapper
        onClick={() => {
          navigate("/");
        }}
      >
        <StImg src={DogHome} />
      </StImgWrapper>

      <StImgWrapper
        onClick={() => {
          navigate("/chattingList");
        }}
      >
        <StImg src={MessageIcon} />
      </StImgWrapper>

      <StImgWrapper
        onClick={() => {
          navigate("/giveLove");
        }}
      >
        <StImg src={FootIcon} />
      </StImgWrapper>

      <StImgWrapper
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <StImg src={UserIcon} />
      </StImgWrapper>
    </StButtons>
  );
}

export default Footer;

const StButtons = styled.div`
  width: 375px;
  height: 83px;
  bottom: 0;
  box-shadow: 0px -1px 0px 0px #000000; /* box-shadow 속성을 사용해 그림자를 만듭니다 */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StImgWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: relative; /* 자식 요소들이 부모 요소 기준으로 position 속성을 사용할 수 있도록 설정합니다. */
  cursor: pointer; /* 마우스 커서 모양을 변경합니다 */
`;

const StImg = styled.img`
  width: 30px;
  height: 30px;

  &:hover {
    border-bottom: 2px solid black;
    padding-bottom: 5px;
  }
`;
