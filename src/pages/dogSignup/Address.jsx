import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

function Address() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  navigator.geolocation.getCurrentPosition(function (position) {
    const location = {
      longitude: position.coords.latitude,
      latitude: position.coords.longitude,
    };
    setLatitude(location.latitude);
    setLongitude(location.longitude);

    console.log(latitude);
    console.log(longitude);
  });

  return <div></div>;
}
export default Address;
