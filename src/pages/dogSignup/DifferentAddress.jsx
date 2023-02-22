import React, { useEffect, useState } from "react";

export default function DifferntAddress() {
  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };

    let map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");
  }, []);
  return (
    <div>
      <div id="map" style="width:500px;height:400px;"></div>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_JUNGKI%"
      ></script>
    </div>
  );
}
