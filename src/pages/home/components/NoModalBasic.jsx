import styled from "styled-components";
import axios from "axios";

function ModalBasic({ setNoModalOpen, dogId, dogName, count, setCount }) {
  const Authorization = sessionStorage.getItem("accessToken");
  // 모달 끄기
  const closeModal = () => {
    setNoModalOpen(false);
  };

  //싫어요 클릭
  const handleHateClick = () => {
    axios.post(
      `${process.env.REACT_APP_DOG}/match/reject/${dogId}`,
      {},
      {
        headers: {
          Authorization,
        },
      }
    );
    setCount(count + 1);
    setNoModalOpen(false);
    // window.location.reload();
  };

  return (
    <BackGround>
      <Container>
        <TopSpace />
        <Bold>{dogName}, 이 친구랑</Bold>
        <Bold>함께 할 수 없는 건가요..</Bold>
        {/* <Regular>강아지 등록을 안하시면</Regular>
        <Regular>투개더 이용이 어렵답니다.😂 </Regular> */}
        <Garo />
        <St3>
          <StTrueButton onClick={() => handleHateClick()}>네, 맞아요😭</StTrueButton>
          <Sero />
          <StFalseButton onClick={closeModal}>앗,취소!</StFalseButton>
        </St3>
      </Container>
    </BackGround>
  );
}
export default ModalBasic;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 모달창 크기 */
  width: 260px;
  height: 150px;
  /* 최상단 위치 */
  z-index: 1;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
`;
const TopSpace = styled.div`
  width: 10px;
  height: 100px;
`;

const Bold = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Regular = styled.div`
  margin-top: 7px;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 2px;
`;

const St3 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const StTrueButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #2f58ac;
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    font-weight: 700;
  }
`;
const StFalseButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #cf0000;
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    font-weight: 700;
  }
`;

const Sero = styled.div`
  height: 42px;
  width: 0.5px;
  background-color: rgba(60, 60, 67, 0.29);
`;

const Garo = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: rgba(60, 60, 67, 0.29);
  margin-top: 30px;
`;
