import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import registerServiceWorker from './registerServiceWorker';

import buildStore from './store/store';
import App from './App';

let { store, persistor } = buildStore();
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,document.getElementById('root')
);
    
registerServiceWorker();