import styled from "styled-components";
import Left from "../../../assets/svg/left_default.svg";
import LeftH from "../../../assets/svg/left_hover.svg";
import LeftP from "../../../assets/svg/left_press.svg";
import Right from "../../../assets/svg/right_default.svg";
import RightH from "../../../assets/svg/right_hover.svg";
import RightP from "../../../assets/svg/right_press.svg";

const CardlistPagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  console.log(total);

  return (
    <Nav>
      <ButtonL onClick={() => setPage(page - 1)} disabled={page === 1} />
      <ButtonR onClick={() => setPage(page + 1)} disabled={page === numPages} />
    </Nav>
  );
};
export default CardlistPagination;

const Nav = styled.nav`
  width: 350px;
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const ButtonL = styled.button`
  background-image: url(${Left});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 30px;
  padding: 8px;
  margin: 0;

  &:hover {
    background-image: url(${LeftH});
    background-size: cover;
    cursor: pointer;
    /* transform: translateY(-2px); */
  }
  &:active {
    background-image: url(${LeftP});
    background-size: cover;
  }

  &[disabled] {
    background-image: url(${Left});
    cursor: revert;
    transform: revert;
  }
`;

const ButtonR = styled.button`
  background-image: url(${Right});
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 30px;
  padding: 8px;
  margin: 0;

  &:hover {
    background-image: url(${RightH});
    background-size: cover;
    cursor: pointer;
  }
  &:active {
    background-image: url(${RightP});
    background-size: cover;
  }

  &[disabled] {
    background-image: url(${Right});
    cursor: revert;
    transform: revert;
  }
`;
