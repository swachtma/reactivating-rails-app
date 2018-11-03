import React, { Component } from 'react';
import { Image, Menu, Icon, Dropdown } from 'semantic-ui-react';

class UserBadge extends Component {
  render() {
    if(!this.props.username){
      return (
        <Menu.Item href="https://github.com/login/oauth/authorize?client_id=a86bc65853ae65d3be52" name='Sign in with GitHub'>
          <Icon name='github' style={{marginRight: 0}} size="big" />
        </Menu.Item>
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