import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

class ReaderPane extends Component {
  render() {
    return (
      <div id="reader-pane">
        <Container text>
        { this.props.children }
        </Container>
      </div>
    );
  }
}

export default ReaderPane;