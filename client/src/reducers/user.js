import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  TOGGLE_VISIBILITY,
  TOGGLE_VISIBILITY_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  user: null,
  users: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_VISIBILITY:
      return {
        loading: false,
        user: payload,
      }
    case GET_ALL_USERS:
      return {
        loading: false,
        users: payload,
      };
    case TOGGLE_VISIBILITY_ERROR:
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}