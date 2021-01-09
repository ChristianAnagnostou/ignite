import axios from "axios";
import { gameDetailsUrl } from "../../api";
import { gameScreenshotUrl } from "../../api";
import { GET_DETAIL } from "../types/detailTypes";

export const loadDetail = (id) => async (dispatch) => {
  const detailData = await axios.get(gameDetailsUrl(id));
  const screenshotData = await axios.get(gameScreenshotUrl(id));

  dispatch({
    type: GET_DETAIL,
    payload: {
      game: detailData.data,
      screen: screenshotData.data,
    },
  });
};
