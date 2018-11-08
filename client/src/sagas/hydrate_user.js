import { takeLatest, put, call } from 'redux-saga/effects';
import axiosCreateClient from './utils/axios_client';

import * as routes from '../constants/settings';
import { setUser } from '../actions/user';
import { addAlert } from '../actions/alerts';
import redirectToPathIf from './utils/redirect_path';
import retrieveUserBookmark from './utils/retrieve_bookmark';

export function* hydrateUser(action){
  yield redirectToPathIf(action.payload.bounce_path);
  
  try{
    const pub_client = yield axiosCreateClient(false);
    let user = yield call([pub_client, "get"], "/api/hydrate_user?token=" + action.payload.token);
    yield put(setUser(user.data));
    
    yield call(retrieveUserBookmark);
  } catch(e){
    yield put(addAlert(e.message,"warning"));
  }
} 

export function* watchAuthRoutes(){
  yield takeLatest(routes.AUTH_ROUTE, hydrateUser);
}