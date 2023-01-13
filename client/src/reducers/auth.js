import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  TOGGLE_VISIBILITY,
  TOGGLE_VISIBILITY_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
      case TOGGLE_VISIBILITY:
        return {
          isAuthenticated: true,
          loading: false,
          user: payload,
          users: [],
        }
      case GET_ALL_USERS:
        return {
          ...state,
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
