import createHistory from 'history/createBrowserHistory'
import restoreScroll from 'redux-first-router-restore-scroll'
import { connectRoutes } from 'redux-first-router'

import * as ROUTES from '../../constants/settings'

const routeMap = {
  // Routes here "ACTION_NAME":"/some/route"
  [ROUTES.HOME_ROUTE]: '/',
  [ROUTES.CHAPTER_ROUTE]: '/chapter/:chapter_id',
  [ROUTES.AUTH_ROUTE]: '/auth/:token/:bounce_path',
  [ROUTES.ERROR_ROUTE]: '/error'
}

const history = createHistory()

export default function setupRouter () {
  return connectRoutes(
    history,
    routeMap,
    { restoreScroll: restoreScroll(), initialDispatch: false }
  )
}
