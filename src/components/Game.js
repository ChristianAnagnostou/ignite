import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../redux/actions/detailAction";

function Game({ game }) {
  // Load Details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    dispatch(loadDetail(game.id));
  };
  return (
    <StyledGame onClick={loadDetailHandler}>
      <h3>{game.name}</h3>
      <p>{game.released}</p>
      <img src={game.background_image} alt="" />
    </StyledGame>
  );
}

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.336);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    margin-bottom: -5px;
  }
`;

export default Game;
