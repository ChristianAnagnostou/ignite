import React, { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../redux/actions/gamesAction";
// Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import DropDown from "../components/DropDown";
// Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { fadeIn } from "../animations";
// Router
import { useLocation } from "react-router-dom";

function Home() {
  // Get current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  // Add scrolling when on home page
  useEffect(() => {
    if (!pathId) {
      document.body.style.overflow = "auto";
    }
  });
  // Fetch Games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  // State Selector
  const { popular, newGames, upcoming, searched } = useSelector((state) => state.games);

  // Dropdown controller
  const options = [
    { type: "Popular", data: popular },
    { type: "Newest", data: newGames },
    { type: "Upcoming", data: upcoming },
    { type: "Searched", data: searched },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (popular.length) {
      setSelectedOption(options[0]);
    }
    if (searched.length) {
      setSelectedOption(options[3]);
    }
    // eslint-disable-next-line
  }, [popular, searched]);

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      {selectedOption ? (
        <AnimateSharedLayout type="crossfade">
          <AnimatePresence>{pathId && <GameDetail pathId={pathId} />}</AnimatePresence>
          <h2>{selectedOption.type} Games</h2>
          <DropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={options}
          />
          <Games>
            {selectedOption.data.map((game) => (
              <Game key={game.id} game={game} />
            ))}
          </Games>
        </AnimateSharedLayout>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "10rem" }}>LOADING...</h1>
      )}
    </GameList>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 1rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 5rem;
`;

export default Home;
