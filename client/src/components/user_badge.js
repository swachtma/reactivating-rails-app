import React from 'react';
import {string, func} from 'prop-types';
import { Image, Menu, Dropdown } from 'semantic-ui-react';

import { ConnectedGitHubIcon } from '../containers/route_provider';

const styles ={
  profile: {
    maxHeight: "32x",
    maxWidth: "32px",
    marginLeft: "1.757px"
  }
};

UserBadge.propTypes = {
  username: string,
  avartar: string,
  dispatchSignalSignout: func,
  handleSidebarVisibility: func,
};

export default function UserBadge(props){
  return !props.username ? <ConnectedGitHubIcon /> : <ProfileIcon {...props} />;
}

export function ProfileIcon(props){
  const { username, avatar, dispatchSignalSignout, handleSidebarVisibility } = props;
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