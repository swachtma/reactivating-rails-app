import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll'
import createHistory from 'history/createBrowserHistory';

import * as ROUTES from '../constants/settings';
import chapters from './chapters';
import nodes from './nodes';
import settings from './settings';
import alerts from './alerts';
import user from './user';
import bookmarks from './bookmarks';
import rootSaga from '../sagas/root';

const history = createHistory();
const routeMap = {
  // Routes here "ACTION_NAME":"/some/route"
  [ROUTES.HOME_ROUTE]: "/",
  [ROUTES.CHAPTER_ROUTE]: "/chapter/:chapter_id",
  [ROUTES.AUTH_ROUTE]: "/auth/:token",
  [ROUTES.ERROR_ROUTE]: "/error"
};

const { reducer: routeReducer, middleware: routerMiddleware, enhancer: routerEnhancer, initialDispatch } = connectRoutes(
  history,
  routeMap,
  { restoreScroll: restoreScroll(), initialDispatch: false }
);

const reducers = combineReducers({location: routeReducer, user, settings, bookmarks, alerts, nodes, chapters});

const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(sagaMiddleware, routerMiddleware);

const store = createStore(
  reducers, composeWithDevTools(routerEnhancer, middlewares)
);

sagaMiddleware.run(rootSaga);
initialDispatch();

export default store;