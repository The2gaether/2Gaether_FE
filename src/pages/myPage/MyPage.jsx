import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyDogList from "./components/MyDogList";
import EditInfo from "./components/EditInfo";
import axios from "axios";
import Layout from "../../components/Layout";

const EditUser = () => {
  const [user, setUser] = useState();
  const [dogs, setDogs] = useState([]);

  const Authorization = sessionStorage.getItem("accessToken");
  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/users/mypage`, {
      headers: {
        Authorization,
      },
    });
    setUser(data);
    setDogs(data.myDogs);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Layout title="설정">
      <Container>
        <StTopGroup>
          <div className="div" style={{ fontSize: "20px", fontWeight: "bold" }}>
            <div> 안녕하세요 {user?.username}님!</div>
            <StSurvey href="https://forms.gle/Ud6S9QmUgCY8Pedx8" target="_blank">
              설문조사
            </StSurvey>
          </div>
          <div className="address">{user?.address.split(" ").slice(0, 3).join(" ")}</div>
          <div className="address">{user?.email}</div>
        </StTopGroup>
        <StImgGroup>
          {dogs.map((dog) => (
            <MyDogList key={dog.dogId} dog={dog} />
          ))}
        </StImgGroup>
        <EditInfo user={user} />
      </Container>
    </Layout>
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

const StTopGroup = styled.div`
  margin-top: 20px;
  .div {
    margin-bottom: 15px;
    display: flex;
  }
  .address {
    margin-bottom: 10px;
    font-size: 13px;
  }
  .div2 {
    /* padding-left: 100px; */
  }
`;

const StImgGroup = styled.div`
  margin-top: 17px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
`;

const StSurvey = styled.a`
  display: flex;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
  width: 100px;
  height: 20px;
  margin-left: 80px;
  text-decoration: none;
  background-color: #2f58ac;
  color: white;
  border-radius: 10px;
  &:hover {
    background-color: #eea400;
    transition: 0.4s;
  }
`;
