import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../shared/MainHeader";

const MyDog = () => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  //임시
  const [people, setPeople] = useState({
    name: "김태리",
    url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    id: 1,
  });

  useEffect(() => {}, []);

  return (
    <div>
      <MainHeader />
      <Container>
        {!edit ? (
          <div>
            <StPeople style={{ backgroundImage: `url(${people.url})` }}>
              <StName>{people.name}</StName>
            </StPeople>
            <div></div>
          </div>
        ) : (
          <div>
            <div>바이</div>
          </div>
        )}
      </Container>
    </div>
  );
};
export default MyDog;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
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
