import React, { Component } from 'react';
import { Image, Menu, Dropdown } from 'semantic-ui-react';

import ConnectedGitHubIcon from './github_icon';

class UserBadge extends Component {
  render() {
    if(!this.props.username){
      return (
        <ConnectedGitHubIcon />
      );
    } else {
      let badge = <Image src={this.props.avatar} avatar />;
      return (
        <Menu.Item name={this.props.username}>
          <Dropdown icon={badge} compact pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.props.dispatchClearUser}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
    }
  }
}

export default UserBadge;