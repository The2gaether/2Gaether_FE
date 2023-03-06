import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Edit from "../../../assets/img/edit.png";
import Lock from "../../../assets/img/lock.png";
import Map from "../../../assets/img/map-pin.png";
import Plus from "../../../assets/img/plus-circle.png";

const EditInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <StForm>
        <StOneInfoWhite onClick={() => navigate("/mypage/editnick")}>
          <img src={Edit} />
          닉네임 변경하기
        </StOneInfoWhite>
        <StOneInfoBlack onClick={() => navigate("/mypage/editpsw")}>
          <img src={Lock} />
          비밀번호 변경
        </StOneInfoBlack>
        <StOneInfoWhite onClick={() => navigate("/newaddress")}>
          <img src={Map} />
          주소변경하기
        </StOneInfoWhite>
        {/* 보류 */}
        {/* <StOneInfoBlack onClick={() => navigate("/mypage/adddog")}>
          <img src={Plus} />
          강아지 추가하기
        </StOneInfoBlack> */}
      </StForm>
    </>
  );
};

export default EditInfo;

const StForm = styled.form`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  align-items: center;
`;

const StOneInfoWhite = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeef6;
  border-color: black;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
`;

const StOneInfoBlack = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #aabcdd;
`;
