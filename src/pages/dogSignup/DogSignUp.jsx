import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postDog } from "../../redux/modules/signupSlice";
import male from "../../assets/svg/male.svg";
import female from "../../assets/svg/female.svg";
import plusbutton from "../../assets/img/plusbutton.PNG";
import Resizer from "react-image-file-resizer";
import DogSignUpModal from "./dogSignUpComponents/DogSignUpModal";
import DogModalDetail from "./dogSignUpComponents/DogModalDetail";
import DogSignUpTop from "./dogSignUpComponents/DogSignUpTop";
import DogSignUpName from "./dogSignUpComponents/DogSignUpName";
import DogSignUpSex from "./dogSignUpComponents/DogSignUpSex";
import DogSignUpImage from "./dogSignUpComponents/DogSignUpImage";
import DogSignUpDetail from "./dogSignUpComponents/DogSignUpDetail";
import StartLayout from "../../components/StartLayout";

// 회원가입 form 컴포넌트
function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 버튼 활성화를 위한 상태관리
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
  const [imageSrcs1, setImageSrcs1] = useState([]);
  const [imageSrcsText1, setImageSrcsText1] = useState([]);

  //next 버튼 조건
  const next = (e) => {
    // e.preventDefault();
    if (signNumber === 0) {
      // e.preventDefault();
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
      if (imageSrcs.length == 0) {
        return;
      }
      setDogDetailsState(true);
      setSignData({ ...signData, images: imageSrcs });
    }

    if (signNumber === 3) {
    }

    setSignNumber((prevNumber) => prevNumber + 1);
  };

  const resizeFile = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300, // 새로운 가로 크기
        300, // 새로운 세로 크기
        file.type.split("/")[1], // 파일 확장자
        100, // 이미지 품질
        0, // 회전 각도
        (uri) => {
          resolve(dataURItoBlob(uri));
        },
        "base64"
      );
    });
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  //이미지파일 업로드 핸들러
  const handleChangeFile = async (event) => {
    let imageSrcTemp = imageSrcs;
    let readers = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const resizedImage = await resizeFile(event.target.files[i]); // 이미지 리사이징
      console.log(resizedImage);
      readers.push(readFileAsText(resizedImage));
      imageSrcTemp.push(event.target.files[i]);
    }
    Promise.all(readers).then((values) => {
      let imageTemp = imageSrcsText;
      values.forEach((value) => {
        imageTemp = [...imageTemp, value];
      });
      setImageSrcsText(imageTemp);
    });
    setImageSrcs(imageSrcTemp);
  };

  const handleChangeFile1 = async (event) => {
    let imageSrcTemp = imageSrcs1; // imageSrcs1 배열 사용
    let readers = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const resizedImage = await resizeFile(event.target.files[i]);
      console.log(resizedImage);
      readers.push(readFileAsText(resizedImage));
      imageSrcTemp.push(event.target.files[i]);
    }
    Promise.all(readers).then((values) => {
      let imageTemp = imageSrcsText1;
      values.forEach((value) => {
        imageTemp = [...imageTemp, value];
      });
      setImageSrcsText1(imageTemp);
    });
    setImageSrcs1(imageSrcTemp);
  };
  // 파일 읽기 함수
  const readFileAsText = (fileBlob) => {
    return new Promise(function (resolve, reject) {
      if (!(fileBlob instanceof Blob)) {
        reject(new Error("Invalid file"));
      }

      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(fileBlob);
    });
  };
  //합치는 코드(address로가는온클릭, 서브밋코드)
  const combinedHandler = async (event) => {
    event.preventDefault();
    if (signNumber === 3) {
      if (signData.dogDetails.length === 0 || signData.dogDetails.length > 40) {
        return;
      }
    }
    const checkState = dispatch(__postDog(signData));
    navigate("/newaddress");
  };

  //모달창 띄우기
  const [signup, setSignup] = useState(false);

  //ENTER키 자동 금지
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      window.scrollTo(0, 0);
    }
  };

  return (
    <StForm>
      {signNumber === 0 && (
        <StartLayout>
          <DogSignUpTop />
          <div>
            <StNum> ({signNumber + 1}/5)</StNum>
            <DogSignUpName />
            <StInput
              type="text"
              onKeyDown={handleEnterPress}
              autoComplete="off"
              id="dogName"
              required
              placeholder="5글자 이내로 입력해주세요."
              onChange={(e) => {
                setSignData({ ...signData, dogName: e.target.value });
                setDogSexState(true);
              }}
            />
            <StBtnDiv>
              <StBackBtn onClick={() => setSignup(!signup)}>뒤로</StBackBtn>
              <StBtn className="on" onClick={next}>
                다음
              </StBtn>
            </StBtnDiv>

            {signup && (
              <DogSignUpModal closeModal={() => setSignup(!signup)}>
                <DogModalDetail />
              </DogSignUpModal>
            )}
          </div>
        </StartLayout>
      )}

      {signNumber === 1 && (
        <StartLayout>
          <DogSignUpTop />
          <div>
            <StNum> ({signNumber + 1}/5)</StNum>
            <DogSignUpSex />
            <StDiv4>
              <StImg src={male} />
              <StImg src={female} />
              {/* <ImgBox>
              </ImgBox>
              <ImgBox>
              </ImgBox> */}
            </StDiv4>
            <StRadio
              type="radio"
              name="dogSexRadio"
              value="Male"
              defaultChecked
            />
            <StRadio type="radio" name="dogSexRadio" value="Female" />
            <StBtnDiv>
              <StBackBtn onClick={() => setSignup(!signup)}>뒤로</StBackBtn>
              <StBtn className="on" onClick={next}>
                다음
              </StBtn>
            </StBtnDiv>
          </div>
        </StartLayout>
      )}

      {signNumber === 2 && (
        <StartLayout>
          <DogSignUpTop />
          <StNum> ({signNumber + 1}/5)</StNum>
          <DogSignUpImage />
          <div>
            <StDivImg>
              <div>
                {(imageSrcsText || []).map((url) => (
                  <ImagePreview src={url} alt="..." />
                ))}
              </div>
              <InputContainer hasImage={imageSrcs.length > 0}>
                <input
                  required
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleChangeFile}
                />
                <StImg1 src={plusbutton} />
              </InputContainer>
              <div>
                {(imageSrcsText1 || []).map((url) => (
                  <ImagePreview src={url} alt="..." />
                ))}
              </div>
              <InputContainer hasImage={imageSrcs1.length > 0}>
                <input
                  required
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleChangeFile1}
                />
                <StImg1 src={plusbutton} />
              </InputContainer>
            </StDivImg>
          </div>

          <StBtnDiv>
            <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>
              뒤로
            </StBackBtn>
            <StBtn onClick={next} disabled={!imageSrcs}>
              다음
            </StBtn>
          </StBtnDiv>
        </StartLayout>
      )}

      {signNumber === 3 && (
        <StartLayout>
          <DogSignUpTop />
          <StNum> (거의 다 왔어요!) </StNum>
          <DogSignUpDetail></DogSignUpDetail>
          <StTextarea
            autoComplete="off"
            id="dogDetails"
            placeholder=" 친구를 사귀는데에 큰 도움이 되니 
            최대한 자세히 적어주세요 :)"
            onChange={(e) => {
              setSignData({ ...signData, dogDetails: e.target.value });
            }}
          />
          <StBtnDiv>
            <StBackBtn onClick={() => setSignNumber(signNumber - 1)}>
              뒤로
            </StBackBtn>
            <StBtn
              className="on"
              onClick={combinedHandler}
              disabled={!dogDetailsState}
            >
              다음
            </StBtn>
          </StBtnDiv>
        </StartLayout>
      )}
    </StForm>
  );
}

export default SignUpForm;

const StDiv4 = styled.div`
  display: flex;
  margin-left: 17px;
  /* margin-bottom: 10px; */
`;

const StDivImg = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const ImagePreview = styled.img`
  width: 118px;
  height: 160px;
  margin-right: 18px;
  margin-bottom: 20%;
  border-radius: 25px;
  border: 3px solid black;
  object-fit: contain;
`;
const InputContainer = styled.div`
  position: relative;
  width: 118px;
  height: 160px;
  border: 3px solid black;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  margin-right: 15px;
  justify-content: center;
  margin-left: 10px;
  border-radius: 25px;
  align-items: center;
  display: ${(props) => (props.hasImage ? "none" : "flex")};
  margin-bottom: 20%;
  &:hover {
    cursor: pointer;
  }

  input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;
const StNum = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 36px;
`;

const ImgBox = styled.div`
  width: 110px;
  height: 100px;
  border-radius: 20px;
  float: left;
  border: 2px solid #000000;
  margin: 10px;
`;
const StImg = styled.img`
  width: 80px;
  height: 80px;
  margin-left: 28px;
  margin-right: 26px;
`;
const StImg2 = styled.img`
  width: 52px;
  height: 52px;
  margin: 25px 25px 25px 28px;
`;
const StImg1 = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  margin-left: 80px;
  margin-top: 120px;
`;

const StRadio = styled.input`
  width: 100px;
  height: 15px;
  margin-top: 15px;
  margin-left: 33px;
  margin-bottom: 2px;
`;
const StH4 = styled.h4`
  width: 100px;
  height: 15px;
  margin-top: 10px;
  margin-left: 48px;
`;
const StInput = styled.input`
  display: block;
  margin-left: 15px;
  width: 257px;
  height: 52px;
  background-color: white;
  border: 2px solid;
  box-sizing: border-box;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  &::placeholder {
    font-size: 16px;
    padding-left: 3px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const StTextarea = styled.textarea`
  width: 257px;
  height: 140px;
  border: 2px solid #000000;
  border-radius: 20px;
  margin-bottom: 34px;
  padding-left: 20px;
  margin-left: 6px;
  padding-top: 30px;

  &::placeholder {
    font-size: 12px;
    padding-top: 15px;
    padding-left: 5px;
    &:focus {
      border-color: rgb(38, 38, 38);
    }
  }
`;
const StBtn = styled.button`
  width: 121px;
  height: 50px;
  margin-left: 20px;

  font-size: 16px;
  line-height: 23px;
  font-weight: 700;

  color: #ffffff;
  background: #2f58ac;
  border-radius: 60px;
`;

const StBackBtn = styled.button`
  width: 121px;
  height: 50px;
  margin-left: 19px;
  font-size: 16px;
  line-height: 23px;
  font-weight: 700;

  color: #ffffff;
  background: #aeaeb2;
  border-radius: 60px;
`;
const StBtnDiv = styled.div`
  margin-top: 52px;
  margin-right: 15px;
`;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  background-color: #fff;

  padding: 0 26px;
  box-sizing: border-box;

  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 16px;

  top: 0;
  left: 0;
`;
