import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../home/components/MainHeader";

const EditUser = () => {
  const [editNick, setEditNick] = useState(false);
  const [editPsw, setEditPsw] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const navigate = useNavigate();

  //임시

  const user = { name: "김태리", address: "서울특별시 강서구" };
  const [people, setPeople] = useState([
    {
      name: "김태리",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
      id: 1,
    },
    {
      name: "너무",
      url: "https://image.ajunews.com/content/image/2022/09/21/20220921093319393088.jpg",
      id: 2,
    },
    {
      name: "이뻐요",
      url: "https://pds.joongang.co.kr//news/component/htmlphoto_mmdata/201803/19/7232f0dd-daa8-4ffb-b8d3-8dbb60e75442.jpg",
      id: 3,
    },
  ]);

  useEffect(() => {}, []);

  return (
    <>
      <MainHeader />
      <Container>
        {!editNick ? (
          <StOneInfo onClick={() => setEditNick(true)}>닉네임 : {user.name}</StOneInfo>
        ) : (
          <StEditSet>
            <StEditNickName placeholder={`${user.name}`}></StEditNickName>
            <button onClick={() => setEditNick(false)}>취소</button>
          </StEditSet>
        )}
        {!editPsw ? (
          <StOneInfo onClick={() => setEditPsw(true)}>비밀번호 : {user.name}</StOneInfo>
        ) : (
          <StEditNickName placeholder={`${user.name}`}></StEditNickName>
        )}
        {!editAddress ? (
          <StOneInfo onClick={() => setEditPsw(true)}>주소 : {user.address}</StOneInfo>
        ) : (
          <StEditNickName placeholder={`${user.address}`}></StEditNickName>
        )}

        <br />
        <StImgGroup>
          {people.map((person) => (
            <div
              key={person.id}
              onClick={() => {
                navigate(`/mydog/${person.id}`);
              }}
            >
              <StPeople style={{ backgroundImage: `url(${person.url})` }}>
                <StName>{person.name}</StName>
              </StPeople>
            </div>
          ))}
        </StImgGroup>
      </Container>
    </>
  );
};

export default EditUser;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
`;

const StEditNickName = styled.input`
  width: 1000px;
  height: 40px;
`;

const StImgGroup = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

const StPeople = styled.div`
  margin-left: 20px;
  position: relative;
  width: 100px;
  padding: 30px;
  max-width: 85vw;
  height: 18vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  position: absolute;
  font-size: large;
  bottom: 10px;
  color: white;
`;

const StEditSet = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: center;
`;

const StOneInfo = styled.div``;
