import React, { useState } from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fadeIn } from "../animations";
// Redux
import { fetchSearched } from "../redux/actions/gamesAction";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearched(searchInput));
    setSearchInput("");
  };

  return (
    <SearchBarContainer variants={fadeIn} initial="hidden" animate="show">
      <Logo>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form onSubmit={handleSubmit} className="search">
        <input type="text" onChange={handleInputChange} value={searchInput} />
        <button type="submit">Submit</button>
      </form>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled(motion.div)`
  padding: 2rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem;
    margin-top: 1rem;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    &:focus {
      outline: 1px solid grey;
    }
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
    &:focus {
      outline: 1px solid grey;
    }
  }
`;
const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

export default SearchBar;
