import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css'

import routerProvider from './containers/route_provider';
import connectToAlerts from './containers/alert_provider';
import MenuBar from './components/menu_bar';
const ConnectedRouterSwitch = routerProvider();
const ApplicationAlerts = connectToAlerts();


class App extends Component {
  render() {
    return (
      <div id="app">
        <MenuBar />
        <Container text id="main-section">
          <ApplicationAlerts />
          <ConnectedRouterSwitch />
        </Container>
      </div>
    );
  }
}

export default App;