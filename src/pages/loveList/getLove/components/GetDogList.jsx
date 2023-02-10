import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
// import axios from "axios";
import useFetch from "./useFetch";

const GiveDogList = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, list, result } = useFetch(query, page);
  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    if (result.message === "Breed not found (master breed does not exist)") {
      setHasMore(false);
    }
  }, [result]);

  return (
    <>
      <Container>
        <StOnePage>
          {list.map((dog, id) => {
            if (id % 2 === 0) {
              const group = list.slice(id, id + 2);
              return (
                <OneDog key={id}>
                  {group.map(({ url, name }) => (
                    <StDog style={{ backgroundImage: `url(${url})` }} key={name}>
                      <StName>{name}</StName>
                    </StDog>
                  ))}
                </OneDog>
              );
            }
            return null;
          })}
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
  /* display: flex; */
  /* justify-content: center; */
  /* flex-direction: row; */
  margin-top: 5vh;
  margin-left: 50vh;
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
  flex-wrap: wrap;
  width: 50%;
`;
