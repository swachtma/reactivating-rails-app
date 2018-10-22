import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import * as routes from '../constants/settings';
import { loadNodes } from '../actions/nodes';
import { loadChapters } from '../actions/chapters';
import { addAlert } from '../actions/alerts';

export const checkBookHydration = (state) => {
    return !(state.chapters.length && state.nodes.length)
  }

export function* instantiateBook(){
  const dehydrated = yield select(checkBookHydration);
  
  if(dehydrated){
    try{
      const [nodes, chapters] = yield all([
        call(axios.get,'/api/nodes'),
        call(axios.get,'/api/chapters')
      ]);
      
      yield all([
        put(loadNodes(nodes.data)),
        put(loadChapters(chapters.data))
      ]);
    }
    catch(e){
      yield put(addAlert(
        "We were unable to fetch the latest copy of this book at this time. " +
        "Sorry for the inconvenience!  You can try refreshing your browser. " +
        "Or returning to visit another time.",
        "danger"
      ));
    }
  }
} 

export function* watchBookRoutesSaga(){
  yield takeEvery([routes.HOME_ROUTE, routes.CHAPTER_ROUTE], instantiateBook);
};