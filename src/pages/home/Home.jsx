import React from "react";
import MainCard from "./components/MainCard";
import MainHeader from "../../shared/MainHeader";
import Buttons from "./components/Buttons";

const Home = () => {
  return (
    <div>
      <MainHeader />
      <MainCard />
      <Buttons />
    </div>
  );
};

export default Home;
