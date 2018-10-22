import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll'
import createHistory from 'history/createBrowserHistory';

import * as ROUTES from '../constants/settings';
import alerts from './alerts';
import chapters from './chapters';
import nodes from './nodes';
import settings from './settings';
import rootSaga from '../sagas/root';

const history = createHistory();
const routeMap = {
  // Routes here "ACTION_NAME":"/some/route"
  [ROUTES.HOME_ROUTE]: "/",
  [ROUTES.CHAPTER_ROUTE]: "/chapter/:chapter_id"
};

const { 
  reducer: routeReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
  initialDispatch 
} = connectRoutes( 
  history, routeMap, { restoreScroll: restoreScroll(), initialDispatch: false }
);

const reducers = combineReducers(
  {location: routeReducer, settings, nodes, chapters, alerts}
);

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware, routerMiddleware);

const store = createStore(
  reducers, composeWithDevTools(routerEnhancer, middlewares)
);

sagaMiddleware.run(rootSaga);
initialDispatch();

export default store;