import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postLogin } from "../../redux/modules/userSlice";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import smlogo from "../../assets/svg/logo.svg";
import StartLayout from "../../components/StartLayout";
import kakao from "../../assets/svg/kakao.svg";
import google from "../../assets/svg/google.svg";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부를 관리하는 state
  const [modalMessage, setModalMessage] = useState("");
  //로그인 체크 전역변수 불러오기
  const loginCheck = useSelector((state) => state.userList.isLogin);
  const IsCertification = useSelector((state) => state.userList.isCertification);

  //로그인 핸들러
  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.email.trim() === "" || user.password.trim() === "") {
      setIsModalOpen(true);
      setModalMessage("이메일 아이디를 입력하세요!");
    }
    dispatch(__postLogin(user));
  };

  useEffect(() => {
    if (IsCertification) {
      setIsModalOpen(true);
      setModalMessage("회원가입이 완료 되었습니다. \n 이메일 인증을 부탁드려요!");
    }
  }, [IsCertification]);

  useEffect(() => {
    loginCheck && navigate("/selectpage");
  }, [loginCheck, navigate]);

  return (
    <StartLayout>
      <Container>
        <StLogo src={smlogo} />
        <form>
          <StDiv>
            <StThinText>간편하게 로그인하고</StThinText>
            <br />
            <StBoldText>투개더를 이용해보세요</StBoldText>
          </StDiv>
          <div>
            {isModalOpen && (
              <ModalBackground>
                <ModalContent>
                  <Modalbox>
                    <div>{modalMessage}</div>
                  </Modalbox>
                  <ModalButton onClick={() => setIsModalOpen(false)}>확인</ModalButton>
                </ModalContent>
              </ModalBackground>
            )}
            <StEmBox>
              <StEmText>이메일</StEmText>
              <StInput
                required
                type="text"
                name="email"
                placeholder="이메일을 입력하세요"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "이메일을 입력하세요")}
                onChange={onChangeLoginHandler}
              ></StInput>
            </StEmBox>
            <StPwBox>
              <StEmText>비밀번호</StEmText>
              <StInput
                required
                type="password"
                name="password"
                placeholder="패스워드를 입력하세요"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "패스워드를 입력하세요")}
                onChange={onChangeLoginHandler}
              ></StInput>
            </StPwBox>
          </div>
          <LogInBtn onClick={onSubmitLoginHandler}>로그인</LogInBtn>
        </form>
        <StNotUserGroup>
          <StNotUset>아직 투개더 회원이 아니라면?</StNotUset>
          <SignUpBtn
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하기
          </SignUpBtn>
        </StNotUserGroup>
        <StUnderGroup>
          <StLine />
          {/* <StSnsStart>SNS로 간편하게 시작하기</StSnsStart> */}
          <StSocialGroup>
            {/* <a href={KAKAO_AUTH_URL}>
              <KakaoSignIn src={kakao} />
            </a> */}
            {/* 
            <div onClick={() => alert("준비중입니다")}>
              <KakaoSignIn src={google} />
            </div> */}
          </StSocialGroup>
        </StUnderGroup>
      </Container>
    </StartLayout>
  );
}

export default Login;

const Container = styled.div`
  width: 375px;
  height: 750px;
  border-radius: 30px;
`;
const StLogo = styled.img`
  width: 196.65px;
  height: 107.16px;
  margin-left: 83px;
  margin-top: 41px;
`;
const StDiv = styled.div`
  width: 260px;
  height: 60px;
  margin-left: 55px;
  margin-top: 23.84px;
  text-align: center;
`;
const StEmBox = styled.div`
  width: 259px;
  height: 52px;
  margin-left: 57px;
  margin-top: 66px;
`;

const StPwBox = styled.div`
  width: 258px;
  height: 52px;
  margin-left: 57px;
  margin-top: 22px;
  margin-bottom: 32px;
`;
const StEmText = styled.p`
  width: 100px;
  height: 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;
const StThinText = styled.p`
  font-weight: 300;
  font-size: 24px;
`;

const StBoldText = styled.p`
  font-weight: 600;
  font-size: 24px;
`;
const SignUpBtn = styled.button`
  cursor: pointer;
  height: 25px;
  width: 84px;
  background: transparent;
  font-weight: 900;
  font-size: 12px;
  text-align: center;
  color: black;
  border: none;
  text-decoration-line: underline;
  margin-left: 30px;
`;
const LogInBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;
  height: 40px;
  width: 285px;
  margin-left: 48px;
  cursor: pointer;
  /* Main/main */
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  background: #2f58ac;
  border-radius: 40px;
  border: none;
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
    width: 138px;
    height: 17px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;

const StNotUset = styled.div`
  font-size: 12px;
  color: gray;
`;

const StNotUserGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border: 0 0 10px 0;
`;

const StUnderGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StLine = styled.div`
  width: 270px;
  height: 2px;
  background-color: gray;
  margin-bottom: 40px;
`;

const StSnsStart = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const StSocialGroup = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: 60px;
`;

const KakaoSignIn = styled.img`
  width: 40px;
  height: 40px;
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 240px;
  height: 130px;
  padding: 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;
const Modalbox = styled.div`
  border: 1px solid black;
  height: 100px;
  width: 200px;
  border-top: none;
  border-right: none;
  border-left: none;
`;
const ModalButton = styled.button`
  color: #007aff;
  font-weight: 700;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  background-color: white;
  margin-top: 5px;
  cursor: pointer;
`;
