import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "./Image";
import YES from "../../../assets/svg/yes.svg";
import NO from "../../../assets/svg/no.svg";
import ModalBasic from "./ModalBasic";
import NoModalBasic from "./NoModalBasic";

const CardList = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  const [dogs, setDogs] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [mainImage, setMainImage] = useState([]);
  const offset = (page - 1) * limit;

  const fetchList = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOG}/match`, {
      headers: {
        Authorization,
      },
    });
    setDogs(data);
    setMainImage(data.images);
  };

  //좋아요 모달
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  //싫어요 모달
  const [noModalOpen, setNoModalOpen] = useState(false);

  const showNoModal = () => {
    setNoModalOpen(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Container>
      {modalOpen && (
        <ModalBasic
          dogId={dogs.dogId}
          dogName={dogs.dogName}
          setModalOpen={setModalOpen}
          userId={dogs.createdBy}
        />
      )}
      {noModalOpen && (
        <NoModalBasic
          dogId={dogs.dogId}
          dogName={dogs.dogName}
          setNoModalOpen={setNoModalOpen}
          userId={dogs.createdBy}
        />
      )}
      <Image key={dogs.dogId} images={mainImage} data={dogs} />
      <StBtnGroup>
        <StImg src={YES} onClick={showModal}></StImg>
        {/* <StImg src={NO} onClick={() => handleHateClick()}></StImg> */}
        <StImg src={NO} onClick={showNoModal}></StImg>
      </StBtnGroup>
    </Container>
  );
};
export default CardList;

const Container = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
`;

const StBtnGroup = styled.div`
  /* z-index: 1; */
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StImg = styled.img`
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
`;
