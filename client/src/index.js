import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import buildStore from './reducers/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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