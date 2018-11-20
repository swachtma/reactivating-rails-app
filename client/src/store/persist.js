import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
}

export default function persistWrap (root_reducer) {
  return persistReducer(persistConfig, root_reducer)
}
