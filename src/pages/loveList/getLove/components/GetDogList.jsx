import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GiveDogList = () => {
  const [dog, setDog] = useState([
    {
      name: "김태리",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
      id: 1,
    },
    {
      name: "서현진",
      url: "https://image.fmkorea.com/files/attach/new2/20210218/2063168106/3234556960/3399125469/8e408ad79b1bcc45606d04932d773b9f.jpeg",
      id: 2,
    },
    {
      name: "이다희",
      url: "https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/11/PS20113000023.jpg",
      id: 3,
    },
    {
      name: "고윤정",
      url: "https://img.allurekorea.com/allure/2022/12/style_63a86592d560b-1012x1200.jpg",
      id: 4,
    },
    {
      name: "한소희",
      url: "https://dimg.donga.com/ugc/CDB/WOMAN/Article/61/78/f8/b3/6178f8b31c4cd2738250.jpg",
      id: 5,
    },
  ]);

  return (
    <>
      <Container>
        {dog.map((dog) => (
          <OneDog>
            <StDog style={{ backgroundImage: `url(${dog.url})` }}>
              <StName>{dog.name}</StName>
            </StDog>
            <Space />
          </OneDog>
        ))}
      </Container>
    </>
  );
};
export default GiveDogList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;
const StDog = styled.div`
  position: relative;
  width: 230px;
  padding: 10px;
  max-width: 45vw;
  height: 45vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const StName = styled.h3`
  position: absolute;
  font-size: medium;
  bottom: 30px;
  color: beige;
`;

const OneDog = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Space = styled.div`
  padding-left: 10px;
  /* background-color: black; */
`;
