import { takeLatest, put, call, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as routes from '../constants/settings';
import { routeHome } from '../actions/routes';
import { setUser } from '../actions/user';
import { addAlert, clearAlerts } from '../actions/alerts';

export function* hydrateUser(action){
  yield put(routeHome());
  
  try{
    let user = yield call(axios.get, "/api/hydrate_user?token=" + action.payload.token);
    yield all([
      put(setUser(user.data)),
      put(addAlert("Sign in successful, welcome " + user.data.username + ".","success"))
    ]);
    
    yield call(delay,3000);
    yield put(clearAlerts());
  } catch(e){
    // We need some error handling
  }
} 

export function* watchAuthRoutes(){
  yield takeLatest(routes.AUTH_ROUTE, hydrateUser);
};