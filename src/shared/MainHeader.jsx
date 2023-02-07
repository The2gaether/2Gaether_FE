import React from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <StHeader>
      <IconButton
        onClick={() => {
          navigate("/editUser");
        }}
      >
        <PersonIcon className="header_logo" fontSize="large" />
      </IconButton>
      <IconButton>
        <img
          className="logo"
          src="https://image.rocketpunch.com/company/88741/tinder_logo_1546049672.png?s=400x400&t=inside"
          onClick={() => {
            navigate("/");
          }}
        />
      </IconButton>
      <IconButton
        onClick={() => {
          navigate("/giveLove");
        }}
      >
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
