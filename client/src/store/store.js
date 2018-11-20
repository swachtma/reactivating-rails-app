import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'

import rootReducer, { router } from './root_reducer'
import persistWrap from './persist'
import rootSaga from './root_saga'

// Middleware setup
const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware, router.middleware)

// Reducer setup
const persistedReducer = persistWrap(rootReducer)

// Store setup
const base_store = createStore(
  persistedReducer, composeWithDevTools(router.enhancer, middlewares)
)

// Saga dispatch must follow store creation with persist so values can rehydrate
sagaMiddleware.run(rootSaga)
router.initialDispatch()

export default () =>
  ({ store: base_store, persistor: persistStore(base_store) })
