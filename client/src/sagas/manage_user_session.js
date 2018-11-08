import { takeLatest, put, call, take } from 'redux-saga/effects';
import axiosCreateClient from './utils/axios_client';

import * as routes from '../constants/settings';
import { setUser } from '../actions/user';
import { addAlert } from '../actions/alerts';
import redirectToPathIf from './utils/redirect_path';
import retrieveUserBookmark from './utils/retrieve_bookmark';

export function* manageUserSession(/*action*/){
 while(true){
    try{
      let action = yield take(routes.AUTH_ROUTE);
      yield call(redirectToPathIf,action.payload.bounce_path); 
        
      const pub_client = yield call(axiosCreateClient,false);
      let user = yield call([pub_client, "get"], "/api/hydrate_user?token=" + action.payload.token);
      yield put(setUser(user.data));
      
      yield call(retrieveUserBookmark);
    } catch(e){
      yield put(addAlert(e.message,"warning"));
  }
  }
} 