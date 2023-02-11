import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
// import axios from "axios";
import useFetch from "./useFetch";

const GiveDogList = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list, result } = useFetch(query, page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <>
      <Container>
        <StOnePage>
          {list.map(({ url, name }) => (
            <OneDog key={name}>
              <StDog style={{ backgroundImage: `url(${url})` }}>
                <StName>{name}</StName>
              </StDog>
            </OneDog>
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error!</p>}
          <div ref={loader} />
        </StOnePage>
      </Container>
    </>
  );
};
export default GiveDogList;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: row;
  margin-top: 5vh;
`;

const StOnePage = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: center;
`;
