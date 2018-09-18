import { createStore, combineReducers } from "redux";
import nodes from './nodes';

const store = createStore(
  combineReducers({nodes})
);

export default store;