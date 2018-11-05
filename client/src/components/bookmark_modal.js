import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const modalPosition = {top: "40%"}

class BookmarkModal extends Component {
  handleClose = () => this.props.dispatchSetBookmarkOffered(true);
  
  handleLastReadClick = () => {
    this.handleClose();
    this.props.dispatchRoutechapter(this.props.last_read.chapter);
  }
  
  handleFurthestReadClick = () => {
    this.handleClose();
    this.props.dispatchRoutechapter(this.props.furthest_read.chapter);
  }
  
  printLastReadButtonIf = (truthy) => {
    if(truthy){
      return (
        <Button color='yellow' onClick={this.handleLastReadClick} inverted>
          <Icon name='checkmark' /> Last read (Ch:{this.props.last_read.chapter})
        </Button>
      );
    }
  }
  
  render(){
    let last_read = this.props.last_read.chapter;
    let furthest_read = this.props.furthest_read.chapter;
    
    return(
      <Modal open={this.props.displayState} onClose={this.handleClose} basic size='small' style={modalPosition}>
        <Header icon='archive' content='Pick up where you left off' />
        <Modal.Content>
          <p>We've saved some bookmarks on your behalf.  Would you like to resume reading at one of these locations?</p>
        </Modal.Content>
        <Modal.Actions style={{textAlign: "center"}}>
          <Button basic color='red' onClick={this.handleClose} inverted>
            <Icon name='remove' /> No, stay here
          </Button>
          { this.printLastReadButtonIf(last_read !== furthest_read) }
          <Button color='green' onClick={this.handleFurthestReadClick} inverted>
            <Icon name='checkmark' /> Furthest read (Ch:{furthest_read})
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default BookmarkModal;