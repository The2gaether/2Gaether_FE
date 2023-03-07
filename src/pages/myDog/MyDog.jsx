import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import EditDog from "./editDog/EditDog";
import Layout from "../../components/Layout";

const MyDog = () => {
  const { id } = useParams();
  const Authorization = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [dog, setDog] = useState({});
  const [images, setImages] = useState([]);

  const fetchList = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_DOG}/dogs/${id}`,
      {
        headers: {
          Authorization,
        },
      }
    );
    setDog(data);
    setImages(data.images);
  };

  const onDeleteDog = () => {
    axios.delete(`${process.env.REACT_APP_DOG}/dogs/${id}`, {
      headers: {
        Authorization,
      },
    });
    alert("성공적으로 삭제되었습니다!");
    navigate(-1);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // props 끌어올리기 용!!!
  // const onChangeTrue = () => {
  //   setEdit(false);
  // };

  return (
    <Layout title="설정">
      <Container>
        <StBefore>
          <EditDog dog={dog} images={images} />
        </StBefore>
      </Container>
    </Layout>
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

const StBefore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
