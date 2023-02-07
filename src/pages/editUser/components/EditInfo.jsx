import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditInfo = ({ user }) => {
  const [editNick, setEditNick] = useState(false);
  const [editPsw, setEditPsw] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  return (
    <>
      <StForm>
        {!editNick ? (
          <StOneInfo onClick={() => setEditNick(true)}>닉네임 : {user.name}</StOneInfo>
        ) : (
          <StEditSet>
            <StEdit placeholder={`${user.name}`} />
            <Stbtn onClick={() => setEditNick(false)}>취소</Stbtn>
          </StEditSet>
        )}
        {!editPsw ? (
          <StOneInfo onClick={() => setEditPsw(true)}>비밀번호 변경</StOneInfo>
        ) : (
          <StEditSet>
            <StEdit placeholder={`${user.password}`} />
            <Stbtn onClick={() => setEditPsw(false)}>취소</Stbtn>
          </StEditSet>
        )}
        {!editAddress ? (
          <StOneInfo onClick={() => setEditAddress(true)}>주소 : {user.address}</StOneInfo>
        ) : (
          <StEditSet>
            <StEdit placeholder={`${user.address}`} />
            <Stbtn onClick={() => setEditAddress(false)}>취소</Stbtn>
          </StEditSet>
        )}

        <Stbtn onClick={() => {}} alert={"수정이 완료되었습니다"}>
          저장
        </Stbtn>
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

const StEditSet = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: center;
`;

const StOneInfo = styled.div`
  border: 1px solid black;
  width: 600px;
  max-width: 85vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px 10px 10px 10px; */
`;

const StEdit = styled.input`
  width: 600px;
  padding: 10px;
  max-width: 85vw;
  height: 5vh;
`;

const Stbtn = styled.button`
  width: 60px;
  height: 5vh;
  padding: 10px;
  max-width: 85vw;
  /* max-height: 10vw; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
