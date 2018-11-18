import React from 'react';
import { Container } from 'semantic-ui-react';

import FilteredNodesList from '../containers/filtered_nodes_list';
import { ConnectedChapterFooterLink } from '../containers/chapter_provider';
import ConnectedBookmarkModal from '../containers/bookmarks_provider';

const styles ={reader_pane: {paddingBottom: "15px", overflowWrap: "break-word"}};

export default function ReaderPane(props) {
    return (
      <div id="reader-pane" style={ styles.reader_pane }>
        <ConnectedBookmarkModal />
        <Container text>
          <FilteredNodesList />
        <ConnectedChapterFooterLink />
        </Container>
      </div>
    );
}