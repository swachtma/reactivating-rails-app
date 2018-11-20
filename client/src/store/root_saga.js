import { all } from 'redux-saga/effects'

import { watchBookRoutesSaga } from './sagas/instantiate_book'
import { watchRoutesToClearAlerts } from './sagas/clear_alerts'
import { manageUserSession } from './sagas/manage_user_session'
import { watchBookmarkChanges } from './sagas/set_bookmarks'

export default function * rootSaga () {
  yield all([
    watchBookRoutesSaga(),
    watchRoutesToClearAlerts(),
    manageUserSession(),
    watchBookmarkChanges()
  ])
}
