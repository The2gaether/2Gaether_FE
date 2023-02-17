import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MainHeader from "../../../../shared/MainHeader";

const EditNick = ({ Authorization }) => {
  const [data, setData] = useState("");

  const onSubmitHadler = async () => {
    await axios.patch(`${process.env.REACT_APP_DOG}/dogs`, data, {
      headers: {
        Authorization,
      },
    });
  };

  return (
    <>
      <MainHeader />
      <form onSubmit={onSubmitHadler()}>
        <h3>
          반가워요!
          <br /> 닉네임을 변경 하시겠나요?
        </h3>
        <input
          autoComplete="off"
          id="dogName"
          placeholder="5글자 이내로 입력해주세요."
          required
          onChange={(e) => {
            setData(e);
          }}
        />
        <button className="on">다음</button>
      </form>
    </>
  );
};

export default EditNick;
