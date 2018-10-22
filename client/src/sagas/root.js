import { all } from 'redux-saga/effects';
import { watchBookRoutesSaga } from './instantiate_book';
import { watchRoutesToClearAlerts } from './clear_alerts';

export default function* rootSaga(){
  yield all([
    watchBookRoutesSaga(),
    watchRoutesToClearAlerts()
  ]);
}