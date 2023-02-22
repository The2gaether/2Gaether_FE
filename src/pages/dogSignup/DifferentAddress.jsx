import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const { kakao } = window;

const DifferntAddress = () => {
  useEffect(() => {
    var container = document.getElementById("map"); // 지도를 표시할 div
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(container, options); // 지도를 생성합니다
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();
    // 지도 타입 컨트롤을 지도에 표시합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";

      var resultDiv = document.getElementById("clickLatlng");
      resultDiv.innerHTML = message;
    });
  }, []);

  //모달
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data);
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };

  return (
    <Container>
      <button type="primary" onClick={onToggleModal}>
        Open Modal
      </button>
      <>
        {isOpen && (
          <div
            visible={true}
            onOk={onToggleModal}
            onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
          >
            <DaumPostcode onComplete={handleComplete} />
          </div>
        )}
      </>
      <div id="map" style={{ width: "300px", height: "200px" }}></div>
      <div id="clickLatlng"></div>
    </Container>
  );
};

export default DifferntAddress;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Space = styled.div`
  margin-top: 100px;
  width: 10vw;
  height: 10vh;
`;
