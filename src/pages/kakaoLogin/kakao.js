import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //현재 url의 파라미터를 가져옴
  let params = new URL(window.location.href).searchParams;
  //params에 저장된 파라미터 안에서 'code'의 값을 가져옴
  let code = params.get("code");

  dispatch(
    __kakaoLogin({
      code,
    })
  );

  useEffect(() => {
    navigate("/dogSignUp");
  });

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Kakao;
