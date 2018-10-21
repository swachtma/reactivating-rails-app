import { all } from 'redux-saga/effects';
import { watchBookRoutesSaga } from './instantiate_book';

export default function* rootSaga(){
  yield all([
    watchBookRoutesSaga()
  ]);
}