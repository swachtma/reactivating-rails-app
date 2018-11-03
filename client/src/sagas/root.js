import { all } from 'redux-saga/effects';
import { watchBookRoutesSaga } from './instantiate_book';
import { watchRoutesToClearAlerts } from './clear_alerts';
import { watchAuthRoutes } from './hydrate_user';
import { watchSignOut } from './dehydrate_user';

export default function* rootSaga(){
  yield all([
    watchBookRoutesSaga(),
    watchRoutesToClearAlerts(),
    watchAuthRoutes(),
    watchSignOut()
  ]);
}