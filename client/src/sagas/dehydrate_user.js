import { takeLatest, put, all, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as actions from '../constants/user';
import { addAlert, clearAlerts } from '../actions/alerts';

export function* dehydrateUser(action){
  try{
    yield all([
      put(clearAlerts()),
      put(addAlert("Sign out successful","danger"))
    ]);
    
    yield call(delay,3000);
    yield put(clearAlerts());
  } catch(e){
    // We need some error handling
  }
} 

export function* watchSignOut(){
  yield takeLatest(actions.CLEAR_USER, dehydrateUser);
};