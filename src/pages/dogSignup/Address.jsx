import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { __patchAddress } from "../../redux/modules/addessSlice";

function Address() {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [modalState, setModalState] = useState(true);
  const [inputAddressValue, setInputAddressValue] = useState();
  const [inputZipCodeValue, setInputZipCodeValue] = useState();

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

  const onCompletePost = (data) => {
    console.log("complete");
    // debugger;
    setModalState(false);
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  }; // onCompletePost 함수
  return (
    <div>
      주소찍기
      <DaumPostcode
        //style={postCodeStyle}
        onComplete={onCompletePost}
      ></DaumPostcode>
      TEST!!!
      {!modalState && "ㅇㅇㅇㅇ"}
      {!modalState && (
        <div>
          <input value={inputZipCodeValue}></input>
          <input value={inputAddressValue}></input>
          {/* <input>상세주소 넣기 </input> */}
        </div>
      )}
    </div>
  );
}
export default Address;
