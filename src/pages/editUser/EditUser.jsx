import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditUser = () => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  //임시
  const [people, setPeople] = useState([
    {
      name: "김태리",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    },
    {
      name: "너무",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    },
    {
      name: "이뻐요",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    },
  ]);

  useEffect(() => {}, []);

  return (
    <>
      {!edit ? (
        <Container>
          <StEditNickName placeholder="여기에 닉네임을 입력하세요"></StEditNickName>
          <StEditNickName placeholder="여기에 변경할 비밀번호을 입력하세요"></StEditNickName>
          <StEditNickName placeholder="여기에 변경한 비밀번호를 확인하세요"></StEditNickName>
          <div>주소창 기입 란</div>
          <StbtnGruop>
            <button>이전으로</button>
            <button onClick={() => setEdit(true)}>수정</button>
          </StbtnGruop>
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
      ) : (
        <Container>
          <StEditNickName placeholder="여기에 닉네임을 입력하세요"></StEditNickName>
          <StEditNickName placeholder="여기에 변경할 비밀번호을 입력하세요"></StEditNickName>
          <StEditNickName placeholder="여기에 변경한 비밀번호를 확인하세요"></StEditNickName>
          <div>주소창 기입 란</div>
          <StbtnGruop>
            <button>이전으로</button>
            <button onClick={() => setEdit(false)}>완료</button>
          </StbtnGruop>
        </Container>
      )}
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

const StbtnGruop = styled.div`
  display: flex;
  justify-content: center;
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
