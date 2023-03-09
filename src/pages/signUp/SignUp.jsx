import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __postUser, __checkId } from "../../redux/modules/userSlice";
import StartLayout from "../../components/StartLayout";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //초기값
  const initialState = {
    username: "",
    email: "",
    password: "",
    check_password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //유저 스테이트 구조분해 할당
  const { username, email, password, check_password } = user;

  //상태관리 위해 초기값 세팅

  const [usernameInput, setusernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [checkpassInput, setcheckpassInput] = useState("");
  const [match, setMatch] = useState(false);
  //정규식
  const regusername = /^[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]{1,20}$/;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const regPassword = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "username") !regusername.test(value) ? setusernameInput("") : setusernameInput("");

    if (name === "email")
      !regEmail.test(value) ? setEmailInput("이메일 형식으로 입력해주세요.") : setEmailInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~15자의 영문과 숫자 그리고 
             특수문자(!@#$%^&*)를 입력해주세요.`
          )
        : setPassInput("");
    if (name === "check_password") {
      const match = password === value;
      setMatch(match);
      setcheckpassInput(match ? "일치합니다" : "비밀번호가 불일치합니다");
    }
  };
  // 회원가입 POST요청 및 공백 존재 시 경고창 생성
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      return alert("아이디랑 비밀번호를 입력해주세요!");
    }
    if (password !== check_password) {
      return alert("다시 비밀번호를 입력해주세요!");
    }
    //회원가입 중복 이메일이면 로그인창으로 아가지게 해야할것 같고 회원가입이 안되게 짜야할것 같습니다.
    dispatch(
      __postUser({
        username,
        email,
        password,
      })
    );
    alert(" 가입하신 이메일로 인증메일이 갔다멍! \n 인증확인 하고와라멍!");
    navigate("/login");
  };

  const onSubmitUserCheckHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return alert("이메일 입력스!");
    }
    dispatch(
      __checkId({
        email,
      })
    );
  };

  return (
    <StartLayout>
      <form onSubmit={onSubmitUserHandler}>
        <TopBox>
          <div>간편하게 가입하고</div>
          <br />
          <StP1>투개더를 이용해보세요</StP1>
        </TopBox>
        <StDiv>
          <StP2>닉네임</StP2>
          <StInput
            type="text"
            name="username"
            value={username}
            placeholder="닉네임을 입력하세요(강아지 이름X)"
            onChange={onChangeUserHandler}
          ></StInput>
        </StDiv>
        <StP3 id="help-password2" className="help">
          {usernameInput}
        </StP3>
        <StDiv>
          <StP2>이메일</StP2>
          <StInput
            type="email"
            name="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={onChangeUserHandler}
          />
          <StP3 id="help-user" className="help">
            {emailInput}
          </StP3>
        </StDiv>
        <StCheckGroup>
          <StChDiv style={{ fontSize: "8px" }}>
            오른쪽의 이메일 중복확인 버튼을 클릭해주세요.
          </StChDiv>
          <StDogButton onClick={onSubmitUserCheckHandler}>중복확인</StDogButton>
        </StCheckGroup>
        <StDiv>
          <StP2>비밀번호</StP2>
          <StInput
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={onChangeUserHandler}
          ></StInput>
          <StP3 id="help-password1" className="help">
            {passInput}
          </StP3>
        </StDiv>

        <StDiv>
          <StP2>비밀번호 확인</StP2>
          <StInput
            type="password"
            name="check_password"
            value={check_password}
            placeholder="비밀번호 확인해주세요"
            onChange={onChangeUserHandler}
          ></StInput>
          <StP3 id="help-password2" className="help" match={match}>
            {checkpassInput}
          </StP3>
        </StDiv>
        <StLdButton>가입 완료</StLdButton>
      </form>
    </StartLayout>
  );
}

export default SignUp;

const StP1 = styled.div`
  font-size: 20px;
`;
const StP2 = styled.div`
  padding-left: 1px;
  font-weight: 600;
`;
const StP3 = styled.div`
  font-size: 12px;
  margin-top: 10px;
  width: 250px;
  color: ${(props) => (props.match ? "green" : "red")};
`;
const StDiv = styled.div`
  margin-left: 12px;
  margin-bottom: 22px;
`;
const StChDiv = styled.div`
  margin-bottom: 32px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 92px;
  margin-bottom: 45px;
  width: 220px;
  height: 58px;
  margin-left: 32px;
  text-align: center;
`;

const StCheckGroup = styled.div`
  color: gray;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  margin-top: -13px;
  margin-bottom: 15px;
  margin-left: 10px;
`;

const StDogButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: black;
  margin-left: 3px;
  width: 60px;
  height: 18px;
  font-size: 12px;
  font-weight: 600;
  background: #d9d9d9;
  margin-top: -25px;
  border-radius: 60px;
  border: transparent;
  cursor: pointer;
  &:hover {
    background: #2f58ac;
    color: white;
  }
`;
const StLdButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 257px;
  height: 46px;
  margin-left: 12px;

  font-size: 16px;
  cursor: pointer;
  /* Main/main */
  font-weight: 600;
  margin-top: 100px;
  background: #2f58ac;
  border-radius: 60px;
  margin-bottom: 22px;
`;
const StInput = styled.input`
  margin-top: 6px;
  width: 259px;
  height: 26px;

  background-color: white;
  box-sizing: border-box;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;

  &::placeholder {
    width: 300px;
    height: 30px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;

    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
