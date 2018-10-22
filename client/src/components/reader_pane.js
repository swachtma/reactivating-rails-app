import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { ConnectedChapterFooterLink } from '../containers/chapter_provider';

const reader_pane_styles= {
  paddingBottom: "15px"
};

class ReaderPane extends Component {
  render() {
    return (
      <div id="reader-pane" style={ reader_pane_styles }>
        <Container text>
        { this.props.children }
        <ConnectedChapterFooterLink />
        </Container>
      </div>
    );
  }
}

export default ReaderPane;