import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll'
import createHistory from 'history/createBrowserHistory';

import * as ROUTES from '../constants/settings';
import chapters from './chapters';
import nodes from './nodes';
import settings from './settings';

const history = createHistory();
const routeMap = {
  // Routes here "ACTION_NAME":"/some/route"
  [ROUTES.HOME_ROUTE]: "/",
  [ROUTES.CHAPTER_ROUTE]: "/chapter/:chapter_id"
};

const { reducer, middleware, enhancer } = connectRoutes(
  history,
  routeMap,
  { restoreScroll: restoreScroll() }
);

const reducers = combineReducers(
  {location: reducer, settings, nodes, chapters}
);

const middlewares = applyMiddleware(middleware);

const store = createStore(
  reducers, composeWithDevTools(enhancer, middlewares)
);

export default store;