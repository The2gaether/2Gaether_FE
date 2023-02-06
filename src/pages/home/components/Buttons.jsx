import React from "react";
import styled from "styled-components";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";

const Buttons = () => {
  return (
    <StSwipeButtons>
      <IconButton className="swipeButtons__repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__left">
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__right">
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </StSwipeButtons>
  );
};

export default Buttons;

const StSwipeButtons = styled.div`
  position: fixed;
  bottom: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .swipeButtons .MuiIconButton-root {
    background-color: white;
    box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3) !important;
  }

  .swipeButtons__repeat {
    padding: 3vw !important;
    color: #ec5e6f !important;
  }

  .swipeButtons__left {
    padding: 3vw !important;
    color: #ec5e6f !important;
  }

  .swipeButtons__star {
    padding: 3vw !important;
    color: #62b4f9 !important;
  }

  .swipeButtons__right {
    padding: 3vw !important;
    color: #76e2b3 !important;
  }

  .swipeButtons__lightning {
    padding: 3vw !important;
    color: #915dd1 !important;
  }
`;
