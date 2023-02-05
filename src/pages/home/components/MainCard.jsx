import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TinderCard from "react-tinder-card";

const Home = () => {
  const [people, setPeople] = useState([
    {
      name: "A",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    },
    {
      name: "B",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    },
    {
      name: "C",
      url: "https://img.newspim.com/news/2021/02/15/2102151712128400.jpg",
    },
  ]);

  useEffect(() => {}, []);

  return (
    <div>
      <Container>
        {people.map((person) => {
          return (
            <TinderCard
              style={{ position: "absolute" }}
              key={person.name}
              preventSwipe={["up", "down"]}
            >
              <StPeople style={{ backgroundImage: `url(${person.url})` }}>
                <h3>{person.name}</h3>
              </StPeople>
            </TinderCard>
          );
        })}
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
  .h3 {
    position: absolute;
    bottom: 10px;
    color: white;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;
