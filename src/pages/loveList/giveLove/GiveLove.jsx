import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../../shared/MainHeader";
import GiveDogList from "./components/GiveDogList";
import GivePagination from "./components/GivePagination";

const GiveLove = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <br />
      <StSelects>
        <OneSelect>내가 보낸</OneSelect>
        <div
          onClick={() => {
            navigate("/getLove");
          }}
        >
          내가 받은
        </div>
      </StSelects>
      <br />
      <GiveDogList />
      <Space />
      <GivePagination />
    </>
  );
};

export default GiveLove;

const StSelects = styled.div`
  display: flex;
  justify-content: space-around;
`;

const OneSelect = styled.div`
  text-decoration: underline;
  text-underline-offset: 10px;
`;

const Space = styled.div`
  padding-top: 100px;
`;
