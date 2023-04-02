import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "./Image";
import YES from "../../../assets/svg/yes.svg";
import NO from "../../../assets/svg/no.svg";
import ModalBasic from "./ModalBasic";
import NoModalBasic from "./NoModalBasic";
import { useNavigate } from "react-router";

const CardList = () => {
  const Authorization = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [mainImage, setMainImage] = useState([]);
  const offset = (page - 1) * limit;
  const [count, setCount] = useState(0);
  const [isError, setIsError] = useState(false);

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOG}/match`, {
        headers: {
          Authorization,
        },
      });
      setDogs(data);
      setMainImage(data.images);
    } catch (error) {
      setIsError(true);
      alert(
        "더 이상 만날 친구가 없어요...ㅠㅠ \n 내일 다시 새로운 친구를 찾아볼께요"
      );
    }
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

  //싫어요 클릭
  const handleHateClick = () => {
    axios.post(
      `${process.env.REACT_APP_DOG}/match/reject/${dogs.dogId}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
    setCount(count + 1);
    setNoModalOpen(false);
  };

  useEffect(() => {
    fetchList();
  }, [count]);

  return (
    <Container>
      {modalOpen && (
        <ModalBasic
          count={count}
          setCount={setCount}
          dogId={dogs.dogId}
          dogName={dogs.dogName}
          setModalOpen={setModalOpen}
          userId={dogs.createdBy}
        />
      )}
      {/* {noModalOpen && (
        <NoModalBasic
          count={count}
          setCount={setCount}
          dogId={dogs.dogId}
          dogName={dogs.dogName}
          setNoModalOpen={setNoModalOpen}
          userId={dogs.createdBy}
        />
      )} */}
      {isError ? (
        <StNoFriends>
          <div>오늘은 더 이상 불러올 친구가 없어요</div>
          <br />
          <div>페이지를 새로고침 해주세요!</div>
          <br />
          <StImg src={NO} onClick={() => window.location.reload()} />
        </StNoFriends>
      ) : (
        <>
          <Image key={dogs.dogId} images={mainImage} data={dogs} />
          <StBtnGroup>
            <StImg src={YES} onClick={showModal}></StImg>
            {/* <StImg src={NO} onClick={() => handleHateClick()}></StImg> */}
            <StImg src={NO} onClick={() => handleHateClick()}></StImg>
          </StBtnGroup>
        </>
      )}
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

const StNoFriends = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  /* font-weight: 700; */
  margin-bottom: 30px;
`;
