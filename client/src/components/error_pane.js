import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import { routeHome } from '../actions/routes'; 

class ErrorPane extends Component {
  render() {
    return (
      <div id="error-pane">
        <Container text>
          <h1>Well Shucks...</h1>
          <p>This page is where we, unfortunately, make up some cutesy reason to apologize for our site not working at the moment. In any case, we don't seem able to do the things at the moment.</p>
          
          <p>How about you <Link to={ routeHome() }>head to the homepage</Link> and try giving it another go?</p>
        </Container>
      </div>
    );
  }
}

export default ErrorPane;