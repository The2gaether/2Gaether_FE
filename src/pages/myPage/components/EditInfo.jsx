import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Edit from "../../../assets/svg/editnick.svg";
import Lock from "../../../assets/svg/lock.svg";
import Map from "../../../assets/svg/map.svg";
import Plus from "../../../assets/svg/plus.svg";

const EditInfo = ({ user }) => {
  const navigate = useNavigate();
  const dog = user?.myDogs[0].dogId;
  console.log(user?.myDogs[0].dogId);

  return (
    <>
      <StForm>
        <StOneInfo onClick={() => navigate("/mypage/editnick")}>
          <Stimg src={Edit} />
          사용자 이름 변경
        </StOneInfo>
        <StOneInfo onClick={() => navigate("/mypage/editpsw")}>
          <Stimg src={Lock} />
          비밀번호 변경
        </StOneInfo>
        <StOneInfo onClick={() => navigate("/mypage/editaddress")}>
          <Stimg src={Map} />
          주소 변경
        </StOneInfo>
        <StOneInfo onClick={() => navigate(`/myDog/${dog}`)}>
          <Stimg src={Plus} />
          강아지 개별설정
        </StOneInfo>
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

const StOneInfo = styled.div`
  width: 300px;
  height: 60px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
  cursor: pointer;
`;

const Stimg = styled.img`
  margin-right: 10px;
`;
