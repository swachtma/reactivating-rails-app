import { put, call, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axiosCreateClient from './utils/axios_client';

import * as routes from '../constants/settings';
import * as user_actions from '../constants/user';
import { setUser } from '../actions/user';
import { addAlert, clearAlerts } from '../actions/alerts';
import redirectToPathIf from './utils/redirect_path';
import retrieveUserBookmark from './utils/retrieve_bookmark';

export function* manageUserSession(){
  while(true){
    try{
      let action = yield take(routes.AUTH_ROUTE);
      yield call(redirectToPathIf,action.payload.bounce_path);
      console.log(action)
      const pub_client = yield call(axiosCreateClient,false);
      let user = yield call([pub_client, "get"], "/api/hydrate_user?token=" + action.payload.token);
      yield put(setUser(user.data));
      
      yield call(retrieveUserBookmark);
      
      // Wait for Sign Out, and then...
      yield take(user_actions.CLEAR_USER);
      yield call(handleSignOut);
    } 
    catch(e){
      yield put(addAlert(e.message,"warning"));
    }
  }
} 

export function* handleSignOut() {
  yield put(clearAlerts());
  yield put(addAlert("Sign out successful","danger"));
  yield call(delay,3000);
  yield put(clearAlerts());
}