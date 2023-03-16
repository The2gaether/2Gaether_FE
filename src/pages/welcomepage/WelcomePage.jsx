import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import StartLayout from "../../components/StartLayout";
import welecome from "../../assets/img/welecome.jpg";
import whitetogather from "../../assets/img/whitetogather.png";

function WelcomePage() {
  const navigate = useNavigate();

  const myAlert = () => {
    alert(
      // "1차 업데이트 (03/09 02:16) \n 1. 채팅방에서 엔터키 가.능. \n 2. 매치 오류와 로그인 불가기능 수정!\n 3. 피드백이 아직 부족합니다 더더 말해주세요!"
      // "2차 업데이트 (03/09 17:36) \n 1. 카카오톡 로그인기능 가능 \n 2. 받은 좋아요 페이지 깨짐 수정\n 3. 좋아요 리스트 음영처리 및 CSS꺠지는 현상 수정 \n 4. 채팅 리스트 안내문구 수정  \n 5. 업데이트 알림창 다시등장 방지"
      // "3차 업데이트 (03/10 01:55) \n 1. 회원가입 오류 및 이메일 중복 입력에러 및 문구수정 \n 2.좋아요/싫어요 모달로 변경과 css수정 \n 🙏 \n 로그아웃 기능은 저희 프로젝트 취지상 없는게 맞다고 판단하여 \n 만들지 않았습니다. 인터넷 창을 닫으시면 자동 로그아웃 됩니다. \n ❤️🧡💛💚💙💜\n 박청우 님, 김태균 님, 김지용 님, 이경은 님, 김수홍 님, 최동환 님, \n 조세림 님, 김승주 님, 조민수 님, 이채정 님, 정원지 님, 고석호 님"
      // "4차 업데이트 (03/10 18:44) \n 1. 채팅방 디자인 수정! \n 2. 매치페이지 화면 새로고침 방지 + 버튼 호버 !\n 3. 강아지 개별 정보 페이지 디자인수정\n 4. 이메일 인증메일 수정 \n🙏 회원탈퇴 기능 다음업데이트 대기중 \n ❤️🧡💛감사합니다💚💙💜\n 김재영 님, 이상정 님, 이상원 님, 김수진 님, 남궁윤서 님, \n 박수지 님, 조민욱 님, 이용우 님, 박소영 님, KEVin 님, 김주혁 님"
      // "5차 업데이트 (03/11 23:13) \n 1. 회원가입 시 생기던 오류 수정 \n 2. 메인페이지 css 수정 \n 3. 채팅방 리스트에서 마지막 대화 확인 \n 🙏03/13 09:00 당첨자 알림으로 올리겠습니다!! \n❤️🧡💛감사합니다💚💙💜\n 강석우 님, 김규리 님, 손채이 님, 이신행 님, 김민규 님, 박응수 님 \n 정희애 님, 전영국 님, 박찬우 님, 신중완 님, 이준성 님, 이진 님"
      // "6차 업데이트 (03/14) \n 저희 프로젝트를 사용해주셔서 감사드립니다! \n 설문에 참여해주신 내용을 기반으로 프로젝트를 수정하고 \n 더욱 완성도 높게 만들겠습니다 \n 감사합니다 🙇‍♂️ \n -투개더 올림  "
      "7차 업데이트(03/15 12:29) \n 1. 홈 화면에 사진이 한장만 있을때 화살표 안나오게 수정 \n 2. 회원탈퇴 기능 추가(현재 강아지데이터 초기화까지 가능) \n 3. 이미 올라온 강아지 재랜더링 방지 \n 4. 매칭데이터와 좋아요 데이터 성별구분 수정 \n 5. 더 이상 데이터를 불러올수 없을때 알림추가 \n 6. 싫어요 버튼 모달 제거 \n 7. 마이페이지에 내 주소 "
    );
  };

  const mix = () => {
    myAlert();
    navigate("/login");
  };

  return (
    <StartLayout>
      <StContainer>
        <StP1>
          우리 강아지의<span>산책 매칭</span>
        </StP1>
        <StImg src={whitetogather} />
        <Fade>
          <StBtn onClick={() => mix()}>시작하기</StBtn>
        </Fade>
        <StH1>
          인근의 <span>강아지 친구와 매칭</span>되어
          <Space />
          <span>산책도, 교류도</span> 해요!
        </StH1>
      </StContainer>
    </StartLayout>
  );
}
export default WelcomePage;

const StContainer = styled.div`
  position: fixed;
  width: 375px;
  background-color: transparent;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  height: 760px;
  background-image: url(${welecome});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const StP1 = styled.p`
  width: 200px;
  height: 23px;
  max-width: 375px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin-top: 58px;
  span {
    margin-left: 6px;
    font-size: 16px;
    font-weight: 600;
  }

  &::first-child {
    font-weight: 100;
  }
`;
const StImg = styled.img`
  width: 196.65px;
  height: 107.16px;
  margin-bottom: 270px;
`;

const StH1 = styled.h1`
  margin-top: 30px;
  width: 100%;
  max-width: 375px;
  height: 23px;
  font-size: 24px;
  color: #ffffff;
  font-weight: 200;
  text-align: center;
  span {
    font-size: 24px;
    font-weight: 700;
  }
`;
const StBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 100px;
  gap: 10px;
  width: 267px;
  height: 46px;
  background: #2f58ac;
  color: #ffffff;
  border-radius: 60px;
  border-color: transparent;
  cursor: pointer;
`;

const Space = styled.div`
  height: 10px;
`;

//fade in
const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
const fadeOut = keyframes`
  from {
    /* transform: scale(1); */
    opacity: 1;
  }

  to {
    /* transform: scale(.25); */
    opacity: 0;
  }
`;
const Fade = styled.div`
  ${(props) => (props.out ? `display: inline-block;` : `display: inline-block;`)}
  animation: ${(props) => (props.out ? fadeOut : fadeIn)} 3s linear;
`;
