import { all } from 'redux-saga/effects';
import { watchBookRoutesSaga } from './instantiate_book';
import { watchRoutesToClearAlerts } from './clear_alerts';
import { manageUserSession } from './manage_user_session';
import { watchBookmarkChanges } from './set_bookmarks';


export default function* rootSaga(){
  yield all([
    watchBookRoutesSaga(),
    watchRoutesToClearAlerts(),
    manageUserSession(),
    watchBookmarkChanges()
  ]);
}