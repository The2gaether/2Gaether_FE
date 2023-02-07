import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __postLogin } from "../../redux/modules/KakaoSlice";

const Kakao = (props) => {
  const dispatch = useDispatch();
  //현재 윈도우 창의 주소값 불러옴
  const href = window.location.href;

  //현재 url의 파라미터를 가져옴
  let params = new URL(window.location.href).searchParams;
  console.log(params);
  //params에 저장된 파라미터 안에서 'code'의 값을 가져옴
  let code = params.get("code");
  console.log(code);
  useEffect(() => {
    //백엔드로 쿠키 토큰 전송
    dispatch(__postLogin(code));
  }, []);

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Kakao;
