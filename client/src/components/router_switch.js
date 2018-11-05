import React, { Component } from 'react';
import ReaderPane from './reader_pane';
import ErrorPane from './error_pane';
import * as routes from '../constants/settings';

class RouterSwitch extends Component {
  render() {
    switch(this.props.location.type){
      case(routes.ERROR_ROUTE):
        return(<ErrorPane />);
      case(routes.CHAPTER_ROUTE):
        return(<ReaderPane />);
      case(routes.HOME_ROUTE):
        return(<ReaderPane />);
      default:
        return(<ErrorPane />);
    }
  }
}

export default RouterSwitch;