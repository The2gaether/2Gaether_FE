import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const iskakaoLogin = useSelector((state) => state.kakaoList.isLogin);

  let code = new URLSearchParams(window.location.search).get("code");

  dispatch(
    __kakaoLogin({
      code,
    })
  );

  useEffect(() => {
    iskakaoLogin && navigate("/selectpage");
  }, [iskakaoLogin, navigate]);

  return (
    <div>
      <h1>로딩중입니다....</h1>
    </div>
  );
};

export default Kakao;
