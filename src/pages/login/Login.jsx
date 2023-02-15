import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postLogin } from "../../redux/modules/userSlice";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //초기값
  const initialState = {
    email: "",
    password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //로그인 체크 전역변수 불러오기
  const loginCheck = useSelector((state) => state.userList.isLogin);
  console.log(loginCheck);

  //로그인 핸들러
  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.email.trim() === "" || user.password.trim() === "") {
      alert("이메일/아이디를 입력하세요");
    }
    dispatch(__postLogin(user));
  };

  useEffect(() => {
    navigate("/dogsignup");
  });

  return (
    <Container>
      <Wrapper>
        <LoginBox>
          <TopBox>
            <div>간편하게 로그인하고</div>
            <div>투개더를 이용해보세요</div>
          </TopBox>

          <StInput
            required
            type="text"
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={onChangeLoginHandler}
          ></StInput>
          <StInput
            required
            type="password"
            name="password"
            placeholder="패스워드를 입력하세요"
            onChange={onChangeLoginHandler}
          ></StInput>
          <LogInBtn onClick={onSubmitLoginHandler}>로그인</LogInBtn>
        </LoginBox>
        <Separator>
          <div></div>
          <span>Or</span>
          <div></div>
        </Separator>
        <KakaoSignIn>
          <a href={KAKAO_AUTH_URL}> 카카오로그인 </a>
        </KakaoSignIn>
        <SignUpBtn
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </SignUpBtn>
      </Wrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100px;
`;
const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 10px;
`;
const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;

  h1 {
    color: #333333;
  }
  button {
    border: none;
    width: 130px;
    height: 30px;
    border-radius: 10px;
    background-color: gray;
    color: white;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const Separator = styled.div`
  margin: 10px 0px 30px 0px;
  margin-top: 10px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 2px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-weight: 600;
  }
`;
const SignUpBtn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 12px;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: gray;
`;
const LogInBtn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 12px;
  background-color: #2f58ac;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: gray;
`;
const KakaoSignIn = styled.button`
  border: none;
  border-radius: 50px;
  margin-top: 12px;
  background-color: gray;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: gray;
`;
const StInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid;
  margin-top: 10px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const LoginBox = styled.form``;
