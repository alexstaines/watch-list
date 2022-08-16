import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_LIST,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  LIST_ERROR,
  MY_LIST_ERROR,
  GET_MY_LIST,
  GET_ALL_LISTS,
  GET_ALL_LISTS_ERROR,
} from "./types";

// get my list
export const getMyList = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/list/me", config);

    dispatch({
      type: GET_MY_LIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MY_LIST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// get lists
export const getLists = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/list", config);

    dispatch({
      type: GET_ALL_LISTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_LISTS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
