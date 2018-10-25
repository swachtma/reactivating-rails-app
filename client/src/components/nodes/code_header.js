import React, { Component } from 'react';
import { Popup, Button, Icon } from 'semantic-ui-react';

const blockHeaderStyles = {
  borderBottom: "3px double #021a40",
  backgroundColor: "#021a40",
  color: "#fff",
  padding: "5px 10px 5px 20px",
  textOverflow: "ellipsis"
};

class CodeHeader extends Component {
  render() {
    return (
      <div style={blockHeaderStyles}>
        { this.props.block_path }
        <Popup
          trigger={
            <Button onClick={()=>this.props.collapseHandler(false)}
            icon size="mini" floated="right" color="grey">
              <Icon name='plus' />
            </Button>
          }
          position="bottom center" content='Expand All'
        />

        <Popup
          trigger={
            <Button onClick={()=>this.props.collapseHandler(true)}
            icon size="mini" floated="right" color="grey">
              <Icon name='minus' />
            </Button>
          }
          position="bottom center" content='Collapse All'
        />

         <span ref={this.props.triggerRef}>
          <Popup
            trigger={
              <Button icon size="mini" floated="right" color="grey">
               <Icon name='copy' />
              </Button>
            }
            position="bottom center" content='Copy All'
          />
        </span>
      </div> 
    );
  }
}

export default CodeHeader;