import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import { __patchAddress } from "../../redux/modules/addessSlice";
import { useDispatch } from "react-redux";
const NewAddress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("37.537187");
  const [longitude, setLongitude] = useState("127.005476");

  const dispatch = useDispatch();
  const handleComplete = (data) => {
    let newAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      newAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // Daum API 사용
    const geocoder = new window.daum.maps.services.Geocoder();
    geocoder.addressSearch(newAddress, function (result, status) {
      if (status === window.daum.maps.services.Status.OK) {
        const lat = result[0]?.y; // 위도
        const lng = result[0]?.x; // 경도
        console.log("위도", lat);
        console.log("경도", lng);
        setLatitude(lat);
        setLongitude(lng);
      }
    });
    setAddress(newAddress);
  };
  dispatch(__patchAddress({ latitude, longitude, address }));

  return (
    <Wrapper>
      <AddressInput onClick={() => setIsOpen(true)} value={address} />
      {isOpen && <DaumPostCode onComplete={handleComplete} />}
      <button type="submit">전송</button>
    </Wrapper>
  );
};

export default NewAddress;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AddressInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
