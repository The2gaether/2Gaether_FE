import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  const handleHistory = () => {
    navigate(-1);
  };

  return (
    <StHeader>
      <IconButton>
        <ArrowBackIcon className="header_logo" fontSize="large" onClick={handleHistory} />
      </IconButton>

      <IconButton>
        <FavoriteIcon className="header_logo" fontSize="large" />
      </IconButton>
    </StHeader>
  );
}

export default Header;

const StHeader = styled.div`
  /* display to row */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  .PersonIcon {
    /* size: 10%; */
  }
  .logo {
    height: 70px;
    object-fit: contain;
  }
  .header_logo {
    padding: 20px;
  }
`;
