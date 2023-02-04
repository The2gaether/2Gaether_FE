import React from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

function Header() {
  return (
    <StHeader>
      <PersonIcon />
      <img src="https://image.rocketpunch.com/company/88741/tinder_logo_1546049672.png?s=400x400&t=inside" />
      <EmailIcon />
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
    size: 10%;
  }
`;
