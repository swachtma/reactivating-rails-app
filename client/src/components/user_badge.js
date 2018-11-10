import React, { Component } from 'react';
import { Image, Menu, Dropdown } from 'semantic-ui-react';

import { ConnectedGitHubIcon } from '../containers/route_provider';

const styles ={
  profile: {
    maxHeight: "32x",
    maxWidth: "32px",
    marginLeft: "1.757px"
  }
};

class UserBadge extends Component {
  render() {
    return !this.props.username ? <ConnectedGitHubIcon /> : <ProfileIcon {...this.props} />;
  }
}

class ProfileIcon extends Component {
  render() {
    let { username, avatar, dispatchSignalSignout, handleSidebarVisibility } = this.props;
    let badge = <Image src={avatar} avatar style={styles.profile}/>;
    return (
      <Menu.Item name={username} fitted>
        <Dropdown closeOnBlur={true} onFocus={handleSidebarVisibility} icon={badge} compact pointing="top right">
          <Dropdown.Menu>
            <Dropdown.Item onClick={dispatchSignalSignout}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
  }
}

export default UserBadge;