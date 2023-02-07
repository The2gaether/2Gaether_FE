import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postUser } from "../../redux/modules/userSlice";

// //리듀서 모듈
// import {
//   changeCheckName,
//   changeCheckNick,
//   __checkNickname,
//   __checkUsername,
//   __signup,
// } from "../../store/modules/signupSlice";

function DogSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 버튼 활성화를 위한 상태관리
  const [formstate, setFormState] = useState(false);
  const [dognamestate, setDogNameState] = useState(false);
  const [dogsexstate, setDogSexState] = useState(false);

  // 보낼 데이터 상태관리
  const [signData, setSignData] = useState({
    dogname: "",
    dogsex: "",
  });

  //조건 통과 상태를 위한 설정
  const [dogname, setDogName] = useState(false);
  const [dogsex, setDogSex] = useState(false);

  // 조건부 렌더링을 위한 상태관리
  const [signNumber, setSignNumber] = useState(0);

  //조건에따른 유효성검사 강아지 이름 숫자

  //input 데이터 저장하기
  const changeInput = (e) => {
    const { value, id } = e.target;
    setSignData({ ...signData, [id]: value });
    console.log(signData);
  };

  // 파일 업로드를 위한 상태관리

  //이전 다음 현재버튼
  const view = (e) => {
    e.preventDefault();
    console.log(signData);
  };

  const next = (e) => {
    e.preventDefault();
    setSignNumber((prevNumber) => prevNumber + 1);
  };
  const prev = (e) => {
    e.preventDefault();
    setSignNumber((prevNumber) => prevNumber - 1);
  };

  //모든데이터 백엔드로 보냄
  const submitLogin = async (e) => {
    console.log("testsubmit");
    e.preventDefault();
    const checkState = dispatch(__postUser(signData));
    if (checkState.payload) {
      // 이후 login페이지로 navigate
      navigate("/");
    }
  };

  // 조건들이 성립되었는지 체크하고 버튼 활성화
  React.useEffect(() => {
    if (dogname) {
      setDogNameState(true);
    }
    if (dogsex) {
      setDogSexState(true);
    }
    if (dogname && dogsex) {
      setFormState(true);
    } else {
      setFormState(false);
    }
  }, [dogname && dogsex]);

  // const buttonStyle = {
  //   background: formstate
  //     ? "linear-gradient(50deg, #ff398c, #ef734a)"
  //     : "white",
  //   color: formstate ? "white" : "black",
  //   disabled: !formstate,
  // };

  return (
    <StForm onSubmit={submitLogin}>
      <Container signNumber={signNumber}>
        {signNumber === 0 && (
          <div>
            <div>
              <h2>반가워요 강아지이름은 어떻게되나요?</h2>
              <input
                type="text"
                autoComplete="off"
                id="dogname"
                placeholder="5글자 이내로 입력해주세요"
                required
                onChange={changeInput}
              />
              <div className="info_box"></div>
            </div>
            <button className="on" onClick={next} disabled={!dognamestate}>
              다음
            </button>
            <button className="goback" onClick={prev}>
              이전
            </button>
          </div>
        )}

        {signNumber === 1 && (
          <Fragment>
            <h2>성별</h2>
            <select
              // signData에 인라인으로 바로 넣어줌(성별)
              // 여자인 경우는 true, 남자는 false를 보내준다.
              onChange={(e) => {
                if (e.target.value === "여자")
                  setSignData({ ...signData, dogsex: true });
                else if (e.target.value === "남자")
                  setSignData({ ...signData, dogsex: false });
                setDogSex(true);
              }}
            >
              <option value="none">===선택===</option>
              <option value="여자">여아</option>
              <option value="남자">남아</option>
            </select>
            <button className="on" onClick={next} disabled={!dogsexstate}>
              다음
            </button>
            <button className="goback" onClick={prev}>
              이전
            </button>
          </Fragment>
        )}
      </Container>
    </StForm>
  );
}

export default DogSignUp;
const StForm = styled.form`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 26px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  position: absolute;
  top: 0;
  left: 0;
  div,
  form {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  span {
    font-size: 12px;
  }
  .img_box {
    max-width: 100%;
    max-height: 50vh;
    overflow: hidden;
  }
  .file_input {
    height: 0;
    border: none;
    margin: 0;
    padding: 0;
  }
  button,
  input,
  select,
  .button_type {
    all: unset;
    width: 100%;
    max-width: 400px;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 1.2em;
    font-weight: 700;
    text-align: center;
    word-break: keep-all;
    background-color: #fff;
    color: #222;
    cursor: pointer;
    transition: all 0.2s;
  }
  input {
    border-bottom: 3px solid #ddd;
    padding: 0;
    margin-bottom: 10px;
  }
  button,
  .button_type {
    border-radius: 65px;
    text-align: center;
    box-shadow: 0 3px 6px #c7c7c7;
    transition: all 0.2s;
    &:hover {
      opacity: 0.9;
      box-shadow: 0 3px 5px #ddd;
    }
    &.on {
      background: linear-gradient(50deg, #858585, #d0cdcd);
      color: #fff;
    }
    &.goback {
      background: linear-gradient(50deg, #858585, #d0cdcd);
      color: #fff;
      opacity: 1;
    }
  }
  select {
    all: unset;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    padding: 10px 30px;
    font-size: 1.3em;
    color: #222 !important;
    border-bottom: 3px solid #ccc;
  }
  .tag_box {
    display: block;
    text-align: center;
    padding: 0 10%;
    box-sizing: border-box;
    & span {
      display: inline-block;
      padding: 10px 20px;
      margin: 5px 5px;
      border-radius: 30px;
      font-size: 16px;
      border: 1px solid #aaa;
    }
  }
`;

const Container = styled.div``;
