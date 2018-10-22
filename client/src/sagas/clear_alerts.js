import { takeEvery, put } from 'redux-saga/effects';

import * as routes from '../constants/settings';
import { clearAlerts } from '../actions/alerts';

export function* watchRoutesToClearAlerts(){
  yield takeEvery(Object.keys(routes), () => put(clearAlerts()));
}