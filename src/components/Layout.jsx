import React from "react";
import styled from "styled-components";
import Header from "../shared/MainHeader";
import Footer from "../shared/Footer";
import background from "../assets/svg/background.svg";

function Layout({ children, title }) {
  return (
    <Container>
      <ContainerDiv>
        <Header title={title} />
        <Content>{children}</Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </ContainerDiv>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media screen and (max-width: 500px) {
    background-image: none;
  }
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 375px;
  height: 750px;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
