import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const GiveDogList = () => {
  //초기 데이터
  const [result, setResult] = useState([]);
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(true);

  //초기강아지 데이터를 불러오는
  const fetchList = async () => {
    await axios
      .get(`${process.env.REACT_APP_DOG}/userList`)
      .then((r) => {
        let res = r.data;
        setResult(res.slice(0, 2));
        res = res.slice(2);
        setItem(res);
        // setIsLoading(false);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  //업데이트 강아지 데이터를 불러오는
  const fetchMoreData = async () => {
    // setIsLoading(true);
    setResult(result.concat(item.slice(0, 2)));
    setItem(item.slice(2));
    // setIsLoading(false);
  };

  //무한스크롤
  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      fetchMoreData();
      setPage(page + 1);
    }
  }, [page]);

  // 초기데이터값
  useEffect(() => {
    fetchList();
  }, []);

  //무한스크롤
  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => window.removeEventListener("scroll", infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <>
      <Container>
        {result.map(({ url, name }) => (
          <OneDog>
            <StDog style={{ backgroundImage: `url(${url})` }}>
              <StName>{name}</StName>
            </StDog>
          </OneDog>
        ))}
      </Container>
    </>
  );
};
export default GiveDogList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; // 복수의 행
  max-width: 1000px;
  margin-bottom: 1000px;
`;
const StDog = styled.div`
  position: relative;
  width: 400px;
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
  align-items: center;
  justify-content: center;
`;
