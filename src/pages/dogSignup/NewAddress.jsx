import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const NewAddress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState("");

  const handleComplete = (data) => {
    let address = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      address += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // Daum API 사용
    const geocoder = new window.daum.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === window.daum.maps.services.Status.OK) {
        const latitude = result[0].y; // 위도
        const longitude = result[0].x; // 경도
        console.log(latitude, longitude);
      }
    });

    setFullAddress(address);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <AddressInput onClick={() => setIsOpen(true)} value={fullAddress} />
      {isOpen && <DaumPostCode onComplete={handleComplete} />}
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
