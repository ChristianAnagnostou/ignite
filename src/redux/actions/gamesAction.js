import axios from "axios";
import { popularGamesUrl, upcomingGamesUrl, newGamesUrl, searchGameUrl } from "../../api";
import { FETCH_GAMES, FETCH_SEARCHED } from "../types/gamesTypes";

// Action Creators
export const loadGames = () => async (dispatch) => {
  const popularData = await axios.get(popularGamesUrl());
  const upcomingData = await axios.get(upcomingGamesUrl());
  const newGamesData = await axios.get(newGamesUrl());

  dispatch({
    type: FETCH_GAMES,
    payload: {
      popular: popularData.data.results,
      upcoming: upcomingData.data.results,
      newGames: newGamesData.data.results,
    },
  });
};

export const fetchSearched = (game_name) => async (dispatch) => {
  const searchedData = await axios.get(searchGameUrl(game_name));

  dispatch({
    type: FETCH_SEARCHED,
    payload: {
      searched: searchedData.data.results,
    },
  });
};
