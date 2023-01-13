import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_LIST,
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  LIST_ERROR,
  MY_LIST_ERROR,
  REMOVE_LIST_ITEM_ERROR,
  GET_MY_LIST,
  GET_ALL_LISTS,
  GET_ALL_LISTS_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
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

// add list item
export const addListItem =
  ({
    title,
    averageRating,
    synopsis,
    numberOfEps,
    subtype,
    posterImage,
    watched,
    dateStarted,
    dateFinished,
    watchedEps,
    personalRating,
    notes,
    position,
  }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      title,
      averageRating,
      synopsis,
      numberOfEps,
      subtype,
      posterImage,
      watched,
      dateStarted,
      dateFinished,
      watchedEps,
      personalRating,
      notes,
      position,
    });

    try {
      const res = await axios.post("/api/list", body, config);

      dispatch({
        type: ADD_LIST_ITEM,
        payload: res.data,
      });
      dispatch(setAlert("Entry Added", "success"));
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status },
      });
    }
  };

  // update list item
export const updateListItem =
({
  id,
  title,
  averageRating,
  synopsis,
  numberOfEps,
  subtype,
  posterImage,
  watched,
  dateStarted,
  dateFinished,
  watchedEps,
  personalRating,
  notes,
  position,
}) =>
async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    title,
    averageRating,
    synopsis,
    numberOfEps,
    subtype,
    posterImage,
    watched,
    dateStarted,
    dateFinished,
    watchedEps,
    personalRating,
    notes,
    position,
  });

  try {
    const res = await axios.post((`/api/list/edit/${id}`), body, config);

    dispatch({
      type: UPDATE_LIST_ITEM,
      payload: res.data,
    });
    dispatch(setAlert("Entry Updated", "success"));
  } catch (error) {
    dispatch({
      type: LIST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// delete list item
export const deleteListItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/list/${id}`);

    dispatch({
      type: REMOVE_LIST_ITEM,
      payload: id,
    });

    dispatch(setAlert("Entry Deleted", "success"));
  } catch (error) {
    dispatch({
      type: REMOVE_LIST_ITEM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// get all users with visible lists
export const getUsers = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/users", config);

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
