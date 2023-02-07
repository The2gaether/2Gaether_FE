import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const GiveDogList = () => {
  const [dogs, setDogs] = useState([]);

  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/userList`);
    setDogs(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Container>
        {dogs.map((dog) => (
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
