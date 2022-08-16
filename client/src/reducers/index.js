import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import list from './list';

const rootReducer = combineReducers({ alert, auth, list });

//export default combineReducers({ alert, auth });

export default rootReducer;