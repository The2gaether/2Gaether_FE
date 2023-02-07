import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../shared/MainHeader";
import MyDogList from "./components/MyDogList";
import EditInfo from "./components/EditInfo";

const EditUser = () => {
  //임시
  const user = { name: "김태리", password: "비밀", address: "서울특별시 강서구" };
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

  // useEffect(() => {
  //   fetchList();
  // }, []);

  return (
    <>
      <MainHeader />
      <Container>
        <EditInfo user={user} />
        <br />
        <StImgGroup>
          {people.map((person) => (
            <MyDogList key={person.id} person={person} />
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

const StImgGroup = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;
