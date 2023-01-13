import { GET_MY_LIST, MY_LIST_ERROR, GET_ALL_LISTS, GET_ALL_LISTS_ERROR, ADD_LIST_ITEM, UPDATE_LIST_ITEM, LIST_ERROR, REMOVE_LIST_ITEM, REMOVE_LIST_ITEM_ERROR } from "../actions/types";

const initialState = {
  listItems: null,
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
        listItems: payload,
        loading: false,
      };
    case ADD_LIST_ITEM:
      return {
        ...state,
        listItems: [...state.listItems, payload],
        loading: false,
      };
    case UPDATE_LIST_ITEM:
      return {
        ...state,
        listItems: [...state.listItems, payload],
        loading: false,
      }
    case REMOVE_LIST_ITEM:
      return {
        ...state,
        listItems: state.listItems.filter((item) => item._id !== payload),
        loading: false,
      }
    case REMOVE_LIST_ITEM_ERROR:
    case LIST_ERROR:
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
