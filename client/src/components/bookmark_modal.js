import React from 'react';
import { func, bool, number } from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const styles = {center: { textAlign: "center" }};

BookmarkModal.propTypes = {
  dispatchRoutechapter: func,
  dispatchSetBookmarkOffered: func,
  displayState: bool,
  last_read_id: number,
  furthest_read_id: number,
  active_chapter_id: number
};

export default function BookmarkModal(props) {
  const { displayState, dispatchRoutechapter, dispatchSetBookmarkOffered,
    furthest_read_id, active_chapter_id, last_read_id } = props;
  
  const manageResponse = (e,data) => {
    dispatchSetBookmarkOffered();
    data.value && dispatchRoutechapter(data.value);
  };
  
  return(
    <Modal open={displayState} onClose={dispatchSetBookmarkOffered} basic size='small'>
      <Header icon='archive' content='Pick up where you left off' />
      <Modal.Content>
        <p>
          We've saved some bookmarks on your behalf.
          Would you like to resume reading at one of these locations?
        </p>
      </Modal.Content>
      <Modal.Actions style={styles.center}>
        <Button basic color='red' onClick={manageResponse} inverted>
          <Icon name='remove' /> No, stay here
        </Button>
        
        {last_read_id !== furthest_read_id && active_chapter_id !== last_read_id &&
        <Button color='yellow' value={last_read_id} onClick={manageResponse} inverted>
          <Icon name='checkmark' /> Last read (Ch: {last_read_id})
        </Button>}
        
        <Button color='green' value={furthest_read_id} onClick={manageResponse} inverted>
          <Icon name='checkmark' /> Furthest read (Ch: {furthest_read_id})
        </Button>
      </Modal.Actions>
    </Modal>
  );
}