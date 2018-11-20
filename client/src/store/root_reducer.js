import { combineReducers } from 'redux'

import setupRouter from './reducers/router'
import chapters from './reducers/chapters'
import nodes from './reducers/nodes'
import settings from './reducers/settings'
import alerts from './reducers/alerts'
import user from './reducers/user'
import bookmarks from './reducers/bookmarks'

export const router = setupRouter()

export default combineReducers({
  location: router.reducer,
  user,
  settings,
  bookmarks,
  alerts,
  nodes,
  chapters
})
