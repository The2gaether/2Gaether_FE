import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const GiveDogList = () => {
  //초기 데이터
  const [result, setResult] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //초기강아지 데이터를 불러오는
  const fetchList = async () => {
    await axios
      .get(`${process.env.REACT_APP_DOG}/userList`)
      .then((r) => {
        let res = r.data;
        setResult(res.slice(0, 3));
        res = res.slice(3);
        setItem(res);
        setIsLoading(false);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  //업데이트 강아지 데이터를 불러오는
  const fetchMoreData = async () => {
    setIsLoading(true);
    setResult(result.concat(item.slice(0, 4)));
    setItem(item.slice(4));
    setIsLoading(false);
  };

  //무한스크롤
  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      fetchMoreData();
    }
  }, [isLoading]);

  // 초기데이터값
  useEffect(() => {
    fetchList();
    console.log(item);
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
