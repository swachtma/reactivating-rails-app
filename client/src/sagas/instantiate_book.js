import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import axiosCreateClient from './utils/axios_client';

import * as routes from '../constants/settings';
import { loadNodes } from '../actions/nodes';
import { loadChapters } from '../actions/chapters';
import { addAlert } from '../actions/alerts';
import { routeError } from '../actions/routes';

export const checkBookHydration = (state) => {
  return !(state.chapters.length && state.nodes.length);
};

export function* instantiateBook(){
  const dehydrated = yield select(checkBookHydration);
  
  if(dehydrated){
    try{
      const pub_client = yield axiosCreateClient(false);
      const [nodes, chapters] = yield all([
        call([pub_client,"get"],'/api/nodes'),
        call([pub_client,"get"],'/api/chapters')
      ]);
      
      yield all([
        put(loadNodes(nodes.data)),
        put(loadChapters(chapters.data))
      ]);
    }
    catch(e){
      yield put(routeError());
      yield put(addAlert(e.message,"danger"));
    }
  }
} 

export function* watchBookRoutesSaga(){
  yield takeEvery([routes.HOME_ROUTE, routes.CHAPTER_ROUTE], instantiateBook);
}