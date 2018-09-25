import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.store = store;

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,document.getElementById('root')
);
    
registerServiceWorker();