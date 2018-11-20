import { put, call, take, fork, cancel } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axiosCreateClient from './utils/axios_client'

import * as routes from '../../constants/settings'
import * as user_actions from '../../constants/user'
import { setUser, clearUser } from '../../actions/user'
import { addAlert, clearAlerts } from '../../actions/alerts'
import redirectToPathIf from './utils/redirect_path'
import retrieveUserBookmark from './utils/retrieve_bookmark'

export function * manageUserSession () {
  while (true) {
    try {
      let action, token
      while (!token) {
        action = yield take([routes.AUTH_ROUTE, 'persist/REHYDRATE'])
        token = action.payload.token || action.payload.user.token
      }

      let sign_in = yield fork(handleSignIn, token)
      yield call(redirectToPathIf, action.payload.bounce_path)

      // Wait for Sign Out, and then...
      yield take(user_actions.SIGNAL_SIGNOUT)
      yield cancel(sign_in)
      yield call(handleSignOut)
    } catch (e) {
      yield put(addAlert(e.message, 'warning'))
    }
  }
}

export function * handleSignIn (token) {
  try {
    const pub_client = yield call(axiosCreateClient, false)
    let user = yield call([pub_client, 'get'], '/api/hydrate_user?token=' + token)

    yield fork(manageUserTimeout, user.data.expires)
    yield put(setUser(user.data))
    yield call(retrieveUserBookmark)
  } catch (e) {
    yield call(handleSignOut, e.message)
  }
}

export function * manageUserTimeout (countdown) {
  // delay timeout cannot exceed 32-bit int (2147483647) or ~24 days
  countdown = countdown >= 2147000 ? 2147000 : countdown
  yield call(delay, countdown * 1000)
  yield call(handleSignOut, 'Your Session has expired, please sign in again.')
}

export function * handleSignOut (message) {
  message = message || 'Sign out successful'
  yield put(clearUser())

  yield put(clearAlerts())
  yield put(addAlert(message, 'warning'))
  yield call(delay, 3000)
  yield put(clearAlerts())
}
