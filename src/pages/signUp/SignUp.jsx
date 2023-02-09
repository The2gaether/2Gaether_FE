import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postUser } from "../../redux/modules/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //초기값
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //유저 스테이트 구조분해 할당
  const { username, email, password } = user;

  //상태관리 위해 초기값 세팅

  const [usernameInput, setusernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  //정규식
  const regusername = /^[a-z0-9]{4,8}$/;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const regPassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d@$!%*#?&]{8,15}$/;

  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "username")
      !regusername.test(value)
        ? setusernameInput("소문자 + 숫자 허용 4~8자리입니다.")
        : setusernameInput("");

    if (name === "email")
      !regEmail.test(value)
        ? setEmailInput("이메일 형식으로 입력해주세요.")
        : setEmailInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~15자의 영문 대소문자와 숫자로 입력해주세요.
                           특수문자(!@#$%^&*)도 사용 가능합니다.`
          )
        : setPassInput("");
  };
  // 회원가입 POST요청 및 공백 존재 시 경고창 생성
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return alert("아이디랑 비밀번호를 입력해주세요!");
    }

    dispatch(
      __postUser({
        username,
        email,
        password,
      })
    );
    navigate("/dogSignUp");
  };
  console.log(email);

  return (
    <Container>
      <Wrapper>
        <SignUpBox onSubmit={onSubmitUserHandler}>
          <TopBox>
            <div>간편하게 가입하고</div>
            <div>투개더를 이용해보세요</div>
          </TopBox>

          <div>
            <StInput
              type="text"
              name="username"
              value={username}
              placeholder="아이디를 입력하세요"
              onChange={onChangeUserHandler}
            ></StInput>
          </div>
          <p id="help-password2" className="help">
            {usernameInput}
          </p>

          <div>
            <StInput
              type="email"
              name="email"
              value={email}
              placeholder="이메일을 입력해주세요"
              onChange={onChangeUserHandler}
            ></StInput>
          </div>
          <p id="help-user" className="help">
            {emailInput}
          </p>

          <div>
            <StInput
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
              onChange={onChangeUserHandler}
            ></StInput>
          </div>
          <p id="help-password1" className="help">
            {passInput}
          </p>

          <LogInBtn>강아지 설정하기</LogInBtn>
        </SignUpBox>
      </Wrapper>
    </Container>
  );
}

export default SignUp;

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
    background-color: #f56753;
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
  background-color: gray;
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
  background-color: gray;
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
const SignUpBox = styled.form``;
