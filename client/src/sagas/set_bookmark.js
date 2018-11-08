import { takeEvery, call, put } from 'redux-saga/effects';
import axiosCreateClient from './utils/axios_client';

import * as routes from '../constants/settings';
import { setBookmarkLocations } from '../actions/bookmarks';

export function* setBookmarks(action){
  let ch_id = action.payload.chapter_id;
  const auth_client = yield axiosCreateClient();
  //Set bookmarks locally
  yield put(setBookmarkLocations(ch_id));
  
  if(auth_client){
    try{
      let response = yield call(auth_client.post,'/api/bookmarks',{chapter_id: ch_id});
      console.log(response.data.message);
    } catch(e){
      console.log(e.message);
    }
  }
} 

export function* watchBookmarkChanges(){
  yield takeEvery(routes.CHAPTER_ROUTE, setBookmarks);
}