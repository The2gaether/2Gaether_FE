import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TinderCard from "react-tinder-card";

const Home = () => {
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

  useEffect(() => {}, [people]);

  return (
    <div>
      <Container>
        {people.map((person) => (
          <TinderCard
            // TinderCard 필수 예제이다
            className="swipe"
            //고정 시켜주기위한 스타일
            style={{ position: "absolute" }}
            key={person.name}
            //위 아래로 움직이는 것을 방지해준다
            preventSwipe={["up", "down"]}
          >
            <StPeople style={{ backgroundImage: `url(${person.url})` }}>
              <StName>{person.name}</StName>
            </StPeople>
          </TinderCard>
        ))}
      </Container>
    </div>
  );
};

export default Home;

const StPeople = styled.div`
  position: relative;
  width: 600px;
  padding: 10px;
  max-width: 85vw;
  height: 55vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  .swipe {
    position: absolute;
  }
`;

const StName = styled.h3`
  position: absolute;
  font-size: large;
  bottom: 30px;
  color: white;
`;
