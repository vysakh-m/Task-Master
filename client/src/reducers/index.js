import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import listReducer from "./listReducer";
import filterReducer from "./filterReducer";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  list: listReducer,
  filter:filterReducer
});
