import React from "react";
import styled, { css } from "styled-components";

const Button = ({ children, size, ...restProps }) => {
  return (
    <StyledButton {...restProps} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  height: auto;
  border: 1px solid gray;
  ${(props) => {
    if (props.size === "l") {
      return css`
        width: 120px;
      `;
    } else if (props.size === "m") {
      return css`
        width: 80px;
      `;
    } else if (props.size === "s") {
      return css`
        width: 40px;
      `;
    } else {
      return css`
        width: 30px;
      `;
    }
  }}
`;
