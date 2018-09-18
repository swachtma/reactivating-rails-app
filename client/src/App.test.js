import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import store from './reducers/store';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
