import { combineReducers } from "@reduxjs/toolkit";
import application from "./application";

const rootReducer = combineReducers({
  application,
});
export default rootReducer;
