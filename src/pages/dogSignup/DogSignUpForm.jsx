import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postDog } from "../../redux/modules/signupSlice";
import noImg from "../../src_assets/no-image-found.png";

// 회원가입 form 컴포넌트
function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 버튼 활성화를 위한 상태관리
  const [formstate, setFormState] = useState(false);
  const [dogSexState, setDogSexState] = useState(false);
  const [dogImagesState, setDogImagesState] = useState(false);
  const [dogDetailsState, setDogDetailsState] = useState(false);

  // 보낼 데이터 상태관리
  const [signData, setSignData] = useState({
    dogName: "",
    dogSex: "",
    images: "",
    dogDetails: "",
  });

  // 조건부 렌더링을 위한 상태관리
  const [signNumber, setSignNumber] = useState(0);

  // 파일 업로드를 위한 상태관리
  const [imageSrcs, setImageSrcs] = useState([]);
  const [imageSrcsText, setImageSrcsText] = useState([]);

  //next 버튼 조건
  const next = (e) => {
    if (signNumber === 0) {
      if (signData.dogName.length === 0 || signData.dogName.length > 5) {
        return;
      }
    }

    if (signNumber === 1) {
      let dogSexRadio = document.getElementsByName("dogSexRadio");
      let dogSex = "";
      dogSexRadio.forEach((e) => {
        if (e.checked) dogSex = e.value;
      });
      if (!dogSex) {
        return;
      }
      setDogImagesState(true);
      setSignData({ ...signData, dogSex: dogSex });
    }

    if (signNumber === 2) {
      if (!imageSrcs) {
        return;
      }
      setDogDetailsState(true);
      setSignData({ ...signData, images: imageSrcs });
    }

    if (signNumber === 3) {
    }
    e.preventDefault();
    setSignNumber((prevNumber) => prevNumber + 1);
  };
  const handleChangeFile = (event) => {
    let imageSrcTemp = imageSrcs;
    let readers = [];
    for (let i = 0; i < event.target.files.length; i++) {
      readers.push(readFileAsText(event.target.files[i]));
      imageSrcTemp.push(event.target.files[i]);
    }
    Promise.all(readers).then((values) => {
      let imageTemp = imageSrcsText;
      values.forEach((value) => {
        imageTemp = [...imageTemp, value];
      });
      setImageSrcsText(imageTemp.splice(0, 2));
    });
    setImageSrcs(imageSrcTemp.splice(0, 2));
  };

  function readFileAsText(fileBlob) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(fileBlob);
    });
  }

  //핸드러
  const onSubmitHandler = async (event) => {
    if (signData.dogDetails === 0 || signData > 20) {
      return;
    }
    event.preventDefault();
    const checkState = dispatch(__postDog(signData));
  };

  //주소로 가는 코드
  const handleClick = () => {
    navigate("/address");
  };

  //합치는 코드(address로가는온클릭, 서브밋코드)
  const combinedHandler = async (event) => {
    await onSubmitHandler(event);
    handleClick();
  };

  const buttonStyle = {
    background: formstate
      ? "linear-gradient(50deg, #ff398c, #ef734a)"
      : "white",
    color: formstate ? "white" : "black",
    disabled: !formstate,
  };

  return (
    <StForm>
      <h2>
        {" "}
        간편하게 가입하고 <br /> 투개더를 이용해보세요.{" "}
      </h2>
      {signNumber === 0 && (
        <div>
          <div> ({signNumber + 1}/5)</div>
          <h3>
            {" "}
            반가워요!
            <br /> 강아지 이름은 어떻게 되나요?
          </h3>
          <input
            autoComplete="off"
            id="dogName"
            placeholder="5글자 이내로 입력해주세요."
            required
            onChange={(e) => {
              setSignData({ ...signData, dogName: e.target.value });
              setDogSexState(true);
            }}
          />
          <button className="on" onClick={next}>
            다음
          </button>
        </div>
      )}
      {signNumber === 1 && (
        <div>
          <div> ({signNumber + 1}/5)</div>
          <h2>
            강아지의 <br /> 성별은 어떻게 될까요?
          </h2>
          <div>
            <input
              type="radio"
              name="dogSexRadio"
              value="Male"
              defaultChecked
            />
            <label>남</label>
          </div>
          <div>
            <input type="radio" name="dogSexRadio" value="Female" />
            <label>여</label>
          </div>

          <button className="on" onClick={next} disabled={!dogSexState}>
            다음
          </button>
        </div>
      )}
      {signNumber === 2 && (
        <div>
          <div> ({signNumber + 1}/5)</div>
          <h3>
            {" "}
            강아지의 <br />
            사진을 2장 이상 추가해주세요!
          </h3>
          <div className="img_box">
            <div>
              {(imageSrcsText || []).map((url) => (
                <img src={url} alt="..." />
              ))}
            </div>
          </div>
          <label className="button_type on" htmlFor="image_file">
            이미지 업로드
          </label>
          <input
            // 파일업로드 부분
            required
            multiple
            className="file_input"
            id="image_file"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleChangeFile}
          />

          <div>
            <button className="on" onClick={next} disabled={!dogImagesState}>
              다음
            </button>
          </div>
        </div>
      )}
      {signNumber === 3 && (
        <div>
          <div> ({signNumber + 1}/5)</div>
          <h3>
            {" "}
            반가워요!
            <br /> 강아지 성격적으세요
          </h3>
          <input
            autoComplete="off"
            id="dogName"
            placeholder="20자 이내로 입력해주세요."
            required
            onChange={(e) => {
              setSignData({ ...signData, dogDetails: e.target.value });
            }}
          />

          <button
            className="on"
            onClick={combinedHandler}
            disabled={!dogDetailsState}
          >
            다음
          </button>
        </div>
      )}
    </StForm>
  );
}

export default SignUpForm;

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
      background-color: gray;
      opacity: gray;
      border: none;
      color: white;
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
