import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { popup } from "../animations";
// Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../redux/actions/detailAction";
// Router
import { Link } from "react-router-dom";
// Utils
import { smallImage } from "../util";

function Game({ game }) {
  // Load Detail
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(game.id));
  };
  return (
    <StyledGame
      onClick={loadDetailHandler}
      layoutId={game.id.toString()}
      variants={popup}
      initial="hidden"
      animate="show"
    >
      <Link to={`/game/${game.id}`}>
        <motion.h3 layoutId={`title ${game.id.toString()}`}>{game.name}</motion.h3>
        <p>{game.released}</p>
        <motion.img
          layoutId={`image ${game.id.toString()}`}
          src={smallImage(game.background_image, 640)}
          alt=""
        />
      </Link>
    </StyledGame>
  );
}

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.336);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    margin-bottom: -5px;
  }
`;

export default Game;
