import React, { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../redux/actions/gamesAction";
// Components
import Game from "../components/Game";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import GameDetail from "../components/GameDetail";

function Home() {
  // Fetch Games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  // State Selector
  const { popular, newGames, upcoming } = useSelector((state) => state.games);

  const options = [
    { type: "Popular", data: popular },
    { type: "Newest", data: newGames },
    { type: "Upcoming", data: upcoming },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (popular.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [popular]);

  return (
    <GameList>
      <GameDetail />
      <h2>GAMES</h2>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption ? selectedOption.type : "Popular"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem onClick={onOptionClicked(option)} key={option.type}>
                  {option.type}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      {selectedOption ? (
        <Games>
          {selectedOption.data.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </Games>
      ) : (
        <h1>LOADING...</h1>
      )}
    </GameList>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem 1rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 5rem;
`;

const DropDownContainer = styled("div")`
  width: 10rem;
  margin: 1rem 0rem;
  position: relative;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.3rem;
  color: #164666;
  text-align: center;
`;

const DropDownHeader = styled("div")`
  padding: 0.5rem 0rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.1);
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  position: absolute;
  right: -30rem;
  top: 0;
  display: flex;
  background: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const ListItem = styled("li")`
  list-style: none;
  width: 10rem;
  padding: 0.5rem 0rem;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export default Home;
