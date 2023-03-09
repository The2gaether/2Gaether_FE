import styled from "styled-components";
import Left from "../../../assets/svg/left_arrow.svg";
import Right from "../../../assets/svg/right_arrow.svg";

const CardlistPagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <Nav>
      {/* <Button src={Left} onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button> */}
      <StImg src={Left} />
      <StImg src={Right} />
      {/* <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button> */}
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

const StImg = styled.img`
  width: 50px;
  height: 50px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 10px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
