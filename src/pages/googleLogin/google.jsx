import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/googleSlice";

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isgooglelogin = useSelector((state) => state.googleList.isLogin);

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log(code);

  dispatch(
    __googleLogin({
      code,
    })
  );

  useEffect(() => {
    isgooglelogin && navigate("/selectpage");
  }, [isgooglelogin, navigate]);

  return (
    <div>
      <h1>로딩중입니다....</h1>
    </div>
  );
};
export default Google;
