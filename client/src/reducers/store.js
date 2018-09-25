import { createStore, combineReducers } from "redux";
import nodes from './nodes';
import chapters from './chapters';

const store = createStore(
  combineReducers({nodes, chapters})
);

export default store;