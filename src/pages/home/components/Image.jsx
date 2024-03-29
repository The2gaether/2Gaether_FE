import React, { useState } from "react";
import styled from "styled-components";
import CardlistPagination from "./CardlistPagination";

const Image = ({ images, data }) => {
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <Container>
      {images.length === 1 ? (
        <>
          {images.slice(offset, offset + limit).map(({ imageUrl, id }) => (
            <StDog key={id} style={{ backgroundImage: `url(${imageUrl})` }}></StDog>
          ))}
        </>
      ) : (
        <>
          {images.slice(offset, offset + limit).map(({ imageUrl, id }) => (
            <StDog key={id} style={{ backgroundImage: `url(${imageUrl})` }}>
              <CardlistPagination
                total={images.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </StDog>
          ))}
        </>
      )}
      <StName>
        <StDistance> 약 {data.distance} KM </StDistance>
        <br />
        {data.dogSex === "Female" ? (
          <StNameSex> {data.dogName?.slice(0, 5)} (여)</StNameSex>
        ) : (
          <StNameSex>{data.dogName?.slice(0, 5)} (남)</StNameSex>
        )}
        <br />
        <StDecs>{data.dogDetails?.slice(0, 56)}</StDecs>
      </StName>
    </Container>
  );
};

export default Image;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 10px;
`;

const StDog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 350px;
  border-radius: 20px 20px 0 0;
  background-size: cover;
  background-position: center;
  /* box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3); */
`;

const StName = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: row;
  margin-top: -10px;
  margin-left: 10px;
  color: beige;

  /* border: 1px solid black; */
`;

const StDistance = styled.div`
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  margin-left: 10px;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid black;
  width: 100px;

  height: 20px;
  font-size: 14px;
  font-weight: 700;
`;
const StNameSex = styled.div`
  /* background-color: white; */
  color: black;
  border-radius: 10px 10px 10px 10px;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 700;
  width: 200px;
`;
const StDecs = styled.div`
  font-size: small;
  /* background-color: white; */
  color: black;
  border-radius: 10px 10px 10px 10px;
  width: 300px;
  height: 30px;
  margin-left: 10px;
  margin-bottom: 3px;
`;
