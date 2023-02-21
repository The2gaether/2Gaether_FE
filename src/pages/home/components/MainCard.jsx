import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";

const Home = () => {
  const [dogs, setDogs] = useState([]);

  const fetchList = async () => {
    // const { data } = await axios.get(`${process.env.REACT_APP_DOG}/userList`);
    // setDogs(data);
  };

  const handleFavoriteClick = (person) => {
    alert("정말 매치하겠냐멍?");
    // setDogs(...dogs, person);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <Space />
      <Container>
        {dogs.map((person) => (
          <CardContainer key={person.id}>
            <StPeople style={{ backgroundImage: `url(${person.url})` }}>
              <StName>{person.name}</StName>
            </StPeople>
            <Space />
            <div className="btnGruop">
              <div className="circleBorder">
                <IconButton onClick={() => handleFavoriteClick()}>
                  <FavoriteBorderIcon className="icon" />
                </IconButton>
              </div>
              <div className="circleBorder">
                <IconButton>
                  <ClearIcon className="icon" />
                </IconButton>
              </div>
            </div>
          </CardContainer>
        ))}
      </Container>
    </div>
  );
};

export default Home;

const StPeople = styled.div`
  //사진파일을 한 위치에 고정
  width: 600px;
  padding: 10px;
  max-width: 85vw;
  height: 55vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`;

const CardContainer = styled.div`
  position: absolute;
  .btnGruop {
    display: flex;
    justify-content: flex-start;
  }

  .circleBorder {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border: 15px solid rgb(163, 151, 198);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    color: rgb(163, 151, 198);
    font-size: xxx-large;
  }
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

const Space = styled.div`
  height: 70px;
  width: 20px;
`;
