import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { __patchAddress } from "../../redux/modules/addessSlice";
import { useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //위도경도
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  //주소 모달창
  const [modalState, setModalState] = useState(true);
  const [inputAddressValue, setInputAddressValue] = useState();
  const [inputZipCodeValue, setInputZipCodeValue] = useState();

  // 조건부 렌더링을 위한 상태관리
  const [signNumber, setSignNumber] = useState(0);

  //위도 경도 나타내는 식
  navigator.geolocation.getCurrentPosition(async function (position) {
    const location = {
      longitude: position.coords.latitude,
      latitude: position.coords.longitude,
    };
    setLatitude(location.latitude);
    setLongitude(location.longitude);
    const frm = new FormData();
    frm.append("latitude", location.latitude);
    frm.append("longitude", location.longitude);
    const checkState = await dispatch(__patchAddress(frm));
    console.log(latitude);
    console.log(longitude);
  });

  //주소입력 창
  const onCompletePost = (data) => {
    console.log("complete");
    setModalState(false);
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  };

  //next 회원가입 완료로 가는 버튼
  const next = (e) => {
    if (signNumber === 0) {
    }
    e.preventDefault();
    setSignNumber((prevNumber) => prevNumber + 1);
  };

  //얼른가자 멍 이후 메인페이지로
  const submitLogin = () => {
    navigate("/");
  };

  //완료버튼에 따른 색깔변화
  const [formstate, setFormState] = useState(false);
  const buttonStyle = {
    background: formstate
      ? "linear-gradient(50deg, #ff398c, #ef734a)"
      : "white",
    color: formstate ? "white" : "black",
    disabled: !formstate,
  };

  return (
    <div>
      <AddForm onSubmit={submitLogin}>
        <TopBox>
          <div>간편하게 가입하고</div>
          <div>투개더를 이용해보세요</div>
        </TopBox>
        {signNumber === 0 && (
          <div>
            <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
            TEST!!!
            {!modalState && "ㅇㅇㅇㅇ"}
            {!modalState && (
              <div>
                <input value={inputZipCodeValue}></input>
                <input value={inputAddressValue}></input>
                <button className="on" onClick={next}>
                  다음
                </button>
              </div>
            )}
          </div>
        )}

        {signNumber === 1 && (
          <div>
            <div>
              가입을 축하드려요! <br /> 이제부터 본격적으로 <br /> 투개더🐶
              할까요?
            </div>
            <button
              onClick={submitLogin}
              style={buttonStyle}
            >{`얼른 가자멍!`}</button>
          </div>
        )}
      </AddForm>
    </div>
  );
}
export default Address;

const TopBox = styled.div`
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

const AddForm = styled.form``;
