import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Layout from "../../../../components/Layout";

const EditNick = () => {
  const navigate = useNavigate();
  const Authorization = sessionStorage.getItem("accessToken");
  //기초 데이터 생성
  const initialState = {
    newPassword: "",
    check_password: "",
  };
  //유저 스테이트 생성
  const [psw, setPsw] = useState(initialState);
  //유저 스테이트 구조분해 할당
  const { check_password, newPassword } = psw;
  //상태관리 위해 초기값 세팅
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부를 관리하는 state
  const [modalMessage, setModalMessage] = useState("");
  const [passInput, setPassInput] = useState("");
  const [checkpassInput, setcheckpassInput] = useState("");
  const [match, setMatch] = useState(false);

  //정규식
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/; //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setPsw({ ...psw, [name]: value });
    if (name === "newPassword")
      !regPassword.test(value)
        ? setPassInput(`8~16자의 영문, 특수문자, 숫자를 조합하여 입력해주세요.`)
        : setPassInput("");

    if (name === "check_password") {
      const match = newPassword === value;
      setMatch(match);
      setcheckpassInput(match ? "일치합니다" : "비밀번호가 불일치합니다");
    }
  };
  const onSubmitHadler = async () => {
    if (!regPassword.test(newPassword)) {
      setIsModalOpen(true);
      setModalMessage("비밀번호를 정확히 입력해주세요!");
      return;
    }

    if (newPassword !== check_password) {
      setIsModalOpen(true);
      setModalMessage(`비밀번호가 일치하지 않습니다.`);
      return;
    }

    try {
      await axios.patch(`${process.env.REACT_APP_DOG}/users/mypage`, psw, {
        headers: {
          Authorization,
        },
      });
      alert("성공적으로 변경되었습니다!");
      navigate(-1);
    } catch (error) {
      setIsModalOpen(true);
      setModalMessage(`비밀번호 변경에 실패했습니다.`);
    }
  };

  const onDeleteUserHandler = () => {
    navigate("/mypage/outofusers");
  };
  return (
    <Layout title="설정">
      <Container>
        <StForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHadler();
          }}
        >
          {isModalOpen && (
            <ModalBackground>
              <ModalContent>
                <Modalbox>
                  <div>{modalMessage}</div>
                </Modalbox>
                <ModalButton onClick={() => setIsModalOpen(false)}>
                  확인
                </ModalButton>
              </ModalContent>
            </ModalBackground>
          )}

          <Space />
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            새 비밀번호
          </div>
          <StInput
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요"
            required
            name="newPassword"
            value={newPassword}
            onChange={onChangeUserHandler}
          />
          <StP3
            style={{ fontSize: "10px", fontWeight: "bold" }}
            id="help-password1"
            className="help"
          >
            {passInput}
          </StP3>
          <br />
          <StInput
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            required
            name="check_password"
            value={check_password}
            onChange={onChangeUserHandler}
          />
          <StP3 id="help-password2" className="help" match={match}>
            {checkpassInput}
          </StP3>
          <Space />
          <StButton>변경하기</StButton>
        </StForm>
        <UnderLine />
        <StDeleteUser onClick={() => onDeleteUserHandler()}>
          <div
            style={{ fontSize: "20px", fontWeight: "bold" }}
            onClick={onDeleteUserHandler}
          >
            회원탈퇴
          </div>
          <br />
          <div style={{ fontSize: "15px", color: "#c6c6c6" }}>
            개인정보 및 설정이 모두 삭제됩니다.
          </div>
        </StDeleteUser>
      </Container>
    </Layout>
  );
};

export default EditNick;

const Container = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  // 요소들의 배열 위치
  justify-content: center;
  // 요소들을 컨테이너의 가운데로 정렬
  align-items: center;
  margin-top: 40px;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StP3 = styled.div`
  font-size: 12px;
  margin-top: 10px;
  width: 250px;
  color: ${(props) => (props.match ? "green" : "red")};
`;
const StInput = styled.input`
  margin-top: 20px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 1px;
  width: 250px;
`;

const StButton = styled.button`
  border-radius: 20px 20px 20px 20px;
  border-style: none;
  width: 300px;
  height: 40px;
  background-color: #2f58ac;
  color: white;
  margin-bottom: 30px;
  cursor: pointer;
`;

const UnderLine = styled.div`
  display: flex;
  width: 330px;
  height: 5px;
  background-color: #c6c6c6;
  margin-bottom: 50px;
`;

const StDeleteUser = styled.div`
  display: flex;
  // 요소들 배열 방식의 방향
  flex-direction: column;
  margin-left: -50px;
  cursor: pointer;
`;
const Space = styled.div`
  height: 80px;
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
  background-color: white;
  width: 240px;
  height: 130px;
  padding: 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 17px;
  text-align: center;
`;
const Modalbox = styled.div`
  border: 1px solid black;
  height: 100px;
  width: 288px;
  border-top: none;
  border-right: none;
  border-left: none;
  margin-left: -25px;
`;
const ModalButton = styled.button`
  color: #007aff;
  font-weight: 700;
  font-size: 17px;
  padding: 8px 16px;
  border: none;
  background-color: white;
  margin-top: 5px;
  cursor: pointer;
`;
