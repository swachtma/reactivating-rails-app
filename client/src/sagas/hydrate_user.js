import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as routes from '../constants/settings';
import { setUser } from '../actions/user';
import redirectToPathIf from './utils/redirect_path';
import retrieveUserBookmark from './utils/retrieve_bookmark';

export function* hydrateUser(action){
  yield redirectToPathIf(action.payload.bounce_path);
  
  try{
    let user = yield call(axios.get, "/api/hydrate_user?token=" + action.payload.token);
    yield put(setUser(user.data));
    
    yield call(retrieveUserBookmark);
  } catch(e){
    // We need some error handling
  }
} 

export function* watchAuthRoutes(){
  yield takeLatest(routes.AUTH_ROUTE, hydrateUser);
};