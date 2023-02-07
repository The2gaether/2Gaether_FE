import React from "react";
import kakaologo from "../../assets/img/kakaologo.png";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";

const KakaoLogin = () => {
  return (
    <>
      <a href={KAKAO_AUTH_URL}>
        <img src={kakaologo} />
      </a>
    </>
  );
};

export default KakaoLogin;
