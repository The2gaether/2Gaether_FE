import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import EditNick from "./eachForm/EditNick";

const EditInfo = ({ user }) => {
  const [editNick, setEditNick] = useState(false);
  const [editPsw, setEditPsw] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <StForm>
        {!editNick ? (
          <StOneInfo
            // onClick={() =>setEditNick(true)}
            onClick={() => navigate("/mypage/editnick")}
          >
            닉네임 변경하기
          </StOneInfo>
        ) : (
          <StEditSet>
            <StEdit
            // placeholder={`${user.username}`}
            />
            <Stbtn onClick={() => setEditNick(false)}>취소</Stbtn>
          </StEditSet>
          // <EditNick />
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
          <StOneInfo onClick={() => setEditAddress(true)}>
            주소변경하기{/* {user.latitude} */}
          </StOneInfo>
        ) : (
          <StEditSet>
            <StEdit
            //  placeholder={`${user.latitude}`}
            />
            <Stbtn onClick={() => setEditAddress(false)}>취소</Stbtn>
          </StEditSet>
        )}
        {/* 
        <Stbtn onClick={() => {}} alert={"수정이 완료되었습니다"}>
          저장
        </Stbtn> */}
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
  width: 200px;
  max-width: 85vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px 10px 10px 10px; */
`;

const StEdit = styled.input`
  width: 200px;
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
