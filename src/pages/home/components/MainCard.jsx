import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TinderCard from "react-tinder-card";
import axios from "axios";

const Home = () => {
  const [dogs, setDogs] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + "왼쪽으로 스크린");
  };

  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/userList`);
    setDogs(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <Container>
        {dogs.map((person) => (
          <TinderCard
            // TinderCard 필수 예제이다
            className="swipe"
            //key 값을 지정해준다
            key={person.id}
            //고정 시켜주기위한 스타일
            style={{ position: "absolute" }}
            //위 아래로 움직이는 것을 방지해준다
            preventSwipe={["up", "down"]}
            //스와이프 되었을때 나타나는 값
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <StPeople style={{ backgroundImage: `url(${person.url})` }}>
              <StName>{person.name}</StName>
            </StPeople>
          </TinderCard>
        ))}
        <div className="swipe-info">{lastDirection ? <p>넌 {lastDirection}</p> : <p />}</div>
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
  /* flex-direction: column; */
  /* align-items: center; */
  margin-top: 5vh;
  .swipe {
    position: absolute;
  }
  .swipe-info {
    position: absolute;
    bottom: 0;
  }
`;

const StName = styled.h3`
  position: absolute;
  font-size: xx-large;
  top: 10px;
  color: #9365dd;
`;
