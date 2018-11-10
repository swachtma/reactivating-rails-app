import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const styles = {signout: {color: "#cc0000"}}

class SideBarSignout extends Component {
  handleSignout = () => {
    this.props.handleCloseClick();
    this.props.dispatchSignalSignout();
  };
  
  render() {
    let { username } = this.props;
    if(username){
      return (
        <Menu.Item link={true} onClick={this.handleSignout} name='Sign Out'>
          <div style={styles.signout}><Icon name='cancel' />Sign Out</div>
        </Menu.Item>
      );
    } else {
      return null;
    }
  }
}

export default SideBarSignout;