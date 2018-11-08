import axiosCreateClient from './axios_client';
import {  call, put } from 'redux-saga/effects';

import { setBookmarkLocations, setBookmarkOffered } from '../../actions/bookmarks';


export default function* retrieveUserBookmark(){
  let auth_client =  yield axiosCreateClient();
  
  if(auth_client){
    try{
      let response = yield call(auth_client.get, "/api/bookmarks");
      let lr = response.data.last_read || 0;
      let fr = response.data.furthest_read || 0;
      
      yield put(setBookmarkLocations(fr));
      yield put(setBookmarkLocations(lr));
      
      yield put(setBookmarkOffered(false));
      
      return true;
    } catch (e) {
      // fails silently without throwing further errors to parent sagas
      console.log(e.message);
      return false;
    }
  } else { return false; }
}