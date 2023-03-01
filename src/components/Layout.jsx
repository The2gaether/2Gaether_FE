import React from "react";
import styled from "styled-components";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";
// import Header from "./header/screen/Header";
// import Footer from "./footer/screen/Footer";
// import useScrollPosition from "../hooks/useScrollPosition";
=======
import Header from "../shared/MainHeader";
import Footer from "../shared/Footer";
import background from "../assets/img/background.png";
>>>>>>> 94dc9ec5547f91d01c06c47b0537b8dd5b82c9c9

function Layout({ children }) {
  return (
    <Container>
<<<<<<< HEAD
      <PageContainer>
        {/* <Header /> */}
        <PageContainerBox>
          <Outlet>{props.children}</Outlet>
        </PageContainerBox>
        {/* <Footer /> */}
      </PageContainer>
=======
      <ContainerDiv>
        <Header />
        <Content>{children}</Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </ContainerDiv>
>>>>>>> 94dc9ec5547f91d01c06c47b0537b8dd5b82c9c9
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
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 375px;
  height: 812px;
  border: 2px solid black;
  border-radius: 30px;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
