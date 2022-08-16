import { GET_MY_LIST, MY_LIST_ERROR, GET_ALL_LISTS, GET_ALL_LISTS_ERROR } from "../actions/types";

const initialState = {
  list: null,
  lists: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LISTS:
    case GET_MY_LIST:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case GET_ALL_LISTS_ERROR:
    case MY_LIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
