import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import FilteredNodesList from '../containers/filtered_nodes_list';
import { ConnectedChapterFooterLink } from '../containers/chapter_provider';
import { ConnectedBookmarkModal } from '../containers/bookmarks_provider';

const reader_pane_styles= {
  paddingBottom: "15px",
  overflowWrap: "break-word"
};

class ReaderPane extends Component {
  render() {
    return (
      <div id="reader-pane" style={ reader_pane_styles }>
        <ConnectedBookmarkModal />
        <Container text>
          <FilteredNodesList />
        <ConnectedChapterFooterLink />
        </Container>
      </div>
    );
  }
}

export default ReaderPane;